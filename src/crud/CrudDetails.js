/** @jsxImportSource @emotion/react */
import { useParams } from "react-router-dom";
import "twin.macro";
import { Page, PageContent, PageHeader, PageSkeleton, PageTitle } from "../shared/Page";
import { CrudForm } from "./CrudForm";
import { useFindByIdQuery } from "./CrudQueries";

export const CrudDetails = () => {
  const { crudId } = useParams();
  const { status, data: item, error } = useFindByIdQuery(crudId);

  return (
    <>
      {status === "loading" && <PageSkeleton />}
      {status === "error" && !item && <div>{error}</div>}
      {status === "success" && item && (
        <Page>
          <PageHeader title={<PageTitle>{item.serialNumber}</PageTitle>} />
          <PageContent>
            <CrudForm item={item} />
          </PageContent>
        </Page>
      )}
    </>
  );
};
