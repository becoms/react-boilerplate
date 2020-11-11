/** @jsxImportSource @emotion/core */
import { useTranslation } from "react-i18next";
import "twin.macro";
import { Breadcrumb, BreadcrumbLink } from "../shared/Breadcrumb";
import { Page, PageTitle } from "../shared/Page";
import { Panel } from "../shared/Panel";
import { SEO } from "../shared/SEO";

const Dashboard = () => {
  const { t } = useTranslation();
  return (
    <>
      <SEO title={t("Dashboard.title")} description={t("Dashboard.description")} />
      <Page
        breadcrumb={
          <Breadcrumb>
            <BreadcrumbLink to="/">{t("Dashboard.title")}</BreadcrumbLink>
          </Breadcrumb>
        }
        title={<PageTitle>{t("Dashboard.title")}</PageTitle>}
      >
        <Panel>
          <div tw="border-4 border-dashed border-gray-200 dark:border-gray-700 rounded-lg h-96" />
        </Panel>
      </Page>
    </>
  );
};

export default Dashboard;
