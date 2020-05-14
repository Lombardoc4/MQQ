import React from "react";
import { withRouter, Switch, Route } from "react-router-dom";

import Game from "./views/game";
import Contribute from "./views/contribute";
import Home from "./views/home";
import AdminOld from "./components/admin/admin.component";
import AdminNew from "./views/admin";
import Verify from "./components/admin/verify.component";


import TestGame from "./views/game2";

// Global CSS to go down tree
import "./App.scss";


// ADD MOVIE_QQ CUTBOARD  FROM AI for loading screen
// And logo to homepage
// Change font to new courier - the screenplay font

const App = () => {
  // look to make new admin interface
  // design as a wireframe, keep simple

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
        render={props => <AdminOld type="verify"/>}
      />      
      <Route
      exact
      path="/admintest"
      render={props => <AdminNew />}
    />
      <Route
        exact
        path="/cris/edit"
        render={props => <AdminOld type="edit" />}
      />

      <Route path="/test">
        <TestGame />
      </Route>      

      <Route path="/play">
        <Game />
      </Route>

      <Route path="/contribute">
        <Contribute />
      </Route>

      <Route
        exact 
        path="/"
        render={props => (<Home location="home" title="Welcome to Movie Quote Quiz" btn1="Play" btn2="Contribute"/>)}
      />
    </Switch>
  );
};

export default withRouter(App);
