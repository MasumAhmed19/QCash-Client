// import { useAllTransactionsQuery } from "@/redux/features/admin/admin.api";
// import {
//   Card,
//   CardContent,
// } from "@/components/ui/card";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import TableLoader from "@/components/modules/common/TableLoader";

// const Transactions = () => {
//   const { data: AllTransactions, isLoading } = useAllTransactionsQuery(undefined);
//   console.log(AllTransactions)

//   if (isLoading) {
//     return (
//       <TableLoader />
//     );
//   }


//   const transactions = AllTransactions?.data?.data || [];

//   return (
//     <div className="md:p-6 space-y-6">
//       {/* Page Header */}
//       <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
//         <h1 className="text-2xl font-bold">Transactions</h1>

//         <div className="flex gap-2">
//           <Input placeholder="Search by phone..." className="w-48" />
//           <Select>
//             <SelectTrigger className="w-40">
//               <SelectValue placeholder="Filter by Type" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="ALL">All</SelectItem>
//               <SelectItem value="ADD">Add</SelectItem>
//               <SelectItem value="WITHDRAW">Withdraw</SelectItem>
//               <SelectItem value="TRANSFER">Transfer</SelectItem>
//             </SelectContent>
//           </Select>
//           <Select>
//             <SelectTrigger className="w-40">
//               <SelectValue placeholder="Status" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="ALL">All</SelectItem>
//               <SelectItem value="COMPLETED">Completed</SelectItem>
//               <SelectItem value="PENDING">Pending</SelectItem>
//               <SelectItem value="FAILED">Failed</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       {/* Transactions Table */}
//       <Card>
       
//         <CardContent>
//           <div className="overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>From</TableHead>
//                   <TableHead>To</TableHead>
//                   <TableHead>Type</TableHead>
//                   <TableHead>Amount</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Fee</TableHead>
//                   <TableHead>Commission</TableHead>
//                   <TableHead>Date</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {transactions.length > 0 ? (
//                   transactions.map((tx: any) => (
//                     <TableRow key={tx._id}>
//                       <TableCell>
//                         <div className="flex flex-col">
//                           <span className="font-medium">{tx.from?.name}</span>
//                           <span className="text-sm text-muted-foreground">{tx.from?.phone}</span>
//                         </div>
//                       </TableCell>
//                       <TableCell>
//                         <div className="flex flex-col">
//                           <span className="font-medium">{tx.to?.name}</span>
//                           <span className="text-sm text-muted-foreground">{tx.to?.phone}</span>
//                         </div>
//                       </TableCell>
//                       <TableCell>
//                         <Badge variant="outline" className="uppercase">{tx.type}</Badge>
//                       </TableCell>
//                       <TableCell className="font-semibold">৳{tx.amount}</TableCell>
//                       <TableCell>
//                         <Badge
//                           className={
//                             tx.status === "COMPLETED"
//                               ? "bg-green-100 text-green-700"
//                               : tx.status === "FAILED"
//                               ? "bg-red-500 text-white"
//                               : "bg-yellow-500 text-white"
//                           }
//                         >
//                           {tx.status}
//                         </Badge>
//                       </TableCell>
//                       <TableCell>৳{tx.fee}</TableCell>
//                       <TableCell>৳{tx.commission}</TableCell>
//                       <TableCell>
//                         {new Date(tx.createdAt).toLocaleString()}
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={8} className="text-center py-6">
//                       No transactions found
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Transactions;

import { useState, useEffect } from "react";
import { useAllTransactionsQuery } from "@/redux/features/admin/admin.api";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import TableLoader from "@/components/modules/common/TableLoader";
import { format } from "date-fns";

const Transactions = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [dateRange, setDateRange] = useState<[Date, Date] | undefined>();

  const startDate = dateRange?.[0] ? format(dateRange[0], "yyyy-MM-dd") : undefined;
  const endDate = dateRange?.[1] ? format(dateRange[1], "yyyy-MM-dd") : undefined;

  const { data: AllTransactions, isLoading, refetch } = useAllTransactionsQuery({
    page,
    limit,
    startDate,
    endDate,
  });

  useEffect(() => {
    refetch();
  }, [page, startDate, endDate, refetch]);

  if (isLoading) return <TableLoader />;

  const transactions = AllTransactions?.data?.data || [];
  const total = AllTransactions?.meta?.total || 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="md:p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h1 className="text-2xl font-bold">Transactions</h1>

        <div className="flex gap-2 flex-wrap">
          <Input placeholder="Search by phone..." className="w-48" />
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={setDateRange}
            className="border rounded-md p-2"
          />
          <Button onClick={() => setPage(1)}>Apply Date Filter</Button>
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
                {transactions.length ? (
                  transactions.map((tx: any) => (
                    <TableRow key={tx._id}>
                      <TableCell>
                        {tx.from?.name}
                        <br />
                        <span className="text-sm text-muted-foreground">{tx.from?.phone}</span>
                      </TableCell>
                      <TableCell>
                        {tx.to?.name}
                        <br />
                        <span className="text-sm text-muted-foreground">{tx.to?.phone}</span>
                      </TableCell>
                      <TableCell><Badge variant="outline">{tx.type}</Badge></TableCell>
                      <TableCell className="font-semibold">৳{tx.amount}</TableCell>
                      <TableCell>
                        <Badge className={
                          tx.status === "COMPLETED" ? "bg-green-100 text-green-700" :
                          tx.status === "FAILED" ? "bg-red-500 text-white" :
                          "bg-yellow-500 text-white"
                        }>{tx.status}</Badge>
                      </TableCell>
                      <TableCell>৳{tx.fee}</TableCell>
                      <TableCell>৳{tx.commission}</TableCell>
                      <TableCell>{tx.createdAt ? new Date(tx.createdAt).toLocaleString() : "-"}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-6">No transactions found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-end items-center mt-4 gap-2">
                <Button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</Button>
                <span>{page} / {totalPages}</span>
                <Button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Transactions;
