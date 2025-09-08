import { useGetMeQuery } from "@/redux/features/user/user.api";
import type { IRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate, useLocation } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: IRole[]) => {
  const AuthWrapper = () => {
    const location = useLocation();
    const { data, isLoading } = useGetMeQuery(undefined);

    if (!isLoading && !data?.data?.email) {
      return <Navigate to={"/login"} state={{ path: location.pathname }} />;
    }

    if (
      requiredRole &&
      !isLoading &&
      data &&
      !requiredRole.includes(data?.data?.role)
    ) {
      return <Navigate to={"/unauthorized"} />;
    }

    return <Component />;
  };
  return AuthWrapper;
};
