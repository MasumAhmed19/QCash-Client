import B2BTransferFrom from "@/components/modules/Agent/B2BTransferFrom"
import AvailableBalance from "@/components/modules/common/AvailableBalance"
import ReceptRecipients from "@/components/modules/common/ReceptRecipients"


const B2BTransfer = () => {
  return (
    <div className="space-y-5">
      <AvailableBalance />
      <div className="space-y-5 flex flex-col lg:flex-row gap-5">
        <B2BTransferFrom />
        <ReceptRecipients type="B2B_TRANSFER" />
      </div>
    </div>
  )
}

export default B2BTransfer

