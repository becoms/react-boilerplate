import { useMemo } from "react";
import { Outlet } from "react-router-dom";
import { usePermissions } from "./permissions.context";
import { Permission } from "./permission.type";
import ErrorPage from "@/routes/error.page";

interface Props {
  permissions: Permission[];
}

const PermissionProtectedRoute = ({ permissions }: Props) => {
  const { hasPermission } = usePermissions();

  const isAuthorized = useMemo(
    () => permissions.some((permission) => hasPermission(permission)),
    [permissions, hasPermission]
  );

  if (!isAuthorized) {
    return <ErrorPage />;
  }

  return <Outlet />;
};

export default PermissionProtectedRoute;
