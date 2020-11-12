import { Global } from "@emotion/react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { I18nextProvider } from "react-i18next";
import tw, { GlobalStyles } from "twin.macro";
import i18n from "./i18n";
import { Routes } from "./Routes";
import { ColorModeProvider } from "./shared/ColorModeProvider";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Global styles={{ body: tw`antialiased font-sans` }} />
      <I18nextProvider i18n={i18n}>
        <HelmetProvider>
          <Helmet titleTemplate="%s | React App" />
          <ColorModeProvider>
            <Routes />
          </ColorModeProvider>
        </HelmetProvider>
      </I18nextProvider>
    </>
  );
};

export default App;
