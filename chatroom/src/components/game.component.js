import React from "react";
import $ from "jquery";
import axios from "axios";
import ReactPlayer from "react-player";
import "./game.css";

const LOCALIP = "http://10.24.104.148:8080";
// change answer box answerInput color
// resultIndicators still broken

// if you type it changes the 'result' resulting in changed images

class Game extends React.Component {
  // use state to decide which stage of question
  constructor(props) {
    super(props);
    this.state = {
      stage: 1,
      questions: ["Title", "Character", "Year"],
      quote: "",
      answers: [],
      filmPoster: "",
      charPoster: "",
      clipLink: "",
      input: "",
      answerInputs: [],
      results: []
    };
    this.nextStage = this.nextStage.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
    this.setQuote();
  }

  setQuote() {
    var serverLocation = LOCALIP + "/play";
    axios
      .get(serverLocation)
      .then(res => {
        //load quote
        this.setState({
          quote: res.data.quote.quote,
          filmPoster: res.data.quote.filmPoster,
          charPoster: res.data.quote.charPoster,
          clipLink: res.data.quote.clipLink
        });
        this.setState(state => {
          state.answers.push(res.data.quote.title);
          state.answers.push(res.data.quote.character);
          state.answers.push(res.data.quote.year);
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleInput(e) {
    this.setState({ input: e.target.value });
  }

  gameShift(e) {
    if (e === "down") {
      $(".game").css({ top: "10%", marginTop: "0" });
    }
    if (e === "up") {
      $(".game").css({ top: "50%", marginTop: "-2em" });
    }
  }

  nextStage(e) {
    var stage = this.state.stage;
    // console.log(stage)

    if (stage <= 3) {
      var input = this.state.input.toUpperCase();
      var answer = this.state.answers[stage - 1].toUpperCase();

      if (input === answer) {
        this.setState(state => {
          state.results.push(true);
        });
      } else {
        this.setState(state => {
          state.results.push(false);
        });
      }

      if (stage === 1) {
        $(".stage1").fadeIn();
        $(".film").fadeIn();
        this.gameShift("down");
      }
      if (stage === 2) {
        $(".stage2").fadeIn();
        $(".char").fadeIn();
      }
      if (stage === 3) {
        $(".stage3").fadeIn();
        $(".clip").fadeIn();
      }
      this.setState(state => {
        state.answerInputs.push(state.input);
      });
      stage++;
    } else {
      $(".stage1").hide(1);
      $(".stage2").hide(1);
      $(".stage3").hide(1);
      $(".clip").fadeOut(1);
      $(".char").fadeOut();
      $(".film").fadeOut(() => {
        this.gameShift("up");
        this.setQuote();
      });

      $(".quote").fadeOut();
      $(".quote").fadeIn(1000);

      stage = 1;

      this.setState({ answerInputs: [], results: [] });
    }
    this.setState({ stage: stage, input: "" });
  }

  render() {
    const stage = this.state.stage;
    let form, button;
    if (stage <= 3) {
      button = "Next";
      form = (
        <QuestionBox
          input={this.state.input}
          onInput={this.handleInput}
          question={this.state.questions[stage - 1]}
        />
      );
    }
    if (stage === 4) {
      button = "New";
      form = (
        <AnswerBox
          question={this.state.questions}
          answerInputs={this.state.answerInputs}
          answers={this.state.answers}
          results={this.state.results}
          stage={stage}
        />
      );
    }

    return (
      <div>
        <ImageBox
          film={this.state.filmPoster}
          char={this.state.charPoster}
          clip={this.state.clipLink}
        />
        <div class="w-100"></div>
        <ResultBox stage={stage} results={this.state.results} />
        <div class="lower">
          <h2 class="quote mx-auto">{this.state.quote}</h2>

          {form}

          <Controller nextStage={this.nextStage} name={button} />
        </div>
      </div>
    );
  }
}

export default Game;

var resultImg = [];

function ResultBox(props) {
  let result = props.results;

  for (var i = 0; i < result.length; i++) {
    if (result[i]) {
      resultImg[i] =
        "https://icon-library.net/images/success-icon/success-icon-5.jpg";
    } else {
      resultImg[i] = "https://png.pngtree.com/svg/20170918/fail_641034.png";
    }
  }

  return (
    <div class="d-flex justify-content-center">
      <img src={resultImg[0]} alt="..." class="result stage1 p-2" />
      <img src={resultImg[1]} alt="..." class="result stage2 p-2" />
      <img src={resultImg[2]} alt="..." class="result stage3 p-2" />
    </div>
  );
}

function ImageBox(props) {
  return (
    <div class="d-flex justify-content-center">
      <img
        src={props.film}
        width="3em"
        alt="..."
        class="poster film p-2 img-fluid"
      />
      <ReactPlayer
        url={props.clip}
        min-width="20em"
        height="14em"
        class="poster clip p-2"
      />
      <img
        src={props.char}
        width="3em"
        alt="..."
        class="poster char p-2 img-fluid"
      />
    </div>
  );
}

function QuestionBox(props) {
  // decide if form or game is going to be component
  // one has to get data and then maybe use the form component to fill out using of course props
  return (
    <div class="">
      <div class="form p-0 d-flex justify-content-center">
        <h3 class="question pr-2">{props.question}: </h3>

        <input
          class="titleInput"
          value={props.input}
          onChange={props.onInput}
          type="text"
        />
      </div>
    </div>
  );
}

var color = [];
var allAnswers = [];

function AnswerBox(props) {
  //return the answerInputs green if good, red if bad
  var answerResults = props.results;

  // this neeed to be cleaned up
  for (var i = 0; i < answerResults.length; i++) {
    if (answerResults[i]) {
      color[i] = "status text-success";
    } else {
      color[i] = "status text-danger";
    }
    allAnswers[i] = (
      <div class="form p-0 d-flex justify-content-center">
        <h3 class="question pr-2">{props.question[i]}: </h3>
        <p class="titleInput">
          <span class={color[i]}>{props.answerInputs[i]}</span>|
          <span class="text-success">{props.answers[i]}</span>
        </p>
      </div>
    );
  }

  return <div class="">{allAnswers}</div>;
}

function Controller(props) {
  var stage = props.name;

  if (stage === "New") {
    return (
      <button onClick={props.nextStage} class="btn btn-primary m-4">
        {props.name}
      </button>
    );
  }

  return (
    <button onClick={props.nextStage} class="btn btn-success m-4">
      {props.name}
    </button>
  );
}
