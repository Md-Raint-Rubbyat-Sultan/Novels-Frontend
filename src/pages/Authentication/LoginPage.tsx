import { SkeletonCard } from "@/components/Layouts/Shared/skeletonCard";
import { LoginForm } from "@/components/Modules/Authentication/LoginForm";
import { useGetMeQuery } from "@/redux/features/user/user.api";
import React from "react";
import { Navigate } from "react-router";

type Props = {};

const LoginPage: React.FC<Props> = () => {
  const { data: user, isLoading: userLoading } = useGetMeQuery(undefined);

  if (userLoading) return <SkeletonCard />;

  if (user) return <Navigate to={"/"} replace={true} />;

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
