import AvailableBalance from "@/components/modules/common/AvailableBalance";
import ReceptRecipients from "@/components/modules/common/ReceptRecipients";
import SendMoneyForm from "@/components/modules/User/SendMoneyForm";

const SendMoney = () => {
  return (
    <div className="space-y-5">
      <AvailableBalance />
      <div className="space-y-5 flex flex-col lg:flex-row gap-5">
        <SendMoneyForm />
        <ReceptRecipients type="SEND" />
      </div>
    </div>
  );
};

export default SendMoney;
