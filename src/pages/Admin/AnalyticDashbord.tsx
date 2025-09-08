import { Users, Wallet, UserPlus, DollarSign } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { PieChart, Pie, Cell, LabelList } from "recharts"
import { useAnalyticInfoQuery } from "@/redux/features/admin/admin.api"
import AdminAnalyticsLoader from "@/components/modules/Admin/AdminAnalyticsLoader"

interface AnalyticData {
  users: { total: number; active: number }
  agents: { total: number }
  wallets: { total: number; active: number; blocked: number; totalBalance: number }
  transactions: { totalVolume: number; totalCommission: number }
}

export const chartColors = ["#2a7aff", "#ff6900"] // active / inactive

export default function AnalyticDashboard() {
  const { data: analyticInfo, isLoading, isError } = useAnalyticInfoQuery(undefined)
  const data: AnalyticData | undefined = analyticInfo?.data

  if (isLoading) return <AdminAnalyticsLoader />
  if (isError || !data) return <div className="text-center mt-10 text-red-500">Error fetching data</div>

  // Fixed chart data preparation
  const userPieData = [
    { name: "Active", value: data.users.active, fill: chartColors[0] },
    { name: "Inactive", value: data.users.total - data.users.active, fill: chartColors[1] },
  ]

  const walletPieData = [
    { name: "Active", value: data.wallets.active, fill: chartColors[0] },
    { name: "Blocked", value: data.wallets.blocked, fill: chartColors[1] },
  ]

  // Fixed chart configuration
  const chartConfig: ChartConfig = {
    value: { label: "Count" },
    Active: { label: "Active", color: chartColors[0] },
    Inactive: { label: "Inactive", color: chartColors[1] },
    Blocked: { label: "Blocked", color: chartColors[1] },
  }

  return (
    <div className="p-6 space-y-6">
      {/* Top metrics cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center space-y-0 space-x-3">
            <Users className="w-6 h-6 text-green-500" />
            <CardTitle className="">Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.users.total}</p>
            <p className="text-sm text-gray-500">Active: {data.users.active}</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center space-y-0 space-x-3">
            <UserPlus className="w-6 h-6 text-blue-500" />
            <CardTitle>Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.agents.total}</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center space-y-0 space-x-3">
            <Wallet className="w-6 h-6 text-yellow-500" />
            <CardTitle>Wallets</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.wallets.totalBalance.toLocaleString()} BDT</p>
            <p className="text-sm text-gray-500">
              Active: {data.wallets.active} | Blocked: {data.wallets.blocked}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center space-y-0 space-x-3">
            <DollarSign className="w-6 h-6 text-purple-500" />
            <CardTitle>Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.transactions.totalVolume.toLocaleString()} BDT</p>
            <p className="text-sm text-gray-500">
              Commission: {data.transactions.totalCommission.toLocaleString()} BDT
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Users Pie Chart */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle>Users Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip 
                  cursor={false} 
                  content={<ChartTooltipContent hideLabel />} 
                />
                <Pie
                  data={userPieData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <LabelList
                    dataKey="name"
                    className="fill-background"
                    stroke="none"
                    fontSize={12}
                    formatter={(value: string) => value}
                  />
                  {userPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="text-muted-foreground leading-none">
              Active vs Inactive users
            </div>
          </CardFooter>
        </Card>

        {/* Wallets Pie Chart */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle>Wallets Status</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip 
                  cursor={false} 
                  content={<ChartTooltipContent hideLabel />} 
                />
                <Pie
                  data={walletPieData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <LabelList
                    dataKey="name"
                    className="fill-background"
                    stroke="none"
                    fontSize={12}
                    formatter={(value: string) => value}
                  />
                  {walletPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="text-muted-foreground leading-none">
              Active vs Blocked wallets
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}