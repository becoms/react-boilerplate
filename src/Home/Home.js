/** @jsx jsx */
import { jsx } from "@emotion/core";
import "twin.macro";

export default function Home() {
  return (
    <div>
      <div tw="bg-gray-800 pb-32">
        <nav tw="bg-gray-800">
          <div tw="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div tw="border-b border-gray-700">
              <div tw="flex items-center justify-between h-16 px-4 sm:px-0">
                <div tw="flex items-center">
                  <div tw="flex-shrink-0">
                    <img
                      tw="h-8 w-8"
                      src="https://tailwindui.com/img/logos/workflow-mark-on-dark.svg"
                      alt="Workflow logo"
                    />
                  </div>
                  <div tw="hidden md:block">
                    <div tw="ml-10 flex items-baseline">
                      <a
                        href="/"
                        tw="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
                      >
                        Dashboard
                      </a>
                      <a
                        href="/team"
                        tw="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                      >
                        Team
                      </a>
                      <a
                        href="/projects"
                        tw="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                      >
                        Projects
                      </a>
                      <a
                        href="/calendar"
                        tw="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                      >
                        Calendar
                      </a>
                      <a
                        href="/reports"
                        tw="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                      >
                        Reports
                      </a>
                    </div>
                  </div>
                </div>
                <div tw="hidden md:block">
                  <div tw="ml-4 flex items-center md:ml-6">
                    <button
                      tw="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700"
                      aria-label="Notifications"
                    >
                      <svg
                        tw="h-6 w-6"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
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
                      <div>
                        <button
                          tw="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid"
                          id="user-menu"
                          aria-label="User menu"
                          aria-haspopup="true"
                        >
                          <img
                            tw="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </button>
                      </div>
                      {/*
                    Profile dropdown panel, show/hide based on dropdown state.

                    Entering: "transition ease-out duration-100"
                      From: "transform opacity-0 scale-95"
                      To: "transform opacity-100 scale-100"
                    Leaving: "transition ease-in duration-75"
                      From: "transform opacity-100 scale-100"
                      To: "transform opacity-0 scale-95"
                  */}
                      <div tw="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                        <div tw="py-1 rounded-md bg-white shadow-xs">
                          <a
                            href="/profile"
                            tw="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Your Profile
                          </a>
                          <a
                            href="/settings"
                            tw="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Settings
                          </a>
                          <a
                            href="/sign-out"
                            tw="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Sign out
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div tw="-mr-2 flex md:hidden">
                  {/* Mobile menu button  */}
                  <button tw="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white">
                    {/* Menu open: "hidden", Menu closed: "block" */}
                    <svg
                      tw="block h-6 w-6"
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
                    {/* Menu open: "block", Menu closed: "hidden" */}
                    <svg
                      tw="hidden h-6 w-6"
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
            </div>
          </div>

          {/* Mobile menu, toggle twes based on menu state.

        Open: "block", closed: "hidden" */}

          <div tw="hidden border-b border-gray-700 md:hidden">
            <div tw="px-2 py-3 sm:px-3">
              <a
                href="/"
                tw="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
              >
                Dashboard
              </a>
              <a
                href="/team"
                tw="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
              >
                Team
              </a>
              <a
                href="/projects"
                tw="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
              >
                Projects
              </a>
              <a
                href="/calendar"
                tw="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
              >
                Calendar
              </a>
              <a
                href="/reports"
                tw="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
              >
                Reports
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
                  <div tw="text-base font-medium leading-none text-white">
                    Tom Cook
                  </div>
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
                  Your Profile
                </a>
                <a
                  href="/settings"
                  tw="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                  role="menuitem"
                >
                  Settings
                </a>
                <a
                  href="/sign-out"
                  tw="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                  role="menuitem"
                >
                  Sign out
                </a>
              </div>
            </div>
          </div>
        </nav>
        <header tw="py-10">
          <div tw="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 tw="text-3xl leading-9 font-bold text-white">Dashboard</h1>
          </div>
        </header>
      </div>

      <main tw="-mt-32">
        <div tw="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div tw="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            <div tw="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
          </div>
          {/* End replace */}
        </div>
      </main>
    </div>
  );
}
