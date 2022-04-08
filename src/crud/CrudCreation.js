/** @jsxImportSource @emotion/react */
import "twin.macro";
import { Page, PageContent, PageHeader, PageTitle } from "../shared/Page";
import { useSearchQuery } from "./CrudQueries";
import { CrudForm } from "./CrudForm";

export const CrudCreation = ({ title }) => {
  const item = useSearchQuery();
  return (
    <Page>
      <PageHeader title={<PageTitle>{title}</PageTitle>} />
      <PageContent>
        <CrudForm item={item} />
      </PageContent>
    </Page>
  );
};
