/** @jsxImportSource @emotion/core */
import { useTranslation } from "react-i18next";
import "twin.macro";
import { Page, PageContent, PageHeader, PageTitle } from "../shared/Page";
import { Panel } from "../shared/Panel";
import { SEO } from "../shared/SEO";

const Dashboard = () => {
  const { t } = useTranslation();
  return (
    <>
      <SEO title={t("Dashboard.title")} description={t("Dashboard.description")} />
      <Page>
        <PageHeader title={<PageTitle>{t("Dashboard.title")}</PageTitle>} />
        <PageContent>
          <Panel>
            <div tw="border-4 border-dashed border-gray-200 dark:border-gray-700 rounded-lg h-96" />
          </Panel>
        </PageContent>
      </Page>
    </>
  );
};

export default Dashboard;
