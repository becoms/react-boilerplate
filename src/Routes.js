import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { PageSkeleton } from "./shared/Page";
import { DashboardScreen } from "./dashboard/DashboardScreen";
import { NotFoundScreen } from "./not-found/NotFoundScreen";

export const AppRoutes = withAuthenticationRequired(() => {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/" element={<DashboardScreen />} />
            <Route path="*" element={<NotFoundScreen />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
});
