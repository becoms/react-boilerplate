/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Trans, useTranslation } from "react-i18next";
import tw from "twin.macro";

const useDisclosure = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const onToggle = useCallback(() => {
    setIsOpen((isOpen) => !isOpen);
  }, []);
  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);
  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);
  return {
    isOpen,
    onToggle,
    onClose,
    onOpen,
  };
};

const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

export default function Home() {
  const { t } = useTranslation();
  const { isOpen: isMenuOpen, onToggle: onMenuToggle } = useDisclosure();

  const {
    isOpen: isProfileMenuOpen,
    onToggle: onProfileMenuToggle,
    onClose: onProfileMenuClose,
  } = useDisclosure();
  const profileMenuRef = useRef();
  useOnClickOutside(profileMenuRef, onProfileMenuClose);

  return (
    <Fragment>
      <Helmet title={t("Home.dashboard")} />

      {/* Page header */}
      <div tw="bg-gray-800 pb-32">
        {/* Primary and mobile navigation */}
        <nav tw="bg-gray-800">
          {/* Primary navigation */}
          <div tw="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div tw="border-b border-gray-700 flex items-center justify-between h-16 px-4 sm:px-0">
              {/* Logo & Menu */}
              <div tw="flex items-center">
                {/* Logo */}
                <div tw="flex-shrink-0">
                  <img
                    tw="h-8 w-8"
                    src="https://tailwindui.com/img/logos/workflow-mark-on-dark.svg"
                    alt="Workflow logo"
                  />
                </div>

                {/* Menu */}
                <div tw="hidden md:block">
                  <div tw="ml-10 flex items-baseline">
                    <a
                      href="/"
                      tw="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
                    >
                      <Trans i18nKey="Home.dashboard">Dashboard</Trans>
                    </a>
                    <a
                      href="/team"
                      tw="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                    >
                      <Trans i18nKey="Home.team">Team</Trans>
                    </a>
                    <a
                      href="/projects"
                      tw="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                    >
                      <Trans i18nKey="Home.projects">Projects</Trans>
                    </a>
                    <a
                      href="/calendar"
                      tw="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                    >
                      <Trans i18nKey="Home.calendar">Calendar</Trans>
                    </a>
                    <a
                      href="/reports"
                      tw="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                    >
                      <Trans i18nKey="Home.reports">Reports</Trans>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right actions */}
              <div tw="hidden md:flex ml-4 items-center md:ml-6">
                {/* Notifications button */}
                <button
                  tw="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700"
                  aria-label={t("Home.notifications")}
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
                <div tw="ml-3 relative" ref={profileMenuRef}>
                  {/* Profile button */}
                  <button
                    tw="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid"
                    id="user-menu"
                    aria-label={t("Home.userMenu")}
                    aria-haspopup="true"
                    onClick={onProfileMenuToggle}
                  >
                    <img
                      tw="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </button>

                  {/*
                    Profile dropdown panel, show/hide based on dropdown state.

                    Entering: "transition ease-out duration-100"
                      From: "transform opacity-0 scale-95"
                      To: "transform opacity-100 scale-100"
                    Leaving: "transition ease-in duration-75"
                      From: "transform opacity-100 scale-100"
                      To: "transform opacity-0 scale-95"
                  */}
                  <div
                    tw="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white transition ease-in-out duration-100"
                    css={
                      isProfileMenuOpen
                        ? tw`transform opacity-100 scale-100 pointer-events-auto`
                        : tw`transform opacity-0 scale-95 pointer-events-none`
                    }
                  >
                    <a href="/profile" tw="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Trans i18nKey="Home.yourProfile">Your profile</Trans>
                    </a>
                    <a
                      href="/settings"
                      tw="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Trans i18nKey="Home.settings">Settings</Trans>
                    </a>
                    <a
                      href="/sign-out"
                      tw="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Trans i18nKey="Home.signOut">Sign out</Trans>
                    </a>
                  </div>
                </div>
              </div>

              {/* Mobile menu button */}
              <button
                tw="inline-flex md:hidden inline-flex items-center justify-center -mr-2 p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
                aria-label={t("Home.openMenu")}
                onClick={onMenuToggle}
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
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <div tw="border-b border-gray-700 md:hidden" css={isMenuOpen ? tw`block` : tw`hidden`}>
            <div tw="px-2 py-3 sm:px-3">
              <a
                href="/"
                tw="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
              >
                <Trans i18nKey="Home.dashboard">Dashboard</Trans>
              </a>
              <a
                href="/team"
                tw="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
              >
                <Trans i18nKey="Home.team">Team</Trans>
              </a>
              <a
                href="/projects"
                tw="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
              >
                <Trans i18nKey="Home.projects">Projects</Trans>
              </a>
              <a
                href="/calendar"
                tw="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
              >
                <Trans i18nKey="Home.calendar">Calendar</Trans>
              </a>
              <a
                href="/reports"
                tw="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
              >
                <Trans i18nKey="Home.reports">Reports</Trans>
              </a>
            </div>
            <div tw="pt-4 pb-3 border-t border-gray-700">
              <div tw="flex items-center px-5">
                <div tw="flex-shrink-0">
                  <img
                    tw="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div tw="ml-3">
                  <div tw="text-base font-medium leading-none text-white">Tom Cook</div>
                  <div tw="mt-1 text-sm font-medium leading-none text-gray-400">
                    tom@example.com
                  </div>
                </div>
              </div>
              <div
                tw="mt-3 px-2"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu"
              >
                <a
                  href="/profile"
                  tw="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                  role="menuitem"
                >
                  <Trans i18nKey="Home.yourProfile">Your profile</Trans>
                </a>
                <a
                  href="/settings"
                  tw="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                  role="menuitem"
                >
                  <Trans i18nKey="Home.settings">Settings</Trans>
                </a>
                <a
                  href="/sign-out"
                  tw="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                  role="menuitem"
                >
                  <Trans i18nKey="Home.signOut">Sign out</Trans>
                </a>
              </div>
            </div>
          </div>
        </nav>

        <header tw="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <h1 tw="text-3xl leading-9 font-bold text-white">
            <Trans i18nKey="Home.dashboard">Dashboard</Trans>
          </h1>
        </header>
      </div>

      <main tw="max-w-7xl mx-auto -mt-32 px-4 sm:px-6 lg:px-8 pb-12">
        <section tw="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
          {/* Replace with your content */}
          <div tw="border-4 border-dashed border-gray-200 rounded-lg h-96" />
        </section>
      </main>
    </Fragment>
  );
}
