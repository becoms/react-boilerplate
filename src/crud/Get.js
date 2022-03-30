/** @jsxImportSource @emotion/react */
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import "twin.macro";
import { Page, PageContent } from "../shared/Page";
import { ChevronLeftIcon } from "@heroicons/react/solid";
import { useGetQuery } from "../APIs";
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateIllustration,
  EmptyStateTitle,
} from "../shared/EmptyState";
import { NotFoundIllustration } from "../not-found/NotFoundIllustration";
import { PrimaryButton } from "../shared/Buttons";
import { Pagination } from "../shared/Pagination";

const Get = () => {
  const pageSize = 1;
  const location = useLocation();
  const pageParams = location.search.substr(location.search.length - 1);

  const { status, data } = useGetQuery({
    limit: pageSize,
    skip: Number(pageParams) * pageSize,
  });

  const totalOfPages = status === "success" && Math.ceil(data.totalCount / pageSize);

  return (
    <>
      <Helmet title="Get" />
      <Page>
        <PageContent tw="h-screen">
          <Link
            to={{
              pathname: `/`,
            }}
            tw="inline-flex items-center space-x-3 text-sm font-medium text-gray-900"
          >
            <ChevronLeftIcon tw="-ml-2 h-5 w-5 text-gray-900" aria-hidden="true" />
            <span>Retour</span>
          </Link>

          {status === "loading" && "Loading"}
          {status === "error" && "error"}
          {status === "success" && data.totalCount === 0 ? (
            <EmptyState>
              <EmptyStateIllustration as={NotFoundIllustration} />
              <>
                <EmptyStateTitle as="h3">Il n'y a pas de chose créée</EmptyStateTitle>
                <>
                  <EmptyStateDescription>
                    Créer la première chose en cliquant sur le bouton ci-dessous.
                  </EmptyStateDescription>
                  <PrimaryButton as={Link} to={`/create`} tw="mt-8">
                    Créer une chose
                  </PrimaryButton>
                </>
              </>
            </EmptyState>
          ) : (
            data?.list.map((data, index) => (
              <Link to={`/test/${data._id}`} key={index}>
                <p tw="mt-6 text-2xl font-medium text-gray-700">{data.folder}</p>
              </Link>
            ))
          )}
          <Pagination data={data} pageParams={pageParams} totalOfPages={totalOfPages} />
        </PageContent>
      </Page>
    </>
  );
};

export default Get;
