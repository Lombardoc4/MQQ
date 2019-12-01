import React from "react";
import { withRouter, Switch, Route, Link } from "react-router-dom";

import Game from "./views/game";
import Contribute from "./views/contribute";
import Home from "./views/home";
import AdminOld from "./components/admin/admin.component";

import "./App.scss";

const App = () => {
  // be aware that fast transitions from home to game and vice versa
  // will cause the whole template to be come display:none
  // maybe disable buttons
  return (
    <Switch>
      <Route
        exact
        path="/cris"
        render={props => (
          <Home location="admin" title="MQQ Admin" btn1="Verify" btn2="Edit" />
        )}
      />
      <Route
        exact
        path="/cris/verify"
        render={props => <AdminOld type="verify" />}
      />
      <Route
        exact
        path="/cris/edit"
        render={props => <AdminOld type="edit" />}
      />
      <Route path="/play">
        <Game />
      </Route>
      <Route path="/contribute">
        <Contribute />
      </Route>
      <Route
        exact
        path="/"
        render={props => (
          <Home
            location="home"
            title="Welcome to Movie Quote Quiz"
            btn1="Play"
            btn2="Contribute"
          />
        )}
      />
    </Switch>
  );
};

export default withRouter(App);
