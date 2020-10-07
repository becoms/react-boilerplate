/** @jsx jsx */
import { jsx } from "@emotion/core";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "twin.macro";
import { Layout } from "./common/Layout";
import { PageSkeleton } from "./common/Page";

const Dashboard = lazy(() => import("./Dashboard/Dashboard"));
const NotFound = lazy(() => import("./NotFound/NotFound"));

export const Routes = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<PageSkeleton />}>
          <Switch>
            <Route path="/" exact>
              <Dashboard />
            </Route>
            <Route path="*" exact>
              <NotFound />
            </Route>
          </Switch>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
};
