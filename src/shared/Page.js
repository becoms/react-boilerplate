/** @jsx jsx */
import { jsx } from "@emotion/core";
import { SkipNavContent } from "@reach/skip-nav";
import "twin.macro";

export const Page = ({ breadcrumb, title, actions, children }) => {
  return (
    <main tw="flex-1 relative overflow-y-auto">
      <div tw="py-6">
        <header tw="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {breadcrumb}
          <SkipNavContent />
          <div tw="mt-2 md:flex md:items-center md:justify-between">
            <div tw="flex-1 min-w-0">
              <h1 tw="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate">
                {title}
              </h1>
            </div>
            {actions && <div tw="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4 space-x-3">{actions}</div>}
          </div>
        </header>
        <div tw="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-5">{children}</div>
      </div>
    </main>
  );
};

export const PageSkeleton = () => {
  return (
    <Page
      breadcrumb={
        <div tw="flex space-x-4">
          <div tw="h-4 my-0.5 bg-gray-200 w-16 rounded-md animate-pulse" />
          <div tw="h-4 my-0.5 bg-gray-200 w-16 rounded-md hidden sm:block animate-pulse" />
        </div>
      }
      title={<div tw="h-6 sm:h-8 my-1 mt-3 sm:my-0.5 bg-gray-200 w-1/3 rounded-md animate-pulse" />}
    >
      <section tw="bg-white rounded-lg shadow py-6 px-5 sm:px-6">
        <div tw="h-96" />
      </section>
    </Page>
  );
};
