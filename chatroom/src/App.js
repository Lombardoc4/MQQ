import React from "react";
import { Switch, Route, Link} from "react-router-dom";

// import Game from "./views/game";
// import Contribute from "./views/contribute";
// import Home from "./views/home";
// import AdminOld from "./components/admin/admin.component";
// import Verify from "./components/admin/verify.component";
import Admin from "./views/admin";
import UserContainer from "./views/user";

// Global CSS to go down tree
import "./scss/App.scss";


// ADD MOVIE_QQ CUTBOARD  FROM AI for loading screen
// And logo to homepage
// Change font to new courier - the screenplay font
const Homescreen = props => {
  let button1 = props.link1.replace('/', '');
  if (button1.includes('cris-admin/'))
    button1 = button1.replace('cris-admin/', '');

  let button2 = props.link2.replace('/', '');
  if (button2.includes('cris-admin/'))
    button2 = button2.replace('cris-admin/', '');

  return(
  <div class="welcome page">
    <h2 class="title">{props.title}</h2>
    <Link to={props.link1}>
      <button class="bg-1 m-2">{button1.toUpperCase()}</button>
    </Link>
    <Link to={props.link2}>
      <button class="bg-2 m-2">{button2.toUpperCase()}</button>
    </Link>
  </div>
)};

const App = () => {

  // load first quote for game

  return (
    <Switch>

    {/* User */}
      <Route exact path="/">
        <Homescreen title="Welcome to Movie Quote Quiz" link1="/play" link2="/contribute"/>
      </Route>
      <Route path="/play">
        <UserContainer/>
      </Route>
      <Route path="/contribute">
        <UserContainer />
      </Route>

    {/* Admin */}
      <Route exact path="/cris-admin">
        <Homescreen title="Admin to Movie Quote Quiz" link1="/cris-admin/verify" link2="/cris-admin/verify"/>
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
