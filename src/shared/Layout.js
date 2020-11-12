/** @jsxImportSource @emotion/react */
import { Menu } from "@headlessui/react";
import { useId } from "@reach/auto-id";
import { SkipNavLink } from "@reach/skip-nav";
import "@reach/skip-nav/styles.css";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "twin.macro";
import tw from "twin.macro";
import { Transition } from "../shared/Transition";
import { ColorModeSwitch } from "./ColorModeSwitch";
import {
  BellOutlineIcon,
  CalendarOutlineIcon,
  ChartBarOutlineIcon,
  FolderOutlineIcon,
  HomeOutlineIcon,
  InboxOutlineIcon,
  SearchSolidIcon,
  UsersOutlineIcon,
} from "./Icons";
import { OpenSidebarButton, Sidebar, SidebarHeader, SidebarNavLink } from "./Sidebar";

const SearchBar = () => {
  const { t } = useTranslation();
  const id = useId();
  return (
    <form tw="w-full flex md:ml-0" action="#" method="GET">
      <label htmlFor={id} tw="sr-only">
        {t("Layout.search")}
      </label>
      <div tw="relative w-full text-gray-400 focus-within:text-gray-600 dark:focus-within:text-white">
        <div tw="absolute inset-y-0 left-0 flex items-center pointer-events-none">
          <SearchSolidIcon tw="h-5 w-5" />
        </div>
        <input
          id={id}
          tw="block w-full h-full pl-8 pr-3 py-2 rounded-md text-gray-900 dark:text-white bg-transparent placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 sm:text-sm"
          placeholder={t("Layout.search")}
          type="search"
        />
      </div>
    </form>
  );
};

const ProfileDropdownItem = ({ disabled, as: Component = Link, ...props }) => {
  return (
    <Menu.Item disabled={disabled}>
      {({ active }) => (
        <Component
          tw="flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
          css={[
            active
              ? tw`bg-gray-100 text-gray-900 dark:bg-gray-600 dark:text-white`
              : tw`text-gray-700 dark:text-gray-100`,
            disabled && tw`cursor-not-allowed opacity-50`,
          ]}
          {...props}
        />
      )}
    </Menu.Item>
  );
};

const ProfileDropdown = () => {
  const { t } = useTranslation();
  return (
    <div tw="relative">
      <Menu>
        {({ open }) => (
          <>
            {/* Profile button */}
            <Menu.Button
              tw="max-w-xs flex items-center text-sm rounded-full text-gray-300 dark:text-white focus:outline-none focus:shadow-solid transition duration-150 ease-in-out"
              aria-label={open ? t("Layout.closeProfileMenu") : t("Layout.openProfileMenu")}
            >
              <img
                tw="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
                width={256}
                height={256}
              />
            </Menu.Button>

            {/* Profile dropdown panel, show/hide based on dropdown state. */}
            <Transition
              show={open}
              enter={tw`transition ease-out duration-100`}
              enterFrom={tw`transform opacity-0 scale-95`}
              enterTo={tw`transform opacity-100 scale-100`}
              leave={tw`transition ease-in duration-75`}
              leaveFrom={tw`transform opacity-100 scale-100`}
              leaveTo={tw`transform opacity-0 scale-95`}
            >
              <Menu.Items
                static
                tw="absolute right-0 w-56 mt-2 origin-top-right bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-900 divide-y divide-gray-100 dark:divide-gray-900 rounded-md shadow-lg outline-none"
              >
                <header tw="px-4 py-3">
                  <p tw="text-sm leading-5">Signed in as</p>
                  <p tw="text-sm leading-5 font-medium text-gray-900 dark:text-white truncate">
                    tom@example.com
                  </p>
                </header>

                <section tw="py-1">
                  <ProfileDropdownItem to="/account-settings">Account settings</ProfileDropdownItem>
                  <ProfileDropdownItem to="/support">Support</ProfileDropdownItem>
                  <ProfileDropdownItem as="span" disabled>
                    New feature (soon)
                  </ProfileDropdownItem>
                  <ProfileDropdownItem to="/license">License</ProfileDropdownItem>
                </section>

                <section tw="py-1">
                  <ProfileDropdownItem to="/sign-out">Sign out</ProfileDropdownItem>
                </section>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
};

const NotificationButton = () => {
  const { t } = useTranslation();
  return (
    <button
      tw="p-1 text-gray-400 rounded-full hover:text-gray-500 dark:hover:text-white focus:outline-none focus:text-gray-500 dark:focus:text-white focus:bg-gray-100 dark:focus:bg-gray-700"
      aria-label={t("Layout.notifications")}
    >
      <BellOutlineIcon tw="h-6 w-6" />
    </button>
  );
};

const Navbar = ({ start, center, end }) => {
  return (
    <header tw="relative z-10 flex-shrink-0 flex h-16 bg-white dark:bg-gray-800 shadow">
      {start}
      <nav tw="flex-1 px-4 flex justify-between">
        <div tw="flex-1 flex">{center}</div>
        <div tw="ml-4 flex items-center md:ml-6 space-x-3">{end}</div>
      </nav>
    </header>
  );
};

export const Layout = ({ children }) => {
  const { t } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const openSidebar = useCallback(() => setIsSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);

  return (
    <>
      <SkipNavLink>{t("Layout.skipToContent")}</SkipNavLink>
      {/* Sidebar, navbar and content */}
      <div tw="h-screen flex overflow-hidden bg-gray-100 dark:bg-gray-900">
        <Sidebar isOpen={isSidebarOpen} onDismiss={closeSidebar} header={<SidebarHeader />}>
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
        </Sidebar>

        {/* Navbar & content */}
        <div tw="flex flex-col w-0 flex-1 overflow-hidden">
          <Navbar
            start={<OpenSidebarButton onClick={openSidebar} />}
            center={<SearchBar />}
            end={
              <>
                <ColorModeSwitch />
                <NotificationButton />
                <ProfileDropdown />
              </>
            }
          />
          {children}
        </div>
      </div>
    </>
  );
};
