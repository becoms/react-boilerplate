/** @jsx jsx */
import { jsx } from "@emotion/core";
import { SkipNavContent } from "@reach/skip-nav";
import { Fragment } from "react";
import { Helmet } from "react-helmet-async";
import { Trans, useTranslation } from "react-i18next";
import "twin.macro";
import { Breadcrumb } from "../common/Breadcrumb";
import { Layout } from "../common/Layout";

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <Helmet title={t("NotFound.title")} />
      <Layout
        header={
          <Fragment>
            <Breadcrumb
              items={[
                {
                  label: <Trans i18nKey="NotFound.title" />,
                  to: "/",
                },
              ]}
            />

            <SkipNavContent />

            <div tw="mt-2 md:flex md:justify-between">
              <div tw="flex-1 min-w-0">
                <h1 tw="text-2xl font-bold leading-7 text-white sm:text-3xl sm:leading-9 sm:truncate">
                  <Trans i18nKey="NotFound.title" />
                </h1>
              </div>
            </div>
          </Fragment>
        }
      >
        {/* Replace with your content */}
        <div tw="px-4 sm:px-6 lg:px-8">
          <section tw="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            <div tw="border-4 border-dashed border-gray-200 rounded-lg h-96" />
          </section>
        </div>
      </Layout>
    </Fragment>
  );
};

export default NotFound;
