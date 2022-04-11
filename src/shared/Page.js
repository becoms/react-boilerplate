/** @jsxImportSource @emotion/react */
import { SkipNavContent } from "@reach/skip-nav";
import "twin.macro";
import { Container } from "./Container";

export const Page = (props) => {
  return <main tw="flex-1 relative overflow-y-auto focus:(outline-none)" tabIndex={0} {...props} />;
};

export const PageHeader = ({ title, children }) => {
  return (
    <Container as="header" tw="mt-6">
      <div tw="xl:flex xl:justify-between">
        <SkipNavContent />
        <div tw="flex-1">{title}</div>
        {children && <div tw="flex flex-row flex-wrap md:mt-0 md:ml-4 space-x-3 space-y-1">{children}</div>}
      </div>
    </Container>
  );
};

export const PageTitle = ({ as: Component = "h1", ...props }) => {
  return <Component tw="text-3xl leading-9 font-extrabold text-gray-900" {...props} />;
};

export const PageContent = (props) => {
  return <Container tw="mt-5" {...props} />;
};

export const PageSkeleton = () => {
  return (
    <Page>
      <PageHeader
        title={<PageTitle as="div" tw="h-8 my-1 bg-gray-200 w-1/3 rounded-md animate-pulse" />}
      />
    </Page>
  );
};
