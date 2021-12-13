import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./shared/Layout";
import { PageSkeleton } from "./shared/Page";

const DashboardScreen = lazy(() => import("./dashboard/DashboardScreen"));
const NotFoundScreen = lazy(() => import("./not-found/NotFoundScreen"));

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/" component={DashboardScreen} exact />
            <Route path="*" component={NotFoundScreen} exact />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
};
