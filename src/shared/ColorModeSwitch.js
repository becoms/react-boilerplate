/** @jsxImportSource @emotion/react */
import { Switch } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import tw from "twin.macro";
import { useColorMode } from "./ColorModeProvider";
import { MoonSolidIcon, SunSolidIcon } from "./Icons";

export const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { t } = useTranslation();
  const isEnabled = colorMode === "light";
  return (
    <Switch
      checked={isEnabled}
      onChange={toggleColorMode}
      tw="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-solid text-gray-300 dark:text-gray-500"
      css={isEnabled ? tw`bg-indigo-600 dark:bg-indigo-500` : tw`bg-gray-200 dark:bg-gray-900`}
    >
      {/* Screen reader description */}
      <span tw="sr-only">{t("Layout.toggleColorMode")}</span>

      {/* Switch knob with color mode icon */}
      <span
        tw="relative inline-block h-5 w-5 rounded-full bg-white dark:bg-gray-700 shadow transition ease-in-out duration-200"
        css={isEnabled ? tw`transform translate-x-5` : tw`transform translate-x-0`}
      >
        <span
          tw="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
          css={
            isEnabled ? tw`opacity-0 ease-in duration-200` : tw`opacity-100 ease-out duration-100`
          }
        >
          <MoonSolidIcon tw="h-4 w-4 text-gray-400" />
        </span>
        <span
          tw="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
          css={
            isEnabled ? tw`opacity-100 ease-out duration-100` : tw`opacity-0 ease-in duration-200`
          }
        >
          <SunSolidIcon tw="h-4 w-4 text-indigo-600 dark:text-indigo-500" />
        </span>
      </span>
    </Switch>
  );
};
