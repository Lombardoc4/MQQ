import React from "react";
import ReactPlayer from "react-player";

function ImageBox(props) {
  var height = document.querySelector(".poster.clip.answer");

  // experimentation with react player height
  if (height) {
    console.log("success");
  } else {
    console.log(height);
  }

  return (
    <div class="d-flex images">
      <img
        src={props.film}
        alt="Film Poster"
        height="100%"
        class="poster film pr-2 mx-auto"
      />
      <ReactPlayer
        url={props.clip}
        controls
        width="100%"
        height="100%"
        class="poster clip"
      />
      <img
        src={props.char}
        alt="Actor Poster"
        height="100%"
        class="poster char pl-2 mx-auto"
      />
    </div>
  );
}

export default ImageBox;
