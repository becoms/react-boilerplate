
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "react-oidc-context";

import ErrorPage from "./routes/error.page";
import Layout from "./routes/layout/page-layout";
import { Spinner } from "@/components/spinner";
import PermissionsProvider from "./auth/permissions.context";
import PermissionProtectedRoute from "./auth/permission-protected-routes";
import SignIn from "./routes/sign-in.page";
import CustomAuthProvider from "./auth/custom-auth.provider";
import HomePage from "./routes/home/home.page";
import { SelectionPage } from "./routes/selections/selection.page";


const AuthenticationGuard = () => {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-1 w-full justify-center">
        <Spinner className="h-16 w-16 text-secondary" />
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <SignIn />;
};

const router = createBrowserRouter([
  {
    element: (
      <CustomAuthProvider>
        <PermissionsProvider>
          <Outlet />
        </PermissionsProvider>
      </CustomAuthProvider>
    ),
    children: [
      {
        element: <Layout />,
        children: [
          {
            element: <AuthenticationGuard />,
            children: [
              {
                path: "controler",
                element: <PermissionProtectedRoute permissions={["controler", "admin"]} />,
                children: [
                  {
                    path: "selections",
                    element: <SelectionPage />,
                  },
                ],
              },
              {
                path: "",
                element: <HomePage />,
              },
            ],
          },
          {
            path: "*",
            element: <ErrorPage />,
          },
        ],
      },
    ],
  }
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
