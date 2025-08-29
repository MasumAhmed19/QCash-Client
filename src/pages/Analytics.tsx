import { useState, useMemo } from "react";
import { useGetEachTransactionsQuery } from "@/redux/features/user/user.api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // adjust shadcn imports if needed
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Select } from "@radix-ui/react-select";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type {  TransactionType } from "@/types";

const TransactionTypeValue:Record<TransactionType, string>={
  "WITHDRAW":"Withdraw",
  "CASH_IN":"Cash In",
  "CASH_OUT":"Cash Out",
  "SEND":"Send Money",
  "ADD":"Add Money",
}


const Analytics = () => {
  const { data: transactionsData } = useGetEachTransactionsQuery(undefined);
  const {data: userInfo} = useUserInfoQuery(undefined);

  const transactions = transactionsData?.data || [];

  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // Filtered transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx: any) => {
      const matchStatus = statusFilter ? tx.status === statusFilter : true;
      const matchType = typeFilter ? tx.type === typeFilter : true;
      const matchSearch =
        tx.from.name.toLowerCase().includes(search.toLowerCase()) ||
        tx.to.name.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchType && matchSearch;
    });
  }, [transactions, statusFilter, typeFilter, search]);

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
      {/* <Card>
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
      </Card> */}

      {/* Filters */}
      <div className="flex gap-4 flex-wrap items-center">
        <Select onValueChange={(val) => setStatusFilter(val || null)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="COMPLETED">COMPLETED</SelectItem>
            <SelectItem value="PENDING">PENDING</SelectItem>
            <SelectItem value="FAILED">FAILED</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(val) => setTypeFilter(val || null)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="WITHDRAW">WITHDRAW</SelectItem>
            <SelectItem value="DEPOSIT">DEPOSIT</SelectItem>
            <SelectItem value="TRANSFER">TRANSFER</SelectItem>
          </SelectContent>
        </Select>

        <Input
          className="flex-1"
          placeholder="Search by User or Agent"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Transaction List */}
      {
        transactions.length > 0 ? 
      <Card>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((tx: any) => (
                <TableRow key={tx._id}>
                  <TableCell>{tx._id.slice(0, 20)}...</TableCell>
                  <TableCell className="capitalize">{tx.from.name}</TableCell>
                  <TableCell className="capitalize">{tx.to.name}</TableCell>
                  <TableCell>{TransactionTypeValue[tx.type as TransactionType]}</TableCell>
                  <TableCell>${tx.amount}</TableCell>
                  <TableCell>{tx.status}</TableCell>
                  <TableCell>
                    {new Date(tx.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
        :
        <Card>
          <CardHeader>
            <CardTitle>You have no transactions</CardTitle>
          </CardHeader>
        </Card>
      }
    </div>
  );
};

export default Analytics;
