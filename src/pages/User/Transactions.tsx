import AvailableBalance from '@/components/modules/common/AvailableBalance'
import TransactionsList from '@/components/modules/common/TransactionsList'

const Transactions = () => {
  return (
    <div className="space-y-5">
      <AvailableBalance />
      <div className="space-y-5 flex flex-col gap-5">
          <TransactionsList />
      </div>
    </div>
  )
}

export default Transactions