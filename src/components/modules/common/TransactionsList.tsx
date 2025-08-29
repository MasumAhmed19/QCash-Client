import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useGetEachTransactionsQuery } from "@/redux/features/user/user.api";
import type { TransactionType } from "@/types";
import { useMemo, useState } from "react";

const TransactionTypeValue: Record<TransactionType, string> = {
  WITHDRAW: "Withdraw",
  CASH_IN: "Cash In",
  CASH_OUT: "Cash Out",
  SEND: "Send Money",
  ADD: "Add Money",
  B2B_TRANSFER: "B2B Transfer",
};

const TransactionsList = () => {
  const { data: userInfo } = useUserInfoQuery(undefined);

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit] = useState(5); 
  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [search, setSearch] = useState("");

  // Fetch transactions with pagination & filters
  const { data: transactionsData } = useGetEachTransactionsQuery({
    page,
    limit,
    type: typeFilter !== "ALL" ? typeFilter : undefined,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const transactions = transactionsData?.data || [];
  const meta = transactionsData?.meta || { total: 0, page: 1, limit: 5 };

  // Client-side search filter
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx: any) => {
      const matchSearch =
        (tx.from?.name?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (tx.to?.name?.toLowerCase() || "").includes(search.toLowerCase());
      return matchSearch;
    });
  }, [transactions, search]);

  // Total pages
  const totalPages = Math.ceil(meta.total / meta.limit);

  return (
    <div>
      {/* Filters */}
      <div className="flex gap-4 flex-wrap items-center mb-4">
        {/* Type Filter */}
        <Select onValueChange={(val) => setTypeFilter(val)} value={typeFilter}>
          <SelectTrigger className="w-50">
            <SelectValue placeholder="Filter by Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Types</SelectItem>
            {userInfo?.data?.role === "AGENT" ? (
              <>
                <SelectItem value="CASH_IN">Cash In</SelectItem>
                <SelectItem value="B2B_TRANSFER">B2B Transfer</SelectItem>
              </>
            ) : (
              <>
                <SelectItem value="SEND">Send Money</SelectItem>
                <SelectItem value="WITHDRAW">Withdraw/Cashout</SelectItem>
              </>
            )}
            <SelectItem value="ADD">Add Money</SelectItem>
          </SelectContent>
        </Select>

        {/* Search */}
        <Input
          className="flex-1"
          placeholder="Search by User or Agent"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Transactions Table */}
      {transactions.length > 0 ? (
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
                    <TableCell className="capitalize">
                      {tx.from?.name || "-"}
                    </TableCell>
                    <TableCell className="capitalize">
                      {tx.to?.name || "-"}
                    </TableCell>
                    <TableCell>
                      {TransactionTypeValue[tx.type as TransactionType] ||
                        tx.type}
                    </TableCell>
                    <TableCell>৳{tx.amount}</TableCell>
                    <TableCell>{tx.status}</TableCell>
                    <TableCell>
                      {new Date(tx.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="mt-4 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                      aria-disabled={page === 1}
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        isActive={page === i + 1}
                        onClick={() => setPage(i + 1)}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setPage((prev) =>
                          prev < totalPages ? prev + 1 : prev
                        )
                      }
                      aria-disabled={page === totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>You have no transactions</CardTitle>
          </CardHeader>
        </Card>
      )}
    </div>
  );
};

export default TransactionsList;
