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
import tw, { theme } from "twin.macro";
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
                width={256}
                height={256}
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
      <svg tw="h-8 w-auto" fill="none" viewBox="0 0 143 32" xmlns="http://www.w3.org/2000/svg">
        <title>Workflow</title>
        <path
          fill={theme`colors.indigo.600`}
          d="M15.258 26.865a4.043 4.043 0 01-1.133 2.917A4.006 4.006 0 0111.253 31a3.992 3.992 0 01-2.872-1.218 4.028 4.028 0 01-1.133-2.917c.009-.698.2-1.382.557-1.981.356-.6.863-1.094 1.47-1.433-.024.109.09-.055 0 0l1.86-1.652a8.495 8.495 0 002.304-5.793c0-2.926-1.711-5.901-4.17-7.457.094.055-.036-.094 0 0A3.952 3.952 0 017.8 7.116a3.975 3.975 0 01-.557-1.98 4.042 4.042 0 011.133-2.918A4.006 4.006 0 0111.247 1a3.99 3.99 0 012.872 1.218 4.025 4.025 0 011.133 2.917 8.521 8.521 0 002.347 5.832l.817.8c.326.285.668.551 1.024.798.621.33 1.142.826 1.504 1.431a3.902 3.902 0 01-1.504 5.442c.033-.067-.063.036 0 0a8.968 8.968 0 00-3.024 3.183 9.016 9.016 0 00-1.158 4.244zM19.741 5.123c0 .796.235 1.575.676 2.237a4.01 4.01 0 001.798 1.482 3.99 3.99 0 004.366-.873 4.042 4.042 0 00.869-4.386 4.02 4.02 0 00-1.476-1.806 3.994 3.994 0 00-5.058.501 4.038 4.038 0 00-1.175 2.845zM23.748 22.84c-.792 0-1.567.236-2.226.678a4.021 4.021 0 00-1.476 1.806 4.042 4.042 0 00.869 4.387 3.99 3.99 0 004.366.873A4.01 4.01 0 0027.08 29.1a4.039 4.039 0 00-.5-5.082 4 4 0 00-2.832-1.18zM34 15.994c0-.796-.235-1.574-.675-2.236a4.01 4.01 0 00-1.798-1.483 3.99 3.99 0 00-4.367.873 4.042 4.042 0 00-.869 4.387 4.02 4.02 0 001.476 1.806 3.993 3.993 0 002.226.678 4.003 4.003 0 002.832-1.18A4.04 4.04 0 0034 15.993z"
        />
        <path
          fill={theme`colors.indigo.600`}
          d="M5.007 11.969c-.793 0-1.567.236-2.226.678a4.021 4.021 0 00-1.476 1.807 4.042 4.042 0 00.869 4.386 4.001 4.001 0 004.366.873 4.011 4.011 0 001.798-1.483 4.038 4.038 0 00-.5-5.08 4.004 4.004 0 00-2.831-1.181z"
        />
        <path
          fill={theme`colors.gray.800`}
          d="M58.664 11.136l-2.04 7.392-2.184-7.392h-2.928l-2.184 7.368-2.04-7.368H44l3.816 12h2.952l2.208-7.272 2.208 7.272h2.952l3.816-12h-3.288zM68.864 23.472c3.528 0 6.36-2.76 6.36-6.336 0-3.576-2.832-6.336-6.36-6.336-3.528 0-6.336 2.76-6.336 6.336 0 3.576 2.808 6.336 6.336 6.336zm0-3.024c-1.824 0-3.24-1.368-3.24-3.312 0-1.944 1.416-3.312 3.24-3.312 1.848 0 3.264 1.368 3.264 3.312 0 1.944-1.416 3.312-3.264 3.312zM80.498 13.2v-2.064h-3.096v12h3.096V17.4c0-2.52 2.04-3.24 3.648-3.048v-3.456c-1.512 0-3.024.672-3.648 2.304zM97.02 23.136l-4.967-6.072 4.824-5.928H93.18l-4.128 5.28V6.336h-3.096v16.8h3.096v-5.448l4.368 5.448h3.6zM105.022 6c-3.816 0-5.64 1.704-5.64 5.016v.12h-1.728v2.976h1.728v9.024h3.096v-9.024h1.992v-2.976h-1.992v-.12c0-1.632.936-2.304 2.544-2.304.312 0 .648 0 .984.024v14.4h3.096V6.504c-1.32-.264-2.568-.504-4.08-.504zM117.637 23.472c3.528 0 6.36-2.76 6.36-6.336 0-3.576-2.832-6.336-6.36-6.336-3.528 0-6.336 2.76-6.336 6.336 0 3.576 2.808 6.336 6.336 6.336zm0-3.024c-1.824 0-3.24-1.368-3.24-3.312 0-1.944 1.416-3.312 3.24-3.312 1.848 0 3.264 1.368 3.264 3.312 0 1.944-1.416 3.312-3.264 3.312zM139.219 11.136l-2.04 7.392-2.184-7.392h-2.928l-2.184 7.368-2.04-7.368h-3.288l3.816 12h2.952l2.208-7.272 2.208 7.272h2.952l3.816-12h-3.288z"
        />
      </svg>
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
