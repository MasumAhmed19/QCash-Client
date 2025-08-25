import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { auth } from "@/config/firebase.config";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Dot } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function Verify() {
  const location = useLocation();
  const navigate = useNavigate();
  const phone = location.state?.phone;
  
  // State management
  const [otpSent, setOtpSent] = useState(false); // Track if OTP is sent
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [timer, setTimer] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  // Setup reCAPTCHA
  const setupRecaptcha = () => {
    // Clear any existing recaptcha
    if ((window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier.clear();
    }
    
    (window as any).recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {
          console.log("reCAPTCHA solved");
        },
        "expired-callback": () => {
          console.log("reCAPTCHA expired");
        }
      }
    );
    return (window as any).recaptchaVerifier;
  };

  const handleSendOtp = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    const toastId = toast.loading("Sending OTP...");

    try {
      // Validate phone number format
      if (!phone || !phone.startsWith('+880')) {
        throw new Error("Invalid phone number format");
      }

      const appVerifier = setupRecaptcha();
      const confirmation = await signInWithPhoneNumber(auth, phone, appVerifier);
      
      setConfirmationResult(confirmation);
      setOtpSent(true); // Show OTP input form
      setTimer(120); // Start 2-minute timer
      
      toast.success("OTP sent successfully!", { id: toastId });
      
    } catch (error: any) {
      console.error("OTP Send Error:", error);
      
      let errorMessage = "Failed to send OTP";
      
      // Handle specific Firebase errors
      if (error.code === 'auth/invalid-phone-number') {
        errorMessage = "Invalid phone number format";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Too many requests. Please try again later";
      } else if (error.code === 'auth/captcha-check-failed') {
        errorMessage = "reCAPTCHA verification failed";
      }
      
      toast.error(errorMessage, { id: toastId });
      
      // Clear recaptcha on error
      if ((window as any).recaptchaVerifier) {
        (window as any).recaptchaVerifier.clear();
        (window as any).recaptchaVerifier = null;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (!confirmationResult) {
      toast.error("Please send OTP first");
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading("Verifying OTP...");

    try {
      // Verify OTP with Firebase
      const result = await confirmationResult.confirm(data.pin);
      const user = result.user;
      const idToken = await user.getIdToken();

      // Send token to backend for verification
      const response = await fetch("http://localhost:9000/api/v1/auth/verify-phone", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token: idToken }),
      });

      const responseData = await response.json();
      
      if (response.ok && responseData.success) {
        toast.success("Phone verified successfully!", { id: toastId });
        
        // Store user data if needed
        if (responseData.data) {
          localStorage.setItem('user', JSON.stringify(responseData.data));
        }
        
        navigate("/login");
      } else {
        throw new Error(responseData.message || "Verification failed");
      }

    } catch (error: any) {
      console.error("OTP Verification Error:", error);
      
      let errorMessage = "Invalid OTP";
      
      // Handle specific Firebase errors
      if (error.code === 'auth/invalid-verification-code') {
        errorMessage = "Invalid verification code";
      } else if (error.code === 'auth/code-expired') {
        errorMessage = "Verification code has expired";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage, { id: toastId });
      
      // Reset form on error
      form.reset();
    } finally {
      setIsLoading(false);
    }
  };

  // Redirect if no phone number
  useEffect(() => {
    if (!phone) {
      toast.error("Phone number is required");
      navigate("/register");
    }
  }, [phone, navigate]);

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Format timer display
  const formatTimer = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="grid place-content-center h-screen p-4">
      <div id="recaptcha-container"></div>

      {otpSent ? (
        // OTP Verification Form
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-xl">Verify your phone number</CardTitle>
            <CardDescription>
              Please enter the 6-digit code we sent to <br />
              <strong>{phone}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                id="otp-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={1} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <Dot />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={4} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription className="flex items-center gap-2">
                        <Button
                          onClick={handleSendOtp}
                          type="button"
                          variant="link"
                          disabled={timer > 0 || isLoading}
                          className={cn("p-0 m-0", {
                            "cursor-pointer": timer === 0 && !isLoading,
                            "text-gray-500": timer > 0 || isLoading,
                          })}
                        >
                          {timer > 0 ? "Resend OTP in:" : "Resend OTP"}
                        </Button>
                        {timer > 0 && (
                          <span className="text-sm font-mono">
                            {formatTimer(timer)}
                          </span>
                        )}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button 
              form="otp-form" 
              type="submit" 
              disabled={isLoading || form.watch("pin").length !== 6}
            >
              {isLoading ? "Verifying..." : "Verify"}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        // Initial confirmation to send OTP
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-xl">
              Verify your phone number to start your transaction
            </CardTitle>
            <CardDescription>
              We will send you an OTP at <br />
              <strong>{phone}</strong>
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-end">
            <Button 
              onClick={handleSendOtp} 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send OTP"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}