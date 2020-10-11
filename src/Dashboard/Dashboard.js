/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Fragment } from "react";
import { Helmet } from "react-helmet-async";
import { Trans, useTranslation } from "react-i18next";
import "twin.macro";
import { Breadcrumb } from "../shared/Breadcrumb";
import { Page } from "../shared/Page";

const Dashboard = () => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <Helmet title={t("Dashboard.title")} />
      <Page
        breadcrumb={
          <Breadcrumb
            items={[
              {
                label: <Trans i18nKey="Dashboard.title" />,
                to: "/",
              },
            ]}
          />
        }
        title={<Trans i18nKey="Dashboard.title" />}
      >
        <section tw="bg-white rounded-lg shadow py-6 px-5 sm:px-6">
          <div tw="border-4 border-dashed border-gray-200 rounded-lg h-96" />
        </section>
      </Page>
    </Fragment>
  );
};

export default Dashboard;
