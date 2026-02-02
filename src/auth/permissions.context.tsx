import { JwtPayload, jwtDecode } from "jwt-decode";
import { ReactNode, createContext, useContext, useMemo } from "react";
import { AuthContextProps, useAuth } from "react-oidc-context";
import { Permission } from "./permission.type";

interface DecodedJwtPayload extends JwtPayload {
  resource_access?: {
    [audience: string]: {
      roles?: Permission[];
    };
  };
}

interface PermissionsContextType {
  permissions: Permission[];
  hasPermission: (permission: Permission) => boolean;
}

const PermissionsContext = createContext<PermissionsContextType | null>(null);

const getPermissions = (auth: AuthContextProps): Permission[] => {
  const token = auth.user?.access_token;
  if (token) {
    // Depending on the audience, we need to decode the token differently
    return jwtDecode<DecodedJwtPayload>(token, { header: true }) ? ['admin'] : [];
  } else {
    return [];
  }
};

const PermissionsProvider = (props: { children?: ReactNode }) => {
  const auth = useAuth();

  const permissions = useMemo(() => getPermissions(auth), [auth]);

  const hasPermission = (permission: Permission) =>
    permissions.includes(permission);

  return (
    <PermissionsContext.Provider
      value={{ permissions, hasPermission }}
      {...props}
    />
  );
};

export const usePermissions = () => {
  const context = useContext(PermissionsContext);
  if (context === null) {
    throw new Error(
      "usePermissions has to be used within <PermissionsProvider />"
    );
  }
  return context;
};

export default PermissionsProvider;
