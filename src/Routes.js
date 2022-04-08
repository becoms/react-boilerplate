import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./shared/Layout";
import { PageSkeleton } from "./shared/Page";
import { CrudList } from "./crud/CrudList";
import { CrudCreation } from "./crud/CrudCreation";
import { CrudDetails } from "./crud/CrudDetails";
import { DashboardScreen } from "./dashboard/DashboardScreen";
import { NotFoundScreen } from "./not-found/NotFoundScreen";

export const AppRoutes = withAuthenticationRequired(() => {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/crud" element={<CrudList />} exact />
            <Route path="/crud/new" element={<CrudCreation />} exact />
            <Route path="/crud/:crudId" element={<CrudDetails />} exact />
            <Route path="/" element={<DashboardScreen />} />
            <Route path="*" element={<NotFoundScreen />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
});
