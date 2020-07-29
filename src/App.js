/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import tw from "twin.macro";
import Home from "./Home/Home";
import NotFound from "./NotFound/NotFound";
function App() {
  return (
    <div css={tw`antialiased font-sans`}>
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
    </div>
  );
}

export default App;
