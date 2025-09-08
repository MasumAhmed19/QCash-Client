import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useUpdateInfoMutation } from "@/redux/features/user/user.api";

interface FormData {
  name: string;
  email: string;
  nidNumber: string;
  presentAddress: string;
  permanentAddress: string;
}

export default function EditModal({ onClose }: { onClose?: () => void }) {
  const { data: userInfo } = useUserInfoQuery(undefined);
  const [updateInfo] = useUpdateInfoMutation();

  const form = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      nidNumber: "",
      presentAddress: "",
      permanentAddress: "",
    },
  });

  // Reset form with fetched data when it arrives
  useEffect(() => {
    if (userInfo?.data) {
      form.reset({
        name: userInfo.data.name || "",
        email: userInfo.data.email || "",
        nidNumber: userInfo.data.nidNumber || "",
        presentAddress: userInfo.data.presentAddress || "",
        permanentAddress: userInfo.data.permanentAddress || "",
      });
    }
  }, [userInfo, form]);

  const onSubmit = async (values: FormData) => {
    const toastId = toast.loading("Updating profile...");
    try {
      // console.log(values)
      await updateInfo(values).unwrap();
      toast.success("Profile updated successfully 🎉", { id: toastId });
      onClose?.();
      form.reset(values);
    } catch (err) {
      toast.error("Update failed. Please try again.", { id: toastId });
      console.error("Update failed:", err);
    }
  };

  return (
    <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-3xl [&>button:last-child]:top-3.5">
      <DialogHeader className="contents space-y-0 text-left">
        <DialogTitle className="border-b px-6 py-4 text-base">
          Edit profile
        </DialogTitle>
      </DialogHeader>
      <DialogDescription className="sr-only">
        Update your profile info here.
      </DialogDescription>

      <Form {...form}>
        <form
          className="px-6 pt-4 pb-6 space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="demo@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nidNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NID Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter NID Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="presentAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Present Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Present Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="permanentAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Permanent Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Permanent Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter className="border-t px-6 py-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Saving...
                </span>
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
