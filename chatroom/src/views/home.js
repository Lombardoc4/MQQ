import React from "react";
import { Link } from "react-router-dom";

import "./home.scss";

function Home(props) {
  var link1 = "/" + props.btn1;
  var link2 = "/" + props.btn2;

  // load first quote for game

  return (
    <div class="welcome page">
      <h2 class="title">{props.title}</h2>
      <Link to={link1}>
        <button class="btn btn-success btn-lg m-3">{props.btn1}</button>
      </Link>
      <Link to={link2}>
        <button class="btn btn-primary btn-lg m-3">{props.btn2}</button>
      </Link>
    </div>
  );
}

export default Home;
