/** @jsx jsx */
import { jsx } from "@emotion/core";
import { SkipNavContent } from "@reach/skip-nav";
import { Fragment } from "react";
import { Helmet } from "react-helmet-async";
import { Trans, useTranslation } from "react-i18next";
import "twin.macro";
import { Breadcrumb } from "../common/Breadcrumb";
import { Layout } from "../common/Layout";

const Dashboard = () => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <Helmet title={t("Dashboard.title")} />
      <Layout
        header={
          <Fragment>
            <Breadcrumb
              items={[
                {
                  label: <Trans i18nKey="Dashboard.title" />,
                  to: "/",
                },
              ]}
            />

            <SkipNavContent />

            <h1 tw="text-2xl font-bold leading-7 text-white sm:text-3xl sm:leading-9 sm:truncate mt-2">
              <Trans i18nKey="Dashboard.title" />
            </h1>
          </Fragment>
        }
      >
        <section tw="bg-white rounded-lg shadow py-6 px-5 sm:px-6">
          <div tw="border-4 border-dashed border-gray-200 rounded-lg h-96" />
        </section>
      </Layout>
    </Fragment>
  );
};

export default Dashboard;
