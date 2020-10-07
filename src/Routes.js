/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Fragment, lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "twin.macro";
import { Layout } from "./common/Layout";

const Dashboard = lazy(() => import("./Dashboard/Dashboard"));
const NotFound = lazy(() => import("./NotFound/NotFound"));

const PageSkeleton = () => {
  return (
    <Layout
      header={
        <Fragment>
          <div tw="flex space-x-4">
            <div tw="h-4 my-0.5 bg-gray-700 w-16 rounded-md animate-pulse" />
            <div tw="h-4 my-0.5 bg-gray-700 w-16 rounded-md hidden sm:block animate-pulse" />
          </div>
          <div tw="h-6 sm:h-8 mb-0.5 mt-2.5 bg-gray-700 w-1/3 rounded-md animate-pulse" />
        </Fragment>
      }
    >
      <div tw="px-4 sm:px-6 lg:px-8">
        <section tw="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
          <div tw="h-96" />
        </section>
      </div>
    </Layout>
  );
};

export const Routes = () => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};
