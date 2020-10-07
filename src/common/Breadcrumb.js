/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Fragment } from "react";
import { Trans } from "react-i18next";
import { Link } from "react-router-dom";
import "twin.macro";
import { ChevronLeftIcon, ChevronRightIcon } from "./Icons";

const BreadcrumbLink = (props) => {
  return (
    <Link
      tw="text-sm leading-5 font-medium text-gray-400 hover:text-gray-200 transition duration-150 ease-in-out"
      {...props}
    />
  );
};

export const Breadcrumb = ({ items }) => {
  // TODO: add breadcrumb metadata
  return (
    <Fragment>
      <nav tw="flex sm:hidden items-center">
        <ChevronLeftIcon tw="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-gray-500" />
        {/* FIXME: resolve "back" link */}
        <BreadcrumbLink to="/">
          <Trans i18nKey="Breadcrumbs.back" />
        </BreadcrumbLink>
      </nav>
      <nav tw="hidden sm:flex items-center">
        {items.map((item, index) => (
          <Fragment key={item.to}>
            {index !== 0 && <ChevronRightIcon tw="flex-shrink-0 mx-2 h-5 w-5 text-gray-500" />}
            <BreadcrumbLink to={item.to}>{item.label}</BreadcrumbLink>
          </Fragment>
        ))}
      </nav>
    </Fragment>
  );
};
