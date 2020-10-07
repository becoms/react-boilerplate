/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Fragment } from "react";
import { Trans } from "react-i18next";
import { Link } from "react-router-dom";
import "twin.macro";
import { ChevronLeftSolidIcon, ChevronRightSolidIcon } from "./Icons";

const BreadcrumbLink = (props) => {
  return (
    <Link
      tw="text-sm leading-5 font-medium text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
      {...props}
    />
  );
};

export const Breadcrumb = ({ items }) => {
  return (
    <Fragment>
      <nav tw="flex sm:hidden items-center">
        <BreadcrumbLink to="/" tw="flex items-center">
          <ChevronLeftSolidIcon tw="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-gray-400" />
          <Trans i18nKey="Breadcrumbs.back" />
        </BreadcrumbLink>
      </nav>
      <nav tw="hidden sm:flex items-center">
        {items.map((item, index) => (
          <Fragment key={item.to}>
            {index !== 0 && <ChevronRightSolidIcon tw="flex-shrink-0 mx-2 h-5 w-5 text-gray-400" />}
            <BreadcrumbLink to={item.to}>{item.label}</BreadcrumbLink>
          </Fragment>
        ))}
      </nav>
    </Fragment>
  );
};
