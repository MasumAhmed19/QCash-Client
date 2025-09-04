import { Button } from "@/components/ui/button";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { Link } from "react-router";

const VerifyNotice = () => {
    const {data:user} = useUserInfoQuery(undefined)
  return (
    <div className="bg-primary flex-1 z-50 rounded-md  px-4 py-1 ">
      <div className="flex text-background flex-col justify-between gap-3 md:flex-row md:items-center">
        <p className="text-sm">
          You must fill in your information to verify your account and start transactions.
        </p>
        <div className="flex gap-2 max-md:flex-wrap">
          <Button variant="outline" className="text-foreground">
            <Link to={`/${user?.data?.role}/profile`}>
                Fill Info
            </Link>
            </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifyNotice;
