/** @jsxImportSource ../emotion-runtime */
import { SkipNavContent } from "@reach/skip-nav";
import "twin.macro";
import { Panel } from "./Panel";

export const Page = ({ breadcrumb, title, actions, children }) => {
  return (
    <main tw="flex-1 relative overflow-y-auto py-6">
      <header tw="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {breadcrumb}
        <div tw="md:flex md:items-center md:justify-between">
          <SkipNavContent />
          <div tw="flex-1 min-w-0">{title}</div>
          {actions && <div tw="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4 space-x-3">{actions}</div>}
        </div>
      </header>
      <div tw="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-5">{children}</div>
    </main>
  );
};

export const PageTitle = ({ as: Component = "h1", ...props }) => {
  return (
    <Component
      tw="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:leading-9 sm:truncate"
      {...props}
    />
  );
};

export const PageSkeleton = () => {
  return (
    <Page
      breadcrumb={
        <div tw="flex space-x-4">
          <div tw="h-4 my-0.5 bg-gray-200 dark:bg-gray-800 w-16 rounded-md animate-pulse" />
          <div tw="h-4 my-0.5 bg-gray-200 dark:bg-gray-800 w-16 rounded-md hidden sm:block animate-pulse" />
        </div>
      }
      title={
        <PageTitle
          as="div"
          tw="h-6 sm:h-8 my-1 mt-3 bg-gray-200 dark:bg-gray-800 w-1/3 rounded-md animate-pulse"
        />
      }
    >
      <Panel>
        <div tw="h-96" />
      </Panel>
    </Page>
  );
};
