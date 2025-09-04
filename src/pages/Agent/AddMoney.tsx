import AddMoneyAgentForm from "@/components/modules/Agent/AddMoneyAgentForm";
import AvailableBalance from "@/components/modules/common/AvailableBalance";
import ReceptRecipients from "@/components/modules/common/ReceptRecipients";


const AddMoney = () => {
  return (
    <div className="space-y-5">
      <AvailableBalance />
      <div className="space-y-5 flex flex-col lg:flex-row gap-5">
        <AddMoneyAgentForm />
        <ReceptRecipients type="ADD" />
      </div>
    </div>
  );
};

export default AddMoney;
