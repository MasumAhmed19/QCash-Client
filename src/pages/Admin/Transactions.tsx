import { useAllTransactionsQuery } from "@/redux/features/admin/admin.api";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

const Transactions = () => {
  const { data: AllTransactions, isLoading } = useAllTransactionsQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const transactions = AllTransactions?.data || [];

  return (
    <div className="md:p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h1 className="text-2xl font-bold">Transactions</h1>

        <div className="flex gap-2">
          <Input placeholder="Search by phone..." className="w-48" />
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All</SelectItem>
              <SelectItem value="ADD">Add</SelectItem>
              <SelectItem value="WITHDRAW">Withdraw</SelectItem>
              <SelectItem value="TRANSFER">Transfer</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="FAILED">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Transactions Table */}
      <Card>
       
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.length > 0 ? (
                  transactions.map((tx: any) => (
                    <TableRow key={tx._id}>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{tx.from?.name}</span>
                          <span className="text-sm text-muted-foreground">{tx.from?.phone}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{tx.to?.name}</span>
                          <span className="text-sm text-muted-foreground">{tx.to?.phone}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="uppercase">{tx.type}</Badge>
                      </TableCell>
                      <TableCell className="font-semibold">৳{tx.amount}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            tx.status === "COMPLETED"
                              ? "bg-green-100 text-green-700"
                              : tx.status === "FAILED"
                              ? "bg-red-500 text-white"
                              : "bg-yellow-500 text-white"
                          }
                        >
                          {tx.status}
                        </Badge>
                      </TableCell>
                      <TableCell>৳{tx.fee}</TableCell>
                      <TableCell>৳{tx.commission}</TableCell>
                      <TableCell>
                        {new Date(tx.createdAt).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-6">
                      No transactions found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Transactions;
