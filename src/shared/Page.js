/** @jsxImportSource @emotion/react */
import { SkipNavContent } from "@reach/skip-nav";
import "twin.macro";
import { Container } from "./Container";
import { Panel } from "./Panel";

export const Page = (props) => {
  return <main tw="flex-1 relative overflow-y-auto py-6" {...props} />;
};

export const PageHeader = ({ title, actions }) => {
  return (
    <Container as="header">
      <div tw="md:flex md:items-center md:justify-between">
        <SkipNavContent />
        <div tw="flex-1 min-w-0">{title}</div>
        {actions && <div tw="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4 space-x-3">{actions}</div>}
      </div>
    </Container>
  );
};

export const PageTitle = ({ as: Component = "h1", ...props }) => {
  return (
    <Component tw="text-3xl leading-9 font-extrabold text-gray-900 dark:text-white" {...props} />
  );
};

export const PageContent = (props) => {
  return <Container tw="mt-5" {...props} />;
};

export const PageSkeleton = () => {
  return (
    <Page>
      <PageHeader
        title={
          <PageTitle
            as="div"
            tw="h-8 md:h-7 my-1 bg-gray-200 dark:bg-gray-800 w-1/3 rounded-md animate-pulse"
          />
        }
      />
      <PageContent>
        <Panel>
          <div tw="h-96" />
        </Panel>
      </PageContent>
    </Page>
  );
};
