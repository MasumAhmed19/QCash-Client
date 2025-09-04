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
import { Plus, Wallet } from "lucide-react";
import { toast } from "sonner";
import { useAgentAddMoneyMutation } from "@/redux/features/agent/agent.api";
import { useAddMoneyMutation } from "@/redux/features/user/user.api";

const formSchema = z.object({
  bankAccount: z.string().min(1, {
    message: "Bank account number is required",
  }),
  amount: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0.1, {
      message: "Amount must be a positive number",
    }),
});

const AddMoneyForm = () => {
  const [addMoney] = useAddMoneyMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bankAccount: "",
      amount: "0",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const amountNumber = Number(data.amount);
    const transactionInfo = {
      bankAccount: data.bankAccount,
      amount: amountNumber
    }

    try{
      const res = await addMoney(transactionInfo).unwrap();

      toast.success("Money added successfully")

    }catch(error:any){
      console.log("ADD MONEY FORM ERROR-->", error)      
      toast.error(error?.data?.message || "Failed to add money");
    }
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader className="flex items-center font-semibold">
          <Wallet className="w-5 h-5" /> Add Money Details
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form id="addMoneyForm" onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="bankAccount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Account</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="221452211458600001"
                        {...field}
                        value={field.value || ""}
                        className="placeholder:text-muted-foreground/60"
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-muted-foreground/60">
                      Enter your bank account number
                    </FormDescription>
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
            </form>
          </Form>
        </CardContent>

        <CardFooter>
          <Button form="addMoneyForm" type="submit" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Money
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default AddMoneyForm;