import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  User,
  Phone,
  Wallet,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  Clock,
  DollarSign,
  MoveRight,
  MoveLeft,
  Repeat,
} from "lucide-react";
import { useSpecificUserDetailQuery } from "@/redux/features/admin/admin.api";
import { useParams } from "react-router";
import type { ITransaction, ITransactionType } from "@/types";

// Utility function to format relative time
const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
    }
  }
  return "just now";
};

const UserDetail = () => {
  const { phone } = useParams<{ phone: string }>();
  const { data: UserDetail, isLoading } = useSpecificUserDetailQuery(
    phone as string
  );

  const user = UserDetail?.data;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No user data found</p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTransactionIcon = (type: keyof ITransactionType) => {
    switch (type) {
      case "SEND":
        return <ArrowUpRight className="h-4 w-4 text-red-500" />;
      case "WITHDRAW":
        return <ArrowDownLeft className="h-4 w-4 text-green-500" />;
      case "ADD":
        return <Plus className="h-4 w-4 text-blue-500" />;
      case "CASH_IN":
        return <MoveRight className="h-4 w-4 text-purple-500" />;
      case "CASH_OUT":
        return <MoveLeft className="h-4 w-4 text-orange-500" />;
      case "B2B_TRANSFER":
        return <Repeat className="h-4 w-4 text-pink-500" />;
      default:
        return <DollarSign className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="w-full mx-auto md:p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">User Details</h1>
      </div>

      {/* User Profile Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="" alt={user.name} />
              <AvatarFallback className="text-lg">
                <User className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-xl capitalize">{user.name}</CardTitle>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center text-gray-600">
                  <Phone className="h-4 w-4 mr-1" />
                  {user.phone}
                </div>
                <Badge className={getStatusColor(user.status)}>
                  {user.status}
                </Badge>
                {user.isVerified && (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Verified
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Account Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem label="User ID" value={user._id} />
                <InfoItem label="Phone Number" value={user.phone} />
                <InfoItem label="Role" value={user.role} />
                <InfoItem label="Status" value={user.status} />
                <InfoItem label="NID" value={user.nidNumber} />

                <InfoItem
                  label="Verification"
                  value={user.isVerified ? "Verified" : "Not Verified"}
                />
                <InfoItem
                  label="Member Since"
                  value={formatTimeAgo(user.createdAt)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Transaction History */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              {user.transactions.length > 0 ? (
                <div className="space-y-3">
                  {user.transactions.map((transaction: any) => {
                    const { type, amount, commission, from, to } = transaction;

                    // Transaction description
                    let description = "";
                    if (type === "ADD") description = "Money Added";
                    else if (type === "SEND")
                      description = to ? `Sent to ${to.name}` : "Sent";
                    else if (type === "WITHDRAW")
                      description = "Money Withdrawn";
                    else if (type === "CASH_IN") description = "Cash In";
                    else if (type === "CASH_OUT") description = "Cash Out";
                    else if (type === "B2B_TRANSFER")
                      description = "B2B Transfer";
                    else description = type;

                    // Phones (if available)
                    const fromPhone = from?.phone ?? "-";
                    const toPhone = to?.phone ?? "-";

                    // Amount color
                    const isOutgoing =
                      type === "SEND" ||
                      type === "WITHDRAW" ||
                      type === "CASH_OUT" ||
                      type === "B2B_TRANSFER";
                    const amountSign = isOutgoing ? "-" : "+";

                    return (
                      <div
                        key={transaction._id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center space-x-3">
                          {getTransactionIcon(type)}
                          <div>
                            <div className="font-medium">{description}</div>
                            <div className="text-sm text-gray-500">
                              {fromPhone} → {toPhone}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`font-semibold ${
                              isOutgoing ? "text-red-600" : "text-green-600"
                            }`}
                          >
                            {amountSign}
                            {formatAmount(amount)}
                          </div>
                          {commission > 0 && (
                            <div className="text-sm text-gray-500">
                              Commission: {formatAmount(commission)}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No transactions found
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Wallet Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wallet className="h-5 w-5 mr-2" />
                Wallet Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {formatAmount(user.wallet.balance)}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Current Balance
                </div>
              </div>
              <Separator />
              <div className="space-y-3">
                <InfoItem label="Wallet ID" value={user.wallet._id} />
                <InfoItem
                  label="Wallet Status"
                  value={
                    <Badge className={getStatusColor(user.wallet.status)}>
                      {user.wallet.status}
                    </Badge>
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Transactions</span>
                <span className="font-semibold">
                  {user.transactions.length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Account Age</span>
                <span className="font-semibold">
                  {formatTimeAgo(user.createdAt)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Last Updated</span>
                <span className="font-semibold">
                  {formatTimeAgo(user.updatedAt)}
                </span>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

const InfoItem = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="space-y-1">
    <div className="text-sm text-gray-500">{label}</div>
    <div className="font-medium text-gray-900">
      {typeof value === "string" ? value : value}
    </div>
  </div>
);

export default UserDetail;
