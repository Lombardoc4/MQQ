import React from "react";
import ReactPlayer from "react-player";
import arrow from "./arrow.png";

function ImageBox(props) {
  var height = document.querySelector(".poster.clip.answer");

  // experimentation with react player height
  // if (height) {
  //   console.log("success");
  // } else {
  //   console.log(height);
  // }

  return (
    <div class="d-flex images">
      <img src={arrow} class="arrow arrowLeft" alt="Left"/>
      <img
        src={props.film}
        alt="Film Poster"
        height="100%"
        class="poster film mx-auto"
      />
      <ReactPlayer
        url={props.clip}
        controls
        width="70%"
        height="100%"
        class="poster clip"
      />
      <img
        src={props.char}
        alt="Actor Poster"
        height="100%"
        class="poster char mx-auto"
      />
      <img src={arrow} class="arrow arrowRight" alt="Left"/>
    </div>
  );
}

export default ImageBox;
