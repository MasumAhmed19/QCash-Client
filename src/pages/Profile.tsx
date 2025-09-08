import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  User,
  MapPin,
  Phone,
  CreditCard,
  Shield,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import InfoItem from "@/components/modules/common/InfoItem";
import TimeAgo from "timeago-react";
import EditModal from "@/components/modules/common/EditModal";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import UpdateProfileModal from "@/components/modules/User/UpdateProfileModal";
import ProfileLoader from "@/components/modules/common/ProfileLoader";

const Profile = () => {
  const { data: userInfo, isLoading:loadingSkeleton } = useUserInfoQuery(undefined);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isLoading] = useState(false);

  const user = {
    name: "Demo name",
    email: "demo@example.com",
    picture:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    phone: "+880 1234 567890",
    nidNumber: "1234567890123",
    presentAddress: "123 Main Street, Dhaka, Bangladesh",
    permanentAddress: "456 Village Road, Chittagong, Bangladesh",
    bankAccount: "1234567890",
    role: "Premium User",
    status: "Active",
    isVerified: true,
    memberSince: "January 2023",
    lastLogin: "2 hours ago",
  };

  if (loadingSkeleton) {
    return <ProfileLoader />;
  }

  if (!user) {
    return <p className="text-center text-gray-500">No user info found</p>;
  }

  return (
    <div className="w-full mx-auto md:p-5">
      <Card className="rounded-2xl overflow-hidden">
        <CardHeader className="relative p-0 -mt-8">
          {/* Background Cover Image */}
          <div className="relative  h-48 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-700">
            <div className="absolute inset-0  bg-black/20"></div>
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
              <DialogTrigger className="absolute z-10 right-5 bottom-5" asChild>
                <Button variant="outline">Edit Profile</Button>
              </DialogTrigger>
              <EditModal onClose={() => setIsEditOpen(false)} />
            </Dialog>
          </div>

          {/* Profile Section */}
          <div className="relative px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-30 md:-mt-20">
              <div className="relative">
                <Avatar className="md:h-40 md:w-40 h-60 w-60 border-4 border-white shadow-lg">
                  <AvatarImage
                    src={userInfo?.data?.picture}
                    alt={userInfo?.data?.name}
                    className="object-cover"
                  />

                  <AvatarFallback className="text-2xl">
                    <User className="h-16 w-16" />
                  </AvatarFallback>
                </Avatar>
                <UpdateProfileModal />
              </div>

              <div className="flex-1 text-center sm:text-left sm:mt-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="relative md:-top-7">
                    <CardTitle className="text-2xl font-bold md:text-white text-primary capitalize">
                      {userInfo?.data?.name}
                    </CardTitle>
                    <p className="text-gray-600 mt-1">
                      {userInfo?.data?.email || user.email}
                    </p>
                    <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.status}
                      </span>
                      {user.isVerified && (
                        <span className="flex items-center text-green-600 text-sm">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="p-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">
                {userInfo?.data?.role}
              </div>
              <div className="text-sm text-gray-600">Account Type</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">
                <TimeAgo datetime={userInfo?.data?.createdAt} locale="vi" />
              </div>
              <div className="text-sm text-gray-600">Member Since</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">
                {user.lastLogin}
              </div>
              <div className="text-sm text-gray-600">Last Login</div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoItem
                icon={<Phone className="h-4 w-4" />}
                label="Phone Number"
                value={userInfo?.data?.phone}
              />
              <InfoItem
                icon={<CreditCard className="h-4 w-4" />}
                label="NID Number"
                value={userInfo?.data?.nidNumber || "-"}
              />
              <InfoItem
                icon={<MapPin className="h-4 w-4" />}
                label="Present Address"
                value={userInfo?.data?.presentAddress || "-"}
                fullWidth
              />
              <InfoItem
                icon={<MapPin className="h-4 w-4" />}
                label="Permanent Address"
                value={userInfo?.data?.permanentAddress || "-"}
                fullWidth
              />
            </div>
          </div>

          <Separator className="my-6" />

          {/* Account Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
              Account Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoItem
                icon={<CreditCard className="h-4 w-4" />}
                label="Bank Account"
                value={userInfo?.data?.bankAccount || "-"}
              />
              <InfoItem
                icon={<Shield className="h-4 w-4" />}
                label="Account Role"
                value={userInfo?.data?.role}
              />
              <InfoItem
                icon={
                  user.isVerified ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600" />
                  )
                }
                label="Verification Status"
                value={userInfo?.data?.isVerified ? "Verified" : "Not Verified"}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
