import React from "react";

function Controller(props) {
  var stage = props.name;

  if (stage === "New") {
    return (
      <button onClick={props.nextStage} class="btn btn-success">
        {props.name}
      </button>
    );
  }

  return (
    <button onClick={props.nextStage} class="btn btn-primary">
      {props.name}
    </button>
  );
}

export default Controller;
