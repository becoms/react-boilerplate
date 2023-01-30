/** @jsxImportSource @emotion/react */
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { TestPage } from "./pages/test/TestPage";
import { UsersPage } from "./pages/users/UsersPage";
import { PageSkeleton } from "./shared/Page";

export const AppRoutes = withAuthenticationRequired(() => {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/" element={<TestPage />} />
            <Route path="/users" element={<UsersPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
});
