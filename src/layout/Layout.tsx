/** @jsxImportSource @emotion/react */
import tw from "twin.macro";
import { useAuth0 } from "@auth0/auth0-react";
import { Menu } from "@headlessui/react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Transition } from "../shared/Transition";

type ProfileDropdownItemProps = { disabled?: boolean; as: any; [s: string]: unknown; };
const ProfileDropdownItem = ({ disabled, as: Component = Link, ...props }: ProfileDropdownItemProps) => {
  return (
    <>
      { /* @ts-ignore */}
      <Menu.Item disabled={disabled}>
        {({ active }: {active: boolean}) => (
          <Component
            tw="flex justify-between w-full px-4 py-2 text-sm text-left"
            css={[
              active ? tw`bg-gray-100 text-gray-900` : tw`text-gray-700`,
              disabled && tw`cursor-not-allowed opacity-50`,
            ]}
            {...props}
          />
        )}
      </Menu.Item>
    </>
  );
};

const ProfileDropdown = () => {
  const { user, isAuthenticated, logout } = useAuth0();
  return (
    <div tw="relative">
      <Menu>
        {({ open }: { open: boolean }) => (
          <>
            {/* Profile button */
             /* @ts-ignore */ }
            <Menu.Button tw="max-w-xs bg-white flex items-center text-sm rounded-full focus:(outline-none ring-2 ring-offset-2 ring-indigo-500)">
              <span tw="sr-only">
                {open ? "Close profile menu" : "Open profile menu"}
              </span>
              <img
                tw="h-8 w-8 rounded-full"
                src={user?.picture}
                alt={user?.name}
                width={256}
                height={256}
              />
            </Menu.Button>
            { /* @ts-ignore */}
            <Transition
              show={open}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              { /* @ts-ignore */}
              <Menu.Items
                static
                tw="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:(outline-none)"
              >
                {isAuthenticated && (
                  <header tw="px-4 py-3">
                    <p tw="text-sm">Signed in as</p>
                    <p tw="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                  </header>
                )}

                <section tw="py-1">
                  <ProfileDropdownItem
                    as="button"
                    onClick={() => logout({ returnTo: window.location.origin })}
                  >
                    Logout
                  </ProfileDropdownItem>
                </section>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
};

const Navbar = ({ start, center, end }: { start?: ReactNode; center?: ReactNode; end?: ReactNode; }) => {
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

export const Layout = ({ children }: { children?: ReactNode; }) => {
  return (
    <>
      <div tw="h-screen flex overflow-hidden bg-gray-100">
        {/* Navbar & content */}
        <div tw="flex flex-col w-0 flex-1 overflow-hidden">
          <Navbar
            end={<ProfileDropdown />}
          />
          {children}
        </div>
      </div>
    </>
  );
};
