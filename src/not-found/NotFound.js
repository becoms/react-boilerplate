/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import "twin.macro";
import { Breadcrumb } from "../shared/Breadcrumb";
import { Page, PageTitle } from "../shared/Page";
import { Panel } from "../shared/Panel";
import { SEO } from "../shared/SEO";

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <SEO title={t("NotFound.title")} />
      <Page
        breadcrumb={<Breadcrumb back="/" />}
        title={<PageTitle>{t("NotFound.title")}</PageTitle>}
      >
        <Panel>
          <div tw="border-4 border-dashed border-gray-200 rounded-lg h-96" />
        </Panel>
      </Page>
    </Fragment>
  );
};

export default NotFound;
