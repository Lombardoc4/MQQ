import React from "react";
import { Link } from "react-router-dom";

function Home(props) {
  var link1, link2;
  if (props.location === "admin") {
    link1 = "/cris/" + props.btn1;
    link2 = "/cris/" + props.btn2;
  } else {
    link1 = "/" + props.btn1;
    link2 = "/" + props.btn2;
  }
  // make the link dynamic
  // takes props to differentiate

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