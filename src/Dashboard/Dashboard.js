/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Fragment } from "react";
import { Helmet } from "react-helmet-async";
import { Trans, useTranslation } from "react-i18next";
import "twin.macro";
import { Layout } from "../common/Layout";

const Dashboard = () => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <Helmet title={t("Dashboard.dashboard")} />
      <Layout
        header={
          <h1 tw="text-3xl leading-9 font-bold text-white">
            <Trans i18nKey="Dashboard.dashboard">Dashboard</Trans>
          </h1>
        }
      >
        {/* Replace with your content */}
        <div tw="border-4 border-dashed border-gray-200 rounded-lg h-96" />
      </Layout>
    </Fragment>
  );
};

export default Dashboard;
