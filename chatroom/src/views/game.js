import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import "./game.scss";

// //////////////////////////
// Bro get ride of query
// Use CSS instead
// /////////////////////////

import QuestionBox from "../components/game/questionBox.component";
import ImageBox from "../components/game/imageBox.component";
import ResultBox from "../components/game/resultBox.component";
import AnswerBox from "../components/game/answerBox.component";
import Controller from "../components/controller.component";

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
    this.keyPress = this.keyPress.bind(this);
  }

  componentDidMount() {
    this.setQuote();
  }

  setQuote() {
    var serverLocation = LOCALIP + "/play";
    axios
      .get(serverLocation)
      .then(res => {
        console.log(res.data.quote);
        //Sets Quote
        this.setState({
          quote: res.data.quote.quote,
          filmPoster: res.data.quote.filmPoster,
          charPoster: res.data.quote.charPoster,
          clipLink: res.data.quote.clipLink
        });
        this.setState(state => {
          state.answers.push(res.data.quote.title);
          state.answers.push(res.data.quote.actor);
          state.answers.push(res.data.quote.year);
        });
      })
      .catch(function(error) {
        console.log(error);
      })
      .then(() => $(".btn").attr("disabled", false));
  }

  handleInput(e) {
    this.setState({ input: e.target.value });
  }

  keyPress(e) {
    if (e.keyCode === 13) {
      this.nextStage();
      // put the login here
    }
  }

  nextStage(e) {
    var stage = this.state.stage;
    $(".poster").removeClass('on');

    if (stage <= 3) {
      var stage = this.state.stage;

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

        $('.imageBoxSpace, .questionBoxSpace, .film').addClass('on');
        $(".stage1").fadeIn();
        // $(".film").fadeIn();
      }
      if (stage === 2) {
        $(".stage2").fadeIn();
        $(".char, .arrow").addClass('on');
      }
      if (stage === 3) {
        $(".stage3").fadeIn();
        $(".clip").addClass('on');
        $(".images").addClass("imageBox");
        $(".poster.film").addClass("answer");
        $(".poster.char").addClass("answer");
        $(".stage1").hide();
        $(".stage2").hide();
      }

      this.setState(state => {
        state.answerInputs.push(state.input);
      });
      stage++;
    } else {
      $(".imageBoxSpace, .questionBoxSpace, .arrow").removeClass('on');
      $(".images").removeClass("imageBox");
      $(".poster.film").removeClass("answer");
      $(".poster.char").removeClass("answer");

      // $(".film").hide();
      // $(".char").hide();
      $(".quote").fadeOut();
      $(".btn").attr("disabled", true);
      this.setQuote();
      // $(".clip").hide(() => {
        
      // });
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
          keyPress={this.keyPress}
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

    // For Quote use a function that takes the length
    // from there shrink font accordingly

    return (
      <div class="main">
        <div class="switch" style={{ height: "10%" }}>
          <Link to="/contribute">
            <button class="btn btn-outline-secondary">Contribute</button>
          </Link>
        </div>
        <div class="imageBoxSpace d-flex justify-content-center">
          <ImageBox
            film={this.state.filmPoster}
            char={this.state.charPoster}
            clip={this.state.clipLink}
          />
        </div>
        <div
          class="quoteBoxSpace d-flex"
          style={{
            fontFamily: "'Lora', serif",
          }}
        >
          <h2 class="quote">"{this.state.quote}"</h2>
        </div>
        <div class="questionBoxSpace questionBox">
          {form}
        </div>
        <div style={{ height: "10%" }}>
          <ResultBox stage={stage} results={this.state.results} />
        </div>
        <div style={{height: "10%"}}>
          <Controller nextStage={this.nextStage} name={button} />
        </div>
      </div>
    );
  }
}

export default Game;
