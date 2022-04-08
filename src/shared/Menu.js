/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { Menu as HeadlessUIMenu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { createContext, Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import tw from "twin.macro";
import { Button } from "./Buttons";
import { Transition } from "./Transition";

const MenuContext = createContext(null);

export const useMenuContext = () => useContext(MenuContext);

export const Menu = ({ children, ...props }) => {
  return (
    <HeadlessUIMenu as="div" tw="relative inline-block text-left" {...props}>
      {(value) => <MenuContext.Provider value={value}>{children}</MenuContext.Provider>}
    </HeadlessUIMenu>
  );
};

export const MenuItems = ({ children, ...props }) => {
  const { open } = useMenuContext();
  return (
    <Transition
      show={open}
      as={Fragment}
      enter={tw`transition ease-out duration-100`}
      enterFrom={tw`transform opacity-0 scale-95`}
      enterTo={tw`transform opacity-100 scale-100`}
      leave={tw`transition ease-in duration-75`}
      leaveFrom={tw`transform opacity-100 scale-100`}
      leaveTo={tw`transform opacity-0 scale-95`}
      unmount={false}
    >
      <HeadlessUIMenu.Items
        static
        tw="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none divide-y z-50"
        {...props}
      >
        {children}
      </HeadlessUIMenu.Items>
    </Transition>
  );
};

export const MenuSection = styled("div")(tw`py-1`);

export const MenuItem = ({ as: Component, color = "gray", ...props }) => {
  return (
    <HeadlessUIMenu.Item>
      {({ active }) => {
        const colorStyles = {
          gray: (active) => [
            tw`svg:(text-gray-400 group-hover:text-gray-500)`,
            active ? tw`bg-gray-100 text-gray-900` : tw`text-gray-700`,
          ],
          red: (active) => [
            tw`svg:(text-red-400 group-hover:text-red-500)`,
            active ? tw`bg-red-100 text-red-700` : tw`text-red-600`,
          ],
        };
        return (
          <Component
            className="group"
            tw="flex items-center px-4 py-2 text-sm svg:(mr-3 h-5 w-5)"
            css={colorStyles[color](active)}
            {...props}
          />
        );
      }}
    </HeadlessUIMenu.Item>
  );
};

export const MenuItemLink = (props) => {
  return <MenuItem as={Link} {...props} />;
};

export const MenuItemButton = (props) => {
  return <MenuItem as="button" tw="w-full text-left" {...props} />;
};

export const MenuButton = (props) => {
  return <Button as={HeadlessUIMenu.Button} {...props} />;
};

export const MenuButtonDropdownIcon = () => {
  return <ChevronDownIcon tw="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />;
};
