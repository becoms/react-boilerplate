import { Children, Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Link, useRouteMatch } from "react-router-dom";
import "twin.macro";
import { ChevronLeftSolidIcon, ChevronRightSolidIcon } from "./Icons";

/** @type {typeof Link} */
export const BreadcrumbLink = ({ children, ...props }) => {
  return (
    <Link
      tw="text-sm leading-5 font-medium text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
      itemProp="item"
      {...props}
    >
      <span itemProp="name">{children}</span>
    </Link>
  );
};

export const Breadcrumb = ({ back, children }) => {
  const match = useRouteMatch(back);
  const { t } = useTranslation();
  const shouldDisplayBackLink = !match.isExact;
  const shouldDisplayBreadcrumb = Children.count(children) !== 0;
  return (
    <>
      {/* Mobile back link */}
      {shouldDisplayBackLink && (
        <nav tw="flex sm:hidden items-center mb-2">
          <ChevronLeftSolidIcon tw="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-gray-400" />
          <BreadcrumbLink to={back} tw="flex items-center">
            {t("Breadcrumb.back")}
          </BreadcrumbLink>
        </nav>
      )}
      {/* Desktop breadcrumb */}
      {shouldDisplayBreadcrumb && (
        <nav tw="hidden sm:block mb-2">
          <ol tw="flex items-center" itemScope itemType="https://schema.org/BreadcrumbList">
            {Children.map(children, (item, index) => (
              <Fragment key={index}>
                {index !== 0 && (
                  <ChevronRightSolidIcon tw="flex-shrink-0 mx-2 h-5 w-5 text-gray-400" />
                )}
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  {item}
                  <meta itemProp="position" content={index + 1} />
                </li>
              </Fragment>
            ))}
          </ol>
        </nav>
      )}
    </>
  );
};
