import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ZenMode from "./pages/zen-mode";
import { setup } from "goober";

setup(React.createElement);

function App() {
  return (
    <div className="app-container">
      <Router>
        <Switch>
          <Route exact={true} path="/zen" component={ZenMode} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
