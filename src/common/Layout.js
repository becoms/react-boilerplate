/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useId } from "@reach/auto-id";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { Menu, MenuButton, MenuItems, MenuLink, MenuPopover } from "@reach/menu-button";
import "@reach/menu-button/styles.css";
import { SkipNavLink } from "@reach/skip-nav";
import "@reach/skip-nav/styles.css";
import { Fragment, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import { animated, useTransition } from "react-spring";
import tw from "twin.macro";
import {
  BellOutlineIcon,
  CalendarOutlineIcon,
  ChartBarOutlineIcon,
  FolderOutlineIcon,
  HomeOutlineIcon,
  InboxOutlineIcon,
  MenuAlt2OutlineIcon,
  SearchSolidIcon,
  UsersOutlineIcon,
  XOutlineIcon,
} from "./Icons";

const SearchBar = () => {
  const { t } = useTranslation();
  const id = useId();
  return (
    <form tw="w-full flex md:ml-0" action="#" method="GET">
      <label htmlFor={id} tw="sr-only">
        {t("Layout.search")}
      </label>
      <div tw="relative w-full text-gray-400 focus-within:text-gray-600">
        <div tw="absolute inset-y-0 left-0 flex items-center pointer-events-none">
          <SearchSolidIcon tw="h-5 w-5" />
        </div>
        <input
          id={id}
          tw="block w-full h-full pl-8 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:(outline-none placeholder-gray-400) sm:text-sm"
          placeholder={t("Layout.search")}
          type="search"
        />
      </div>
    </form>
  );
};

const ProfileDropdown = () => {
  const { t } = useTranslation();
  return (
    <div tw="relative">
      <Menu>
        {({ isExpanded }) => (
          <Fragment>
            {/* Profile button */}
            <MenuButton
              tw="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:shadow-outline"
              aria-label={isExpanded ? t("Layout.closeProfileMenu") : t("Layout.openProfileMenu")}
            >
              <img
                tw="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </MenuButton>
            {/* Profile dropdown panel, show/hide based on dropdown state. */}
            <MenuPopover
              portal={false}
              tw="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg transition ease-in-out duration-100"
              css={[
                isExpanded
                  ? tw`transform opacity-100 scale-100 pointer-events-auto`
                  : tw`transform opacity-0 scale-95 pointer-events-none`,
                { "&[hidden]": tw`block` },
              ]}
            >
              <MenuItems tw="border-none py-1 rounded-md bg-white shadow-xs">
                <MenuLink
                  as={Link}
                  to="/profile"
                  tw="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition ease-in-out duration-150"
                  css={{ "&[data-selected]": tw`bg-gray-100 text-gray-700` }}
                >
                  {t("Layout.yourProfile")}
                </MenuLink>

                <MenuLink
                  as={Link}
                  to="/settings"
                  tw="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition ease-in-out duration-150"
                  css={{ "&[data-selected]": tw`bg-gray-100 text-gray-700` }}
                >
                  {t("Layout.settings")}
                </MenuLink>

                <MenuLink
                  as={Link}
                  to="/logout"
                  tw="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition ease-in-out duration-150"
                  css={{ "&[data-selected]": tw`bg-gray-100 text-gray-700` }}
                >
                  {t("Layout.signOut")}
                </MenuLink>
              </MenuItems>
            </MenuPopover>
          </Fragment>
        )}
      </Menu>
    </div>
  );
};

const NotificationButton = () => {
  const { t } = useTranslation();
  return (
    <button
      tw="p-1 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:shadow-outline focus:text-gray-500"
      aria-label={t("Layout.notifications")}
    >
      <BellOutlineIcon tw="h-6 w-6" />
    </button>
  );
};

const OpenSidebarButton = (props) => {
  const { t } = useTranslation();
  return (
    <button
      tw="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:bg-gray-100 focus:text-gray-600"
      aria-label={t("Layout.openSidebar")}
      {...props}
    >
      <MenuAlt2OutlineIcon tw="h-6 w-6" />
    </button>
  );
};

const CloseSidebarButton = (props) => {
  const { t } = useTranslation();
  return (
    <button
      tw="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600"
      aria-label={t("Layout.closeSidebar")}
      {...props}
    >
      <XOutlineIcon tw="h-6 w-6 text-white" />
    </button>
  );
};

const NavBar = ({ start, center, end }) => {
  return (
    <header tw="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
      {start}
      <nav tw="flex-1 px-4 flex justify-between">
        <div tw="flex-1 flex">{center}</div>
        <div tw="ml-4 flex items-center md:ml-6 space-x-3">{end}</div>
      </nav>
    </header>
  );
};

const SidebarNavLink = ({ Icon, children, ...props }) => {
  return (
    <NavLink
      exact
      className="group"
      tw="flex items-center px-2 py-2 text-base md:text-sm leading-6 md:leading-5 font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
      css={{ "&.active": tw`text-gray-900 bg-gray-100`, "&.active > svg": tw`text-gray-500` }}
      {...props}
    >
      <Icon tw="mr-4 md:mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150" />
      {children}
    </NavLink>
  );
};

const SidebarHeader = () => {
  return (
    <div tw="flex-shrink-0 flex items-center px-4">
      <img
        tw="h-8 w-auto"
        src="https://tailwindui.com/img/logos/workflow-logo-on-white.svg"
        alt="Workflow"
      />
    </div>
  );
};

const SidebarContent = () => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <SidebarNavLink to="/" Icon={HomeOutlineIcon}>
        {t("Layout.dashboard")}
      </SidebarNavLink>

      <SidebarNavLink to="/team" Icon={UsersOutlineIcon}>
        {t("Layout.team")}
      </SidebarNavLink>

      <SidebarNavLink to="/projects" Icon={FolderOutlineIcon}>
        {t("Layout.projects")}
      </SidebarNavLink>

      <SidebarNavLink to="/calendar" Icon={CalendarOutlineIcon}>
        {t("Layout.calendar")}
      </SidebarNavLink>

      <SidebarNavLink to="/documents" Icon={InboxOutlineIcon}>
        {t("Layout.documents")}
      </SidebarNavLink>

      <SidebarNavLink to="/reports" Icon={ChartBarOutlineIcon}>
        {t("Layout.reports")}
      </SidebarNavLink>
    </Fragment>
  );
};

const AnimatedDialogContent = animated(DialogContent);

export const Layout = ({ children }) => {
  const { t } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const openSidebar = useCallback(() => setIsSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);

  const transitions = useTransition(isSidebarOpen, null, {
    from: { opacity: 0, transform: "translate3d(-125%, 0, 0)" },
    enter: { opacity: 1, transform: "translate3d(0%, 0, 0)" },
    leave: { opacity: 0, transform: "translate3d(-125%, 0, 0)" },
  });

  return (
    <Fragment>
      <SkipNavLink>{t("Layout.skipToContent")}</SkipNavLink>
      <div tw="h-screen flex overflow-hidden bg-gray-100">
        {/* Off-canvas menu for mobile, show/hide based on off-canvas menu state. */}
        <div tw="md:hidden">
          {transitions.map(
            ({ item, key, props: styles }) =>
              item && (
                <DialogOverlay
                  key={key}
                  tw="fixed inset-0 flex z-40 bg-transparent"
                  onDismiss={closeSidebar}
                >
                  {/* Off-canvas menu overlay, show/hide based on off-canvas menu state. */}
                  <animated.div tw="fixed inset-0" style={{ opacity: styles.opacity }}>
                    <div tw="absolute inset-0 bg-gray-600 opacity-75" />
                  </animated.div>

                  {/* Off-canvas menu, show/hide based on off-canvas menu state. */}
                  <AnimatedDialogContent
                    tw="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white m-0 px-0"
                    style={{ transform: styles.transform }}
                    aria-label={t("Layout.sidebar")}
                  >
                    <div tw="absolute top-0 right-0 -mr-14 p-1">
                      <CloseSidebarButton onClick={closeSidebar} />
                    </div>
                    <SidebarHeader />
                    <div tw="mt-5 flex-1 h-0 overflow-y-auto">
                      <nav tw="px-2 space-y-1">
                        <SidebarContent />
                      </nav>
                    </div>
                  </AnimatedDialogContent>
                  <div tw="flex-shrink-0 w-14">
                    {/* Dummy element to force sidebar to shrink to fit close icon */}
                  </div>
                </DialogOverlay>
              )
          )}
        </div>

        {/* Static sidebar for desktop */}
        <div tw="hidden md:flex md:flex-shrink-0">
          <div tw="flex flex-col w-64">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div tw="flex flex-col flex-grow border-r border-gray-200 pt-5 pb-4 bg-white overflow-y-auto">
              <SidebarHeader />
              <div tw="mt-5 flex-grow flex flex-col">
                <nav tw="flex-1 px-2 bg-white space-y-1">
                  <SidebarContent />
                </nav>
              </div>
            </div>
          </div>
        </div>

        <div tw="flex flex-col w-0 flex-1 overflow-hidden">
          <NavBar
            start={<OpenSidebarButton tw="md:hidden" onClick={openSidebar} />}
            center={<SearchBar />}
            end={
              <Fragment>
                <NotificationButton />
                <ProfileDropdown />
              </Fragment>
            }
          />
          {children}
        </div>
      </div>
    </Fragment>
  );
};
