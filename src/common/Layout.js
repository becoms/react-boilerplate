/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@reach/disclosure";
import { Menu, MenuButton, MenuItems, MenuLink, MenuPopover } from "@reach/menu-button";
import "@reach/menu-button/styles.css";
import { SkipNavLink } from "@reach/skip-nav";
import "@reach/skip-nav/styles.css";
import { Fragment, useCallback, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import tw from "twin.macro";

export const Layout = ({ header, children }) => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onMenuToggle = useCallback(() => setIsMenuOpen((isMenuOpen) => !isMenuOpen), []);

  return (
    <Fragment>
      <SkipNavLink>
        <Trans i18nKey="Layout.skipToContent" />
      </SkipNavLink>

      {/* Page header */}
      <div tw="bg-gray-800 pb-32">
        {/* Primary and mobile navigation */}
        <nav tw="bg-gray-800">
          {/* Primary navigation */}
          <Disclosure open={isMenuOpen} onChange={onMenuToggle}>
            <div tw="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div tw="border-b border-gray-700 flex items-center justify-between h-16 px-4 sm:px-0">
                {/* Logo & Menu */}
                <div tw="flex items-center">
                  {/* Logo */}
                  <img
                    tw="h-8 w-8 flex-shrink-0"
                    src="https://tailwindui.com/img/logos/workflow-mark-on-dark.svg"
                    alt="Workflow logo"
                  />

                  {/* Menu */}
                  <div tw="hidden md:flex ml-10 items-baseline space-x-4">
                    <NavLink
                      to="/"
                      exact
                      tw="px-3 py-2 rounded-md text-sm font-medium text-white hover:(bg-gray-700) focus:(outline-none bg-gray-700)"
                      css={{ "&.active": tw`bg-gray-900`, "&.active:hover": tw`bg-gray-900` }}
                    >
                      <Trans i18nKey="Layout.dashboard" />
                    </NavLink>
                    <NavLink
                      to="/team"
                      tw="px-3 py-2 rounded-md text-sm font-medium text-white hover:(bg-gray-700) focus:(outline-none bg-gray-700)"
                      css={{ "&.active": tw`bg-gray-900`, "&.active:hover": tw`bg-gray-900` }}
                    >
                      <Trans i18nKey="Layout.team" />
                    </NavLink>
                    <NavLink
                      to="/projects"
                      tw="px-3 py-2 rounded-md text-sm font-medium text-white hover:(bg-gray-700) focus:(outline-none bg-gray-700)"
                      css={{ "&.active": tw`bg-gray-900`, "&.active:hover": tw`bg-gray-900` }}
                    >
                      <Trans i18nKey="Layout.projects" />
                    </NavLink>
                    <NavLink
                      to="/calendar"
                      tw="px-3 py-2 rounded-md text-sm font-medium text-white hover:(bg-gray-700) focus:(outline-none bg-gray-700)"
                      css={{ "&.active": tw`bg-gray-900`, "&.active:hover": tw`bg-gray-900` }}
                    >
                      <Trans i18nKey="Layout.calendar" />
                    </NavLink>
                    <NavLink
                      to="/reports"
                      tw="px-3 py-2 rounded-md text-sm font-medium text-white hover:(text-white bg-gray-700) focus:(outline-none text-white bg-gray-700)"
                      css={{ "&.active": tw`bg-gray-900`, "&.active:hover": tw`bg-gray-900` }}
                    >
                      <Trans i18nKey="Layout.reports" />
                    </NavLink>
                  </div>
                </div>

                {/* Right actions */}
                <div tw="hidden md:flex ml-4 items-center md:ml-6">
                  {/* Notifications button */}
                  <button
                    tw="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700"
                    aria-label={t("Layout.notifications")}
                  >
                    <svg tw="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </button>

                  {/* Profile dropdown  */}
                  <div tw="ml-3 relative">
                    <Menu>
                      {({ isExpanded }) => (
                        <Fragment>
                          {/* Profile button */}
                          <MenuButton
                            tw="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid"
                            aria-label={
                              isExpanded
                                ? t("Layout.closeProfileMenu")
                                : t("Layout.openProfileMenu")
                            }
                          >
                            <img
                              tw="h-8 w-8 rounded-full"
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
                          </MenuButton>

                          <MenuPopover
                            portal={false}
                            tw="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white transition ease-in-out duration-100"
                            css={{
                              ...(isExpanded
                                ? tw`transform opacity-100 scale-100 pointer-events-auto`
                                : tw`transform opacity-0 scale-95 pointer-events-none`),
                              "&[hidden]": tw`block`,
                            }}
                          >
                            <MenuItems tw="border-none p-0">
                              <MenuLink
                                as={NavLink}
                                to="/profile"
                                tw="block px-4 py-2 text-sm text-gray-700 hover:(bg-gray-100 text-gray-700)"
                                css={{ "&[data-selected]": tw`bg-gray-100 text-gray-700` }}
                              >
                                <Trans i18nKey="Layout.yourProfile" />
                              </MenuLink>
                              <MenuLink
                                as={NavLink}
                                to="/settings"
                                tw="block px-4 py-2 text-sm text-gray-700 hover:(bg-gray-100 text-gray-700)"
                                css={{ "&[data-selected]": tw`bg-gray-100 text-gray-700` }}
                              >
                                <Trans i18nKey="Layout.settings" />
                              </MenuLink>
                              <MenuLink
                                as={NavLink}
                                to="/sign-out"
                                tw="block px-4 py-2 text-sm text-gray-700 hover:(bg-gray-100 text-gray-700)"
                                css={{ "&[data-selected]": tw`bg-gray-100 text-gray-700` }}
                              >
                                <Trans i18nKey="Layout.signOut" />
                              </MenuLink>
                            </MenuItems>
                          </MenuPopover>
                        </Fragment>
                      )}
                    </Menu>
                  </div>
                </div>

                {/* Mobile menu button */}
                <DisclosureButton
                  tw="inline-flex md:hidden inline-flex items-center justify-center -mr-2 p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
                  aria-label={isMenuOpen ? t("Layout.closeMenu") : t("Layout.openMenu")}
                >
                  <svg
                    tw="h-6 w-6"
                    css={isMenuOpen ? tw`hidden` : tw`block`}
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  <svg
                    tw="h-6 w-6"
                    css={isMenuOpen ? tw`block` : tw`hidden`}
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </DisclosureButton>
              </div>
            </div>

            {/* Mobile menu */}
            <DisclosurePanel tw="border-b border-gray-700 md:hidden">
              {/* Primary mobile menu */}
              <div tw="px-2 py-3 sm:px-3 space-y-1">
                <NavLink
                  to="/"
                  exact
                  tw="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:(text-white bg-gray-700) focus:(outline-none text-white bg-gray-700)"
                  css={{
                    "&.active": tw`text-white bg-gray-900`,
                    "&.active:hover": tw`bg-gray-900`,
                  }}
                >
                  <Trans i18nKey="Layout.dashboard" />
                </NavLink>
                <NavLink
                  to="/team"
                  tw="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:(text-white bg-gray-700) focus:(outline-none text-white bg-gray-700)"
                  css={{
                    "&.active": tw`text-white bg-gray-900`,
                    "&.active:hover": tw`bg-gray-900`,
                  }}
                >
                  <Trans i18nKey="Layout.team" />
                </NavLink>
                <NavLink
                  to="/projects"
                  tw="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:(text-white bg-gray-700) focus:(outline-none text-white bg-gray-700)"
                  css={{
                    "&.active": tw`text-white bg-gray-900`,
                    "&.active:hover": tw`bg-gray-900`,
                  }}
                >
                  <Trans i18nKey="Layout.projects" />
                </NavLink>
                <NavLink
                  to="/calendar"
                  tw="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:(text-white bg-gray-700) focus:(outline-none text-white bg-gray-700)"
                  css={{
                    "&.active": tw`text-white bg-gray-900`,
                    "&.active:hover": tw`bg-gray-900`,
                  }}
                >
                  <Trans i18nKey="Layout.calendar" />
                </NavLink>
                <NavLink
                  to="/reports"
                  tw="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:(text-white bg-gray-700) focus:(outline-none text-white bg-gray-700)"
                  css={{
                    "&.active": tw`text-white bg-gray-900`,
                    "&.active:hover": tw`bg-gray-900`,
                  }}
                >
                  <Trans i18nKey="Layout.reports" />
                </NavLink>
              </div>

              {/* User profile menu */}
              <div tw="pt-4 pb-3 border-t border-gray-700">
                <div tw="flex items-center px-5">
                  <img
                    tw="h-10 w-10 rounded-full flex-shrink-0"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <div tw="ml-3 space-y-1">
                    <div tw="text-base font-medium leading-none text-white">Tom Cook</div>
                    <div tw="text-sm font-medium leading-none text-gray-400">tom@example.com</div>
                  </div>
                </div>

                <div tw="mt-3 px-2 space-y-1">
                  <NavLink
                    to="/profile"
                    tw="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:(text-white bg-gray-700) focus:(outline-none text-white bg-gray-700)"
                    css={{
                      "&.active": tw`text-white bg-gray-900`,
                      "&.active:hover": tw`bg-gray-900`,
                    }}
                  >
                    <Trans i18nKey="Layout.yourProfile" />
                  </NavLink>
                  <NavLink
                    to="/settings"
                    tw="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:(text-white bg-gray-700) focus:(outline-none text-white bg-gray-700)"
                    css={{
                      "&.active": tw`text-white bg-gray-900`,
                      "&.active:hover": tw`bg-gray-900`,
                    }}
                  >
                    <Trans i18nKey="Layout.settings" />
                  </NavLink>
                  <NavLink
                    to="/sign-out"
                    tw="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:(text-white bg-gray-700) focus:(outline-none text-white bg-gray-700)"
                    css={{
                      "&.active": tw`text-white bg-gray-900`,
                      "&.active:hover": tw`bg-gray-900`,
                    }}
                  >
                    <Trans i18nKey="Layout.signOut" />
                  </NavLink>
                </div>
              </div>
            </DisclosurePanel>
          </Disclosure>
        </nav>

        <header tw="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">{header}</header>
      </div>

      <main tw="max-w-7xl mx-auto -mt-32 pb-12 px-4 sm:px-6 lg:px-8">{children}</main>
    </Fragment>
  );
};
