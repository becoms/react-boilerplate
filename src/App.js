import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home/Home";
import NotFound from "./NotFound/NotFound";

function App() {
  return (
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
  );
}

export default App;
