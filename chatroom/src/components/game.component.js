import React from "react";
import $ from "jquery";
import axios from "axios";
import ReactPlayer from "react-player";
import "./game.css";

const LOCALHOST = process.env.REACT_APP_SERVER_IP;
const LOCALIP = "http://" + LOCALHOST + ":8080";
// change answer box answerInput color
// resultIndicators still broken

// if you type it changes the 'result' resulting in changed images

class Game extends React.Component {
  // use state to decide which stage of question
  constructor(props) {
    super(props);
    this.state = {
      stage: 1,
      questions: ["Title", "Actor", "Year"],
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
    console.log(process.env.REACT_APP_SERVER_IP);
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
      $(".game").css({ top: "7%", marginTop: "0rem" });
    }
    if (e === "up") {
      $(".game").css({ top: "50%", marginTop: "-2.5em" });
    }
  }

  nextStage(e) {
    var stage = this.state.stage;
    // console.log(stage)

    if (stage <= 3) {
      var input = this.state.input.toUpperCase();
      // this needs to be asynced or else will break because no value
      // if this.state.answers doesnt load before hitting next, BREAKS
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
      }
      if (stage === 2) {
        $(".stage2").fadeIn();
        $(".char").fadeIn();
      }
      if (stage === 3) {
        $(".stage3").fadeIn();

        $(".clip").fadeIn(1000);
        $(".poster.film").addClass("answer");
        $(".poster.clip").addClass("answer");
        $(".poster.char").addClass("answer");
      }
      this.setState(state => {
        state.answerInputs.push(state.input);
      });
      stage++;
    } else {
      $(".poster.film").removeClass("answer");
      $(".poster.clip").removeClass("answer");
      $(".poster.char").removeClass("answer");
      $(".stage1").hide();
      $(".stage2").hide();
      $(".stage3").hide();
      $(".film").hide();
      $(".char").hide();
      $(".clip").hide(() => {
        this.setQuote();
      });
      $(".quote").fadeOut();
      $(".quote").fadeIn(1000);

      stage = 1;
      this.setState({
        answerInputs: [],
        results: [],
        answers: []
      });
    }
    this.setState({ stage: stage, input: "" });
    console.log(this.state.answers);
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
      <div class="main">
        <ImageBox
          film={this.state.filmPoster}
          char={this.state.charPoster}
          clip={this.state.clipLink}
        />
        <div class="stationaryBottom">
          <h2 class="quote mx-auto">{this.state.quote}</h2>
          {form}

          <ResultBox stage={stage} results={this.state.results} />
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
      <img src={resultImg[0]} alt="..." class="result stage1" />
      <img src={resultImg[1]} alt="..." class="result stage2" />
      <img src={resultImg[2]} alt="..." class="result stage3" />
    </div>
  );
}

function ImageBox(props) {
  var height = document.querySelector(".poster.clip.answer");
  if (height) {
    console.log("success");
  } else {
    console.log(height);
  }

  return (
    <div class="d-flex justify-content-center">
      <img src={props.film} alt="..." class="poster film p-2" />
      <div class="poster clip">
        <ReactPlayer url={props.clip} height="100%" class="poster clip pt-2" />
      </div>
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
    <div class="form justify-content-center">
      <h3 class="question">{props.question}: </h3>
      <input
        class="titleInput"
        value={props.input}
        onChange={props.onInput}
        type="text"
      />
    </div>
  );
}

var inputColor = [];
var titleColor = [];
var allAnswers = [];

function AnswerBox(props) {
  //return the answerInputs green if good, red if bad
  var answerResults = props.results;

  // this neeed to be cleaned up
  for (var i = 0; i < answerResults.length; i++) {
    if (answerResults[i]) {
      inputColor[i] = "status text-success";
      titleColor[i] = "question green";
    } else {
      titleColor[i] = "question red";
      inputColor[i] = "status text-danger";
    }
    allAnswers[i] = (
      <div class="form p-0 d-flex align-items-center justify-content-center">
        <h3 class={titleColor[i]}>{props.question[i]}: </h3>
        <div class="answerOutput d-flex flex-column">
          <span class={inputColor[i]}>{props.answerInputs[i]}</span>
          <span class="border-top text-success">{props.answers[i]}</span>
        </div>
      </div>
    );
  }

  return <div class="">{allAnswers}</div>;
}

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
