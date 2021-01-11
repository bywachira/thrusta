import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ZenMode from "./pages/zen-mode";
import { setup } from "goober";
import PrivateRoute from "./hoc/private-route";
import HomePage from "./pages/home";
import SingleNodePage from "./pages/single-node";
import AddProcessPage from "./pages/add-process";
import SingleProcessPage from "./pages/single-process";

setup(React.createElement);

function App() {
  return (
    <div className="app-container">
      <Router>
        <Switch>
          <Route exact={true} path="/zen" component={ZenMode} />
          <PrivateRoute exact={true} path="/" component={HomePage} />
          <PrivateRoute
            exact={true}
            path="/nodes/:node_id"
            component={SingleNodePage}
          />
          <PrivateRoute
            exact={true}
            path="/add-process"
            component={AddProcessPage}
          />
          <PrivateRoute
            exact={true}
            path="/your-process/:process_id"
            component={SingleProcessPage}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
