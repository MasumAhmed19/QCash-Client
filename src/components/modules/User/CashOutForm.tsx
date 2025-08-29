import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {  Send } from "lucide-react";
import { useCashOutMutation } from "@/redux/features/user/user.api";
import { toast } from "sonner";

const formSchema = z.object({
  agentNumber: z.string().length(11, {
    message: "Agents's Number should be 11 in digits",
  }),
  amount: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0.1, {
      message: "Amount must be a positive number",
    }),
});

const CashOutForm = () => {
  const [cashOut] = useCashOutMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agentNumber: "",
      amount: "0",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const amountNumber = Number(data.amount);
    const transactionInfo = {
      agentNumber: data.agentNumber,
      amount: amountNumber
    }

    try{
      const res = await cashOut(transactionInfo).unwrap();

      toast.success("Successfully Withdraw money")

    }catch(error:any){
      console.log("CASHOUT FORM ERROR-->", error)      
    toast.error(error?.data?.message || "Failed to Cash out");

    }

  };

  return (
    <>
      <Card className="w-full">
        <CardHeader className="flex items-center font-semibold"><Send className="w-5 h-5" /> Cash Out Details</CardHeader>

        <CardContent>
          <Form {...form}>
            <form id="submitForm" onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="agentNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agent Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="01521213434"
                        {...field}
                        value={field.value || ""}
                        className="placeholder:text-muted-foreground/60"
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-muted-foreground/60">Enter the recipient's QCash phone number</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0.00 (BDT)"
                        {...field}
                        value={field.value || ""}
                        className="placeholder:text-muted-foreground/60"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* TODO: Description */}
              {/* <Button type="submit">Submit</Button> */}
            </form>
          </Form>
        </CardContent>

        <CardFooter>
            <Button form="submitForm"  type="submit" className="w-full">Submit</Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default CashOutForm;
