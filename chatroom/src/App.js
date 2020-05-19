import React from "react";
import { Switch, Route, Link} from "react-router-dom";

// import Game from "./views/game";
// import Contribute from "./views/contribute";
import Home from "./views/home";
// import AdminOld from "./components/admin/admin.component";
import Admin from "./views/admin";
import Verify from "./components/admin/verify.component";


import UserContainer from "./views/user";

// Global CSS to go down tree
import "./scss/App.scss";


// ADD MOVIE_QQ CUTBOARD  FROM AI for loading screen
// And logo to homepage
// Change font to new courier - the screenplay font
const Homescreen = props => (
  <div class="welcome page">
    <h2 class="title">{props.title}</h2>
    <Link to={'/' + props.link1}>
      <button class="btn btn-success btn-lg m-3">{props.link1.toUpperCase()}</button>
    </Link>
    <Link to={'/' + props.link2}>
      <button class="btn btn-primary btn-lg m-3">{props.link2.toUpperCase()}</button>
    </Link>
  </div>
);

const App = () => {

  // load first quote for game

  return (
    <Switch>

    {/* User */}
      <Route exact path="/">
        <Homescreen title="Welcome to Movie Quote Quiz" link1="play" link2="contribute"/>
      </Route>
      <Route path="/play">
        <UserContainer/>
      </Route>
      <Route path="/contribute">
        <UserContainer />
      </Route>

    {/* Admin */}
      <Route exact path="/cris-admin">
        <Homescreen title="Admin to Movie Quote Quiz" link1="verify" link2="edit"/>
      </Route>
      <Route exact path="/cris-admin/verify">
        <Admin/>
      </Route>
      <Route exact path="/cris-admin/edit">
        <Admin/>
      </Route>

    </Switch>
  );
};

export default App;
