import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Layout } from "./shared/Layout";
import { PageSkeleton } from "./shared/Page";

const DashboardScreen = lazy(() => import("./dashboard/DashboardScreen"));
const NotFoundScreen = lazy(() => import("./not-found/NotFoundScreen"));

export const Routes = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<PageSkeleton />}>
          <Switch>
            <Route path="/" component={DashboardScreen} exact />
            <Route path="*" component={NotFoundScreen} exact />
          </Switch>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
};
