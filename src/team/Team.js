/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import "twin.macro";
import { Breadcrumb, BreadcrumbLink } from "../shared/Breadcrumb";
import { Page, PageTitle } from "../shared/Page";
import { Panel } from "../shared/Panel";
import { SEO } from "../shared/SEO";

const Team = () => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <SEO title={t("Team.title")} />
      <Page
        breadcrumb={
          <Breadcrumb back="/">
            <BreadcrumbLink to="/">{t("Dashboard.title")}</BreadcrumbLink>
            <BreadcrumbLink to="/team">{t("Team.title")}</BreadcrumbLink>
          </Breadcrumb>
        }
        title={<PageTitle>{t("Team.title")}</PageTitle>}
      >
        <Panel>
          <div tw="border-4 border-dashed border-gray-200 rounded-lg h-96" />
        </Panel>
      </Page>
    </Fragment>
  );
};

export default Team;