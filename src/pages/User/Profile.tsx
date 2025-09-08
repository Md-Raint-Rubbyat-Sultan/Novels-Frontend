import { SkeletonCard } from "@/components/Layouts/Shared/skeletonCard";
import ChangePasswordModal from "@/components/Modules/User/Profile/ChangePasswordModal";
import ProfileCard from "@/components/Modules/User/Profile/ProfileCard";
import RoleChange from "@/components/Modules/User/Profile/RoleChange";
import UpdateModal from "@/components/Modules/User/Profile/UpdateModal";
import { useGetMeQuery } from "@/redux/features/user/user.api";
import React from "react";

type Props = {};

const Profile: React.FC<Props> = () => {
  const { data: userInfo } = useGetMeQuery(undefined);

  const user = userInfo?.data;

  if (!user) return <SkeletonCard />;

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Profile Card */}
      <ProfileCard user={user} />
      <div className="flex flex-wrap justify-end items-center gap-2">
        {/* Update Profile Dialog */}
        <UpdateModal user={user} />
        {/* Change password */}
        <ChangePasswordModal />
        {/* Role Change Dialog */}
        {user.role !== "ADMIN" && user.role !== "SUPER_ADMIN" && (
          <RoleChange user={user} />
        )}
      </div>
    </div>
  );
};

export default Profile;
