import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Suspense, useCallback, useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./shared/Layout";
import { PageSkeleton } from "./shared/Page";
import { DashboardScreen } from "./dashboard/DashboardScreen";
import { NotFoundScreen } from "./not-found/NotFoundScreen";
import { ItemCrud, ITEM_ROOT_ROUTE, ITEM_CREATION_ROUTE, ITEM_DETAILS_ROUTE, ITEM_DETAILS_PATH_PARAM } from "./items/ItemCrud";
import { ItemForm } from "./items/ItemForm";
import { CrudCreation, CrudDetails } from "./shared/CrudForm";
import { useFindByIdQuery } from "./items/useItemQueries";

export const AppRoutes = withAuthenticationRequired(() => {
  const renderFormFields = useCallback(() => <ItemForm />, []);
  const creationElement = useMemo(() => (
    <CrudCreation renderFormFields={renderFormFields} listRoute="/item" />
  ), []);
  const detailsElement = useMemo(() => (
    <CrudDetails
      renderFormFields={renderFormFields}
      useFindByIdQuery={useFindByIdQuery}
      listRoute={ITEM_ROOT_ROUTE}
      idPathParam={ITEM_DETAILS_PATH_PARAM}
    />
  ), []);
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path={ITEM_ROOT_ROUTE} element={<ItemCrud />} exact />
            <Route path={ITEM_CREATION_ROUTE} element={creationElement} exact />
            <Route path={ITEM_DETAILS_ROUTE} element={detailsElement} exact />
            <Route path="/" element={<DashboardScreen />} />
            <Route path="*" element={<NotFoundScreen />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
});
