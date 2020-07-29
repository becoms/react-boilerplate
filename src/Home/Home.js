/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState } from "react";
import tw from "twin.macro";

const AboutSection = () => {
  return (
    <div tw="px-4 sm:px-6 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
      <div>
        <a
          href="/we-are-hiring"
          tw="inline-flex items-center text-white bg-gray-900 rounded-full p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-gray-200"
        >
          <span tw="px-3 py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-indigo-500 rounded-full">
            We're hiring
          </span>
          <span tw="ml-4 text-sm leading-5">Visit our careers page</span>
          <svg
            tw="ml-2 w-5 h-5 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </a>
        <h2 tw="mt-4 text-4xl tracking-tight leading-10 font-extrabold text-white sm:mt-5 sm:leading-none sm:text-6xl lg:mt-6 lg:text-5xl xl:text-6xl">
          Data to enrich your
          <br tw="hidden md:inline" />
          <span tw="text-indigo-400">online business</span>
        </h2>
        <p tw="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
          cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua
          ad ad non deserunt sunt.
        </p>
        <p tw="mt-8 text-sm text-white uppercase tracking-wide font-semibold sm:mt-10">
          Used by
        </p>
        <div tw="mt-5 w-full sm:mx-auto sm:max-w-lg lg:ml-0">
          <div tw="flex flex-wrap items-start justify-between">
            <div tw="flex justify-center px-1">
              <img
                tw="h-9 sm:h-10"
                src="https://tailwindui.com/img/logos/tuple-logo.svg"
                alt="Tuple"
              />
            </div>
            <div tw="flex justify-center px-1">
              <img
                tw="h-9 sm:h-10"
                src="https://tailwindui.com/img/logos/workcation-logo.svg"
                alt="Workcation"
              />
            </div>
            <div tw="flex justify-center px-1">
              <img
                tw="h-9 sm:h-10"
                src="https://tailwindui.com/img/logos/statickit-logo.svg"
                alt="StaticKit"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SignUpForm = () => {
  return (
    <div tw="mt-12 sm:mt-16 lg:mt-0 lg:col-span-6">
      <div tw="bg-white sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">
        <div tw="px-4 py-8 sm:px-10">
          <div>
            <p tw="text-sm leading-5 font-medium text-gray-700">Sign in with</p>

            <div tw="mt-1 grid grid-cols-3 gap-3">
              <div>
                <span tw="w-full inline-flex rounded-md shadow-sm">
                  <button
                    type="button"
                    tw="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition duration-150 ease-in-out"
                    aria-label="Sign in with Facebook"
                  >
                    <svg tw="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              </div>

              <div>
                <span tw="w-full inline-flex rounded-md shadow-sm">
                  <button
                    type="button"
                    tw="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition duration-150 ease-in-out"
                    aria-label="Sign in with Twitter"
                  >
                    <svg tw="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </button>
                </span>
              </div>

              <div>
                <span tw="w-full inline-flex rounded-md shadow-sm">
                  <button
                    type="button"
                    tw="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition duration-150 ease-in-out"
                    aria-label="Sign in with GitHub"
                  >
                    <svg tw="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              </div>
            </div>
          </div>

          <div tw="mt-6 relative">
            <div tw="absolute inset-0 flex items-center">
              <div tw="w-full border-t border-gray-300"></div>
            </div>
            <div tw="relative flex justify-center text-sm leading-5">
              <span tw="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>

          <div tw="mt-6">
            <form action="#" method="POST" tw="space-y-6">
              <div>
                <label htmlFor="name" tw="sr-only">
                  Full name
                </label>
                <div tw="rounded-md shadow-sm">
                  <input
                    id="name"
                    placeholder="Full name"
                    required
                    tw="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="mobile-or-email" tw="sr-only">
                  Mobile number or email
                </label>
                <div tw="rounded-md shadow-sm">
                  <input
                    id="mobile-or-email"
                    placeholder="Mobile number or email"
                    required
                    tw="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" tw="sr-only">
                  Password
                </label>
                <div tw="rounded-md shadow-sm">
                  <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    required
                    tw="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>

              <div>
                <span tw="block w-full rounded-md shadow-sm">
                  <button
                    type="submit"
                    tw="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                  >
                    Create your account
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
        <div tw="px-4 py-6 bg-gray-50 border-t-2 border-gray-200 sm:px-10">
          <p tw="text-xs leading-5 text-gray-500">
            By signing up, you agree to our{" "}
            <a href="/terms" tw="font-medium text-gray-900 hover:underline">
              Terms
            </a>
            ,{" "}
            <a
              href="/data-policy"
              tw="font-medium text-gray-900 hover:underline"
            >
              Data Policy
            </a>{" "}
            and{" "}
            <a
              href="/cookies-policy"
              tw="font-medium text-gray-900 hover:underline"
            >
              Cookies Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div tw="relative bg-gray-800 overflow-hidden">
      <div tw="hidden sm:block sm:absolute sm:inset-0">
        <svg
          tw="absolute bottom-0 right-0 transform translate-x-1/2 mb-48 text-gray-700 lg:top-0 lg:mt-28 lg:mb-0 xl:translate-x-0"
          width="364"
          height="384"
          viewBox="0 0 364 384"
          fill="none"
        >
          <defs>
            <pattern
              id="eab71dd9-9d7a-47bd-8044-256344ee00d0"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="4" height="4" fill="currentColor" />
            </pattern>
          </defs>
          <rect
            width="364"
            height="384"
            fill="url(#eab71dd9-9d7a-47bd-8044-256344ee00d0)"
          />
        </svg>
      </div>
      <div tw="relative pt-6 pb-12 sm:pb-32">
        <nav tw="relative max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-6">
          <div tw="flex items-center flex-1">
            <div tw="flex items-center justify-between w-full md:w-auto">
              <a href="/" aria-label="Home">
                <img
                  tw="h-8 w-auto sm:h-10"
                  src="https://tailwindui.com/img/logos/workflow-mark-on-dark.svg"
                  alt="Logo"
                />
              </a>
              <div tw="-mr-2 flex items-center md:hidden">
                <button
                  type="button"
                  tw="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:bg-gray-700 focus:outline-none focus:bg-gray-700 transition duration-150 ease-in-out"
                  id="main-menu"
                  aria-label="Main menu"
                  aria-haspopup="true"
                  onClick={() => setIsOpen(true)}
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
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div tw="hidden space-x-10 md:flex md:ml-10">
              <a
                href="/product"
                tw="font-medium text-white hover:text-gray-300 transition duration-150 ease-in-out"
              >
                Product
              </a>
              <a
                href="/features"
                tw="font-medium text-white hover:text-gray-300 transition duration-150 ease-in-out"
              >
                Features
              </a>
              <a
                href="/marketplace"
                tw="font-medium text-white hover:text-gray-300 transition duration-150 ease-in-out"
              >
                Marketplace
              </a>
              <a
                href="/company"
                tw="font-medium text-white hover:text-gray-300 transition duration-150 ease-in-out"
              >
                Company
              </a>
            </div>
          </div>
          <div tw="hidden md:flex">
            <a
              href="/log-in"
              tw="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:shadow-outline-gray focus:border-gray-700 active:bg-gray-700 transition duration-150 ease-in-out"
            >
              Log in
            </a>
          </div>
        </nav>

        <div
          tw="absolute top-0 inset-x-0 p-2 transition origin-top-right md:hidden ease-in-out duration-100"
          css={
            isOpen
              ? tw`transform opacity-100 scale-100`
              : tw`transform opacity-0 scale-95 pointer-events-none`
          }
        >
          <div tw="rounded-lg shadow-md">
            <div
              tw="rounded-lg bg-white shadow-xs overflow-hidden"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="main-menu"
            >
              <div tw="px-5 pt-4 flex items-center justify-between">
                <div>
                  <img
                    tw="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg"
                    alt=""
                  />
                </div>
                <div tw="-mr-2">
                  <button
                    type="button"
                    tw="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                    aria-label="Close menu"
                    onClick={() => setIsOpen(false)}
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div tw="space-y-1 px-2 pt-2 pb-3">
                <a
                  href="/product"
                  tw="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"
                  role="menuitem"
                >
                  Product
                </a>
                <a
                  href="/features"
                  tw="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"
                  role="menuitem"
                >
                  Features
                </a>
                <a
                  href="/marketplace"
                  tw="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"
                  role="menuitem"
                >
                  Marketplace
                </a>
                <a
                  href="/company"
                  tw="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"
                  role="menuitem"
                >
                  Company
                </a>
              </div>
              <div>
                <a
                  href="/log-in"
                  tw="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100 hover:text-indigo-700 focus:outline-none focus:bg-gray-100 focus:text-indigo-700 transition duration-150 ease-in-out"
                  role="menuitem"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div>

        <main tw="mt-8 sm:mt-16 md:mt-20 lg:mt-24">
          <div tw="mx-auto max-w-screen-xl">
            <div tw="lg:grid lg:grid-cols-12 lg:gap-8">
              <AboutSection />
              <SignUpForm />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
