import AvailableBalance from '@/components/modules/common/AvailableBalance'
import ReceptRecipients from '@/components/modules/common/ReceptRecipients'
import CashOutForm from '@/components/modules/User/CashOutForm'

const CashOut = () => {
  return (
    <div className="space-y-5">
      <AvailableBalance />
      <div className="space-y-5 flex flex-col lg:flex-row gap-5">
        <CashOutForm />
        <ReceptRecipients type="WITHDRAW" />
      </div>
    </div>
  )
}

export default CashOut