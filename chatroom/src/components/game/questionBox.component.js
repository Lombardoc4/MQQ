import React from "react";

function QuestionBox(props) {
  // decide if form or game is going to be component
  // one has to get data and then maybe use the form component to fill out using of course props
  return (
    <>
      <h3 class="question">{props.question}: </h3>
      <input
        class="titleInput"
        value={props.input}
        onKeyDown={props.keyPress}
        onChange={props.onInput}
        type="text"
      />
    </>
  );
}

export default QuestionBox;
