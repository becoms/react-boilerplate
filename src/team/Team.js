/** @jsxImportSource @emotion/react */
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import "twin.macro";
import { Page, PageContent, PageHeader, PageTitle } from "../shared/Page";
import { Panel } from "../shared/Panel";

const Team = () => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet title={t("Team.title")} />
      <Page>
        <PageHeader title={<PageTitle>{t("Team.title")}</PageTitle>} />
        <PageContent>
          <Panel>
            <div tw="border-4 border-dashed border-gray-200 dark:border-gray-700 rounded-lg h-96" />
          </Panel>
        </PageContent>
      </Page>
    </>
  );
};

export default Team;
