import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const Commissions = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[50vh] flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center rounded-2xl p-8">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Commissions — Coming Soon</h1>
        <p className="text-sm text-muted-foreground mb-6">
          We’re building a better commissions dashboard for agents. Analytics, filters and export tools
          will be available here soon. Check back later or go to your dashboard.
        </p>
      </div>
    </div>
  );
};

export default Commissions;