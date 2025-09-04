import { useMemo } from "react";
import { useGetEachTransactionsQuery } from "@/redux/features/user/user.api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // adjust shadcn imports if needed

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

import { useUserInfoQuery } from "@/redux/features/auth/auth.api";


const Analytics = () => {
  const { data: transactionsData } = useGetEachTransactionsQuery(undefined);
  const {data: userInfo} = useUserInfoQuery(undefined);

  const transactions = transactionsData?.data || [];


  // Chart data: total amount per day
  const chartData = useMemo(() => {
    const map: Record<string, number> = {};
    transactions.forEach((tx: any) => {
      const date = new Date(tx.createdAt).toLocaleDateString();
      map[date] = (map[date] || 0) + tx.amount;
    });
    return Object.entries(map).map(([date, amount]) => ({ date, amount }));
  }, [transactions]);

  // Summary
  const totalAmount = transactions.reduce((sum: number, tx: any) => sum + tx.amount, 0);
  const completedCount = transactions.filter((tx: any) => tx.status === "COMPLETED").length;

  return (
    <div className="p-4 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
        <Card>
          <CardContent className="text-2xl md:text-5xl">{userInfo?.data?.wallet?.balance}</CardContent>
          <CardHeader>
            <CardTitle>Balance</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardContent className="text-2xl md:text-5xl">{transactions.length}</CardContent>
          <CardHeader>
            <CardTitle>Total Transactions</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardContent className="text-2xl md:text-5xl">{totalAmount}</CardContent>
          <CardHeader>
            <CardTitle>Total Amount</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardContent className="text-2xl md:text-5xl">{completedCount}</CardContent>
          <CardHeader>
            <CardTitle>Completed Transactions</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction Amount Over Time</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#3b82f6" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      
    </div>
  );
};

export default Analytics;