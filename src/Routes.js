/** @jsxImportSource @emotion/react */
import tw from "twin.macro";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { TestPage } from "./pages/test/TestPage";
import { PageSkeleton } from "./shared/Page";

export const AppRoutes = withAuthenticationRequired(() => {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/" element={<TestPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
});


