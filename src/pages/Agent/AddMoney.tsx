import AvailableBalance from "@/components/modules/common/AvailableBalance";
import ReceptRecipients from "@/components/modules/common/ReceptRecipients";
import AddMoneyForm from "@/components/modules/User/AddMoneyForm";


const AddMoney = () => {
  return (
    <div className="space-y-5">
      <AvailableBalance />
      <div className="space-y-5 flex flex-col lg:flex-row gap-5">
        <AddMoneyForm />
        <ReceptRecipients type="ADD" />
      </div>
    </div>
  );
};

export default AddMoney;
