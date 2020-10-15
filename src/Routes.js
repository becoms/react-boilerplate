/** @jsx jsx */
import { jsx } from "@emotion/core";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "twin.macro";
import { Layout } from "./shared/Layout";
import { PageSkeleton } from "./shared/Page";

const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const NotFound = lazy(() => import("./not-found/NotFound"));
const Team = lazy(() => import("./team/Team"));

export const Routes = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<PageSkeleton />}>
          <Switch>
            <Route path="/" component={Dashboard} exact />
            <Route path="/team" component={Team} exact />
            <Route path="*" component={NotFound} exact />
          </Switch>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
};
