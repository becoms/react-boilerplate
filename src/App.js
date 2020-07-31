/** @jsx jsx */
import { Global, jsx } from "@emotion/core";
import { StrictMode } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import tw from "twin.macro";
import Dashboard from "./Dashboard/Dashboard";
import i18n from "./i18n";
import NotFound from "./NotFound/NotFound";

const App = () => {
  return (
    <StrictMode>
      <Global styles={{ body: tw`antialiased font-sans` }} />
      <I18nextProvider i18n={i18n}>
        <HelmetProvider>
          <Helmet titleTemplate="%s | React App" />
          <Router>
            <Switch>
              <Route path="/" exact>
                <Dashboard />
              </Route>
              <Route path="*" exact>
                <NotFound />
              </Route>
            </Switch>
          </Router>
        </HelmetProvider>
      </I18nextProvider>
    </StrictMode>
  );
};

export default App;
