import React from "react";

function Controller(props) {
  var stage = props.name;

  if (stage === "New") {
    return (
      <button onClick={props.nextStage} class="btn btn-success m-2">
        {props.name}
      </button>
    );
  }

  return (
    <button onClick={props.nextStage} class="btn btn-primary m-2">
      {props.name}
    </button>
  );
}

export default Controller;
