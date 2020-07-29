/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import tw from "twin.macro";
import Home from "./Home/Home";
import i18n from "./i18n";
import NotFound from "./NotFound/NotFound";

function App() {
  return (
    <div css={tw`antialiased font-sans`}>
      <I18nextProvider i18n={i18n}>
        <HelmetProvider>
          <Helmet titleTemplate="%s | React App" />
          <Router>
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="*" exact>
                <NotFound />
              </Route>
            </Switch>
          </Router>
        </HelmetProvider>
      </I18nextProvider>
    </div>
  );
}

export default App;
