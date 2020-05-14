import React from "react";

var inputColor = [];
var titleColor = [];
var allAnswers = [];

function AnswerBox(props) {
  var answerResults = props.results;

  for (var i = 0; i < answerResults.length; i++) {
    if (answerResults[i]) {
      inputColor[i] = "status text-success";
      titleColor[i] = "question";
      props.answers[i] = "";
    } else {
      if (props.answerInputs[i] === "") {
        inputColor[i] = "status text-danger";
      } else {
        inputColor[i] = "border-bottom status text-danger";
      }
      titleColor[i] = " question";
    }
    allAnswers[i] = (
      <div class="p-0">
        <h3
          class={titleColor[i] + " align-self-center"}
          style={{ marginBottom: 0 }}
        >
          {props.question[i]}:{" "}
        </h3>
        <div class="answerOutput align-items-center">
          {/* check out length of props.answer and add spaces until length of answerInputs is same */}
          <span class={inputColor[i]}>{props.answerInputs[i]}</span>
          |
          <span class="text-success">{props.answers[i]}</span>
        </div>
      </div>
    );
  }

  return <>{allAnswers}</>;
}

export default AnswerBox;
