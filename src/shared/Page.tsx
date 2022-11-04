/** @jsxImportSource @emotion/react */
import { ReactNode } from "react";
import "twin.macro";

export const Page = (props) => {
  return <main tw="flex-1 relative overflow-y-auto focus:(outline-none)" tabIndex={0} {...props} />;
};

export const PageHeader = ({ title, children }: { title?: ReactNode; children?: ReactNode}) => {
  return (
    <header tw="max-w-5xl mx-auto px-4 sm:px-6 mt-6">
      <div tw="xl:flex xl:justify-between">
        <div tw="flex-1">{title}</div>
        {children && <div tw="flex flex-row flex-wrap md:mt-0 md:ml-4 space-x-3 space-y-1 items-center">{children}</div>}
      </div>
    </header>
  );
};

export const PageTitle = ({ as: Component = "h1", ...props }) => {
  return <Component tw="text-3xl leading-9 font-extrabold text-gray-900" {...props} />;
};

export const PageContent = (props) => {
  return <div tw="max-w-5xl mx-auto px-4 sm:px-6 mt-5" {...props} />;
};

export const PageSkeleton = () => {
  return (
    <Page>
      <PageHeader
        title={<PageTitle as="div" tw="h-8 my-1 bg-gray-200 w-1/3 rounded-md animate-pulse" />}
      ></PageHeader>
    </Page>
  );
};
