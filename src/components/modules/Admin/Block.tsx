import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useBlockWalletMutation } from "@/redux/features/admin/admin.api";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { toast } from "sonner";

interface BlockProps {
  phone: string;
}

const Block = ({ phone }: BlockProps) => {
  const [blockWallet] = useBlockWalletMutation();

  const handleWalletStatus = async (phone: string) => {
    const toastId = toast.loading("Blocking wallet...");
    try {
      await blockWallet(phone).unwrap();
      toast.success("Succesfully block this wallet", {
        id: toastId,
        duration: 300,
      });
    } catch (error) {
      console.log("Error from wallet block---->", error);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="text-red-600"
        >
          Block Wallet
        </DropdownMenuItem>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleWalletStatus(phone)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Block;
