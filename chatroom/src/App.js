import React from 'react';
import $ from "jquery";
import {
  withRouter,
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import Game from './components/game.component';
import Contribute from './components/contribute.component';
import AdminPanel from './components/admin.component';

import './App.css';

function Home(props){
  return(
    <div class="welcome page">
        <h2 class="title">Welcome to Movie Quote Quiz</h2>
        <Link to="/play">
          <button onClick={props.play} class='btn btn-success btn-lg m-3'>
            Play
          </button>
        </Link>
        <Link to="/contribute">
          <button onClick={props.contribute} class='btn btn-primary btn-lg m-3'>
            Contribute
          </button>
        </Link>
    </div>
  )
}

function Outline(props){
  var action = props.action;
  if (action === 'game'){
    action =
      <div class="game page">
        <Game shift={props.gameShift}/>
      </div>;
  }
  if (action === 'contribute'){
    action =
      <div class="contribute page">
        <Contribute/>
      </div>
  }

  return(
    <div class="d-flex flex-column justify-content-center">
      {action}
      <div class="home h-100">
        <Link to="/">
          <button onClick={props.home} class='btn btn-outline-secondary'  id='home'>
            Home
          </button>
        </Link>
      </div>
    </div>
  )
}

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        username:'',
      }
      this.play = this.play.bind(this);
      this.contribute = this.contribute.bind(this);
      this.home = this.home.bind(this);
      this.gameShift = this.gameShift.bind(this);
    }

    play(e){
        $('.welcome').fadeOut(600);
        $('.game').fadeIn(1500);
        $('#home').fadeIn();
      }
    contribute(e){
        $('.welcome').fadeOut(600);
        $('.game').fadeIn(1500);
        $('#home').fadeIn();
      }
    home(e){
      $('.welcome').show();
      $('.game').hide();
      $('#home').hide();
    }

    gameShift(e,){
      if(e === 'down') {
        $('.game').css({top: '10%', marginTop: '0'});
      }
      if(e === 'up'){
        $('.game').css({top: '50%', marginTop: '-100px'});
      }

    }


  // be aware that fast transitions from home to game and vice versa
  // will cause the whole template to be come display:none
  // maybe disable buttons


  render(){
  return (
    <Router>
      <div>

        <Switch>
          <Route path="/cris">
            <AdminPanel/>
          </Route>
          <Route path="/play">
            <Outline action="game" home={this.home} gameShift={this.gameShift}/>
          </Route>
          <Route path="/contribute">
            <Outline action="contribute" home={this.home}/>
          </Route>
          <Route path="/">
            <Home play={this.play} contribute={this.contribute}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
}

export default withRouter(App);
