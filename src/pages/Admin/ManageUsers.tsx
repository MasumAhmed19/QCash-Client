import Active from "@/components/modules/Admin/Active";
import Block from "@/components/modules/Admin/Block";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  useAllUsersQuery,
  useUpdateStatusMutation
} from "@/redux/features/admin/admin.api";
import type { IUser } from "@/types";
import { EllipsisVertical } from "lucide-react";
import { Link } from "react-router";
import { toast } from "sonner";
import TableLoader from "@/components/modules/common/TableLoader";

const ManageUsers = () => {
  const { data: allUsers, isLoading } = useAllUsersQuery(undefined);
  const [updateStatus] = useUpdateStatusMutation()

  const statusOptions = [
    { label: "Active", value: "ACTIVE", className: "text-green-600" },
    { label: "Pending", value: "PENDING", className: "text-yellow-600" },
    { label: "Suspend", value: "SUSPEND", className: "text-red-600" },
  ];

const handleStatusChange = async (phone: string, newStatus: string) => {
  const toastId = toast.loading("Updating user status...");
  const statusCapital = newStatus.toUpperCase()

  try {
    await updateStatus({ phone, statusInfo: { status: statusCapital } }).unwrap();

    toast.success("User status updated successfully 🎉", { id: toastId });
  } catch (err) {
    console.error("Failed to update status:", err);
    toast.error("Failed to update user status. Please try again.", { id: toastId });
  }
};

  if (isLoading) {
    return (
      <TableLoader />
    );
  }


  return (
    <div className="md:p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h1 className="text-2xl font-bold">All Users</h1>
        {/* (Optional) Filters/Search */}
      </div>

      {/* Users Table */}
      <Card>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Name</TableHead>
                  <TableHead className="font-semibold">Phone</TableHead>
                  <TableHead className="font-semibold hidden md:table-cell">
                    Wallet
                  </TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold hidden md:table-cell">
                    Verified
                  </TableHead>
                  <TableHead className="font-semibold hidden md:table-cell">
                    Transactions
                  </TableHead>
                  <TableHead className="w-[60px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allUsers?.data?.map((user: IUser, index: number) => (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* Name */}
                    <TableCell className="font-medium">{user?.name}</TableCell>

                    {/* Phone */}
                    <TableCell>{user?.phone}</TableCell>

                    {/* Wallet */}
                    <TableCell className="text-xs hidden md:table-cell">
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded-full font-medium",
                          user?.wallet?.status === "ACTIVE" &&
                            "bg-green-100 text-green-700",
                          user?.wallet?.status === "BLOCKED" &&
                            "bg-red-100 text-red-600"
                        )}
                      >
                        {user?.wallet?.status
                          ? user.wallet.status.charAt(0) +
                            user.wallet.status.slice(1).toLowerCase()
                          : "N/A"}
                      </span>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            "w-[6px] h-[6px] rounded-full",
                            user?.status === "ACTIVE" && "bg-green-500",
                            user?.status === "SUSPEND" && "bg-red-500",
                            user?.status === "PENDING" && "bg-yellow-400"
                          )}
                        />
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded-full text-xs font-medium",
                            user?.status === "ACTIVE" &&
                              "bg-green-100 text-green-700",
                            user?.status === "PENDING" &&
                              "bg-yellow-100 text-yellow-700",
                            user?.status === "SUSPEND" &&
                              "bg-red-100 text-red-600"
                          )}
                        >
                          {user?.status
                            ? user?.status.charAt(0) +
                              user?.status.slice(1).toLowerCase()
                            : "N/A"}
                        </span>
                      </div>
                    </TableCell>

                    {/* Verified */}
                    <TableCell className="hidden md:table-cell">
                      {user?.isVerified ? (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-50 text-green-600">
                          Yes
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-50 text-red-600">
                          No
                        </span>
                      )}
                    </TableCell>

                    {/* Transactions */}
                    <TableCell className="hidden md:table-cell">
                      {user?.transactions?.length ?? 0}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-gray-500 cursor-pointer hover:text-gray-700">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <EllipsisVertical size={18} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          className="w-40 md:w-56"
                          align="end"
                        >
                          <DropdownMenuLabel className="bg-gray-50 capitalize">
                            {user?.name}
                          </DropdownMenuLabel>
                          <hr />

                          <DropdownMenuGroup>
                            <DropdownMenuItem>
                              <Link to={`/admin/users/${user?.phone}`}>
                                View Details
                              </Link>
                              </DropdownMenuItem>

                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger>
                                Change Status
                              </DropdownMenuSubTrigger>
                              <DropdownMenuSubContent>
                                {statusOptions
                                  .filter((opt) => opt.value !== user?.status) // exclude current
                                  .map((opt) => (
                                    <DropdownMenuItem
                                      key={opt.value}
                                      className={opt.className}
                                      onClick={() =>
                                        handleStatusChange(
                                          user?.phone as string,
                                          opt.value
                                        )
                                      }
                                    >
                                      {opt.label}
                                    </DropdownMenuItem>
                                  ))}
                              </DropdownMenuSubContent>
                            </DropdownMenuSub>
                          </DropdownMenuGroup>

                          <DropdownMenuSeparator />

                          {user?.wallet?.status === "ACTIVE" ? (
                            <Block phone={user?.phone} />
                          ) : (
                            <Active phone={user?.phone} />
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageUsers;
