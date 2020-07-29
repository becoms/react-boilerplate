/** @jsx jsx */
import { jsx } from "@emotion/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import tw from "twin.macro";
import Home from "./Home/Home";
import NotFound from "./NotFound/NotFound";

function App() {
  return (
    <div css={tw`antialiased font-sans`}>
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
    </div>
  );
}

export default App;
