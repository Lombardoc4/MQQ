import React from 'react';
import $ from "jquery";
import axios from 'axios';
import ReactPlayer from 'react-player';
import './game.css';

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
      filmPoster: '',
      charPoster: '',
      clipLink: '',
      input: '',
      answerInputs: [],
      results: [],
      resultsImg: [],
    }
    this.nextStage = this.nextStage.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount(){
    var serverLocation = "http://localhost:8080/play"
      axios.get(serverLocation)
      .then(res => {
        console.log(res);
        //load quote
          this.setState({
            quote :  res.data.quote.quote,
            filmPoster : res.data.quote.filmPoster,
            charPoster : res.data.quote.charPoster,
            clipLink : res.data.quote.clipLink,
          });
          this.setState(state => {
            state.answers.push(res.data.quote.title);
            state.answers.push(res.data.quote.character);
            state.answers.push(res.data.quote.year);
          })
        }
      )
      .catch(function (error){
        console.log(error);
      });
  }

  handleInput(e) {
    this.setState({input: e.target.value});
  }


  nextStage(e){
    var stage = this.state.stage;

    if (stage <= 3) {
      var input = this.state.input.toUpperCase();
      var answer = this.state.answers[stage-1].toUpperCase();

      if (input === answer) {
        this.setState(state => {
          state.results.push(true);
        })
      }
      else {
        this.setState(state => {
          state.results.push(false);
        })
      }

      this.state.resultsImg.push(this.state.results);
      if (stage === 1) {
        $(".stage1").fadeIn();
        $(".film").fadeIn();
        this.props.shift('down');
      }
      if (stage === 2){
        $(".stage2").fadeIn();
        $(".char").fadeIn();
      }
      if (stage === 3){
        $(".stage3").fadeIn();
        $(".clip").fadeIn();
      }
      this.setState(state => {
        state.answerInputs.push(state.input);})
        stage++;
    }
    else {
      $(".clip").hide();
      $(".char").hide();
      $(".film").hide();
      $(".stage1").hide();
      $(".stage2").hide();
      $(".stage3").hide();
      this.props.shift('up');

      stage = 1;
      this.setState({answerInputs: [], results: []});
    }
    this.setState({stage: stage, input: ''});
  }

  render(){
    const stage = this.state.stage;
    let form, button;
    if (stage <= 3) {
      button = "Next";
      form = <QuestionBox
                input={this.state.input}
                onInput={this.handleInput}
                question={this.state.questions[stage-1]}/>
    }
    if (stage === 4) {
      button = "New";
      form = <AnswerBox
                question={this.state.questions}
                answerInputs={this.state.answerInputs}
                answers={this.state.answers}
                results={this.state.results}
                stage={stage}
              />
    }

    return (
      <div>
        <ImageBox film={this.state.filmPoster} char={this.state.charPoster} clip={this.state.clipLink}/>
        <div class="w-100"></div>
        <ResultBox stage={stage} resultsImg={this.state.resultsImg}/>
        <h2 class="quote mx-auto">{this.state.quote}</h2>
        {form}
        <Controller currStage={stage} nextStage={this.nextStage} name={button}/>
      </div>
    );
  }
}

export default Game;

function ResultBox(props) {
  let stage = props.stage;
  let result = props.resultsImg[stage-2];
  // console.log(result);
  var resultImg = props.resultsImg;

  resultImg.pop();


  if (stage > 1){
    // console.log(result[stage-2]);
    // console.log(resultImg);
    if (result[stage-2])
    {
      resultImg.push("https://icon-library.net/images/success-icon/success-icon-5.jpg");
    }
    else {
      resultImg.push("https://png.pngtree.com/svg/20170918/fail_641034.png")
    };
  }
  return(
    <div class="d-flex justify-content-center">
      <img src={resultImg[0]} alt="..." class="result stage1 p-2"/>
      <img src={resultImg[1]} alt="..." class="result stage2 p-2"/>
      <img src={resultImg[3]} alt="..." class="result stage3 p-2"/>
    </div>
  )
}

function ImageBox(props) {

  return (
    <div class="d-flex justify-content-center">
      <img src="https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg" alt="..." class="poster film p-2 img-fluid"/>
      <ReactPlayer url='https://www.youtube.com/watch?v=ruhFmBrl4GM' width='400px' height="225px" class="poster clip p-2"/>
      <img src="https://i.pinimg.com/736x/e0/6c/74/e06c740e8e6aec4aa651a7fb44f83623.jpg" alt="..." class="poster char p-2 img-fluid"/>
    </div>
  )
}


function QuestionBox(props){
  // decide if form or game is going to be component
  // one has to get data and then maybe use the form component to fill out using of course props
  return(
    <div>
    <div class="form p-2 d-flex justify-content-center">
      <h3 class="question pr-2">{props.question}: </h3>
      <input class="titleInput" value={props.input} onChange={props.onInput} type="text" maxLength="20" />
    </div>
    </div>
  );
}

function AnswerBox(props) {
  //return the answerInputs green if good, red if bad
  var answerResults = props.results;
  var color;
  console.log(answerResults);

// this neeed to be cleaned up
  for (var i =0; i < 3; i++){
    if (answerResults[i] === true){
      color = "status text-success";
    }
    else {
      color = 'status text-danger';
    }
  }

  return(
    <div class="">
    <div class="form p-0 d-flex justify-content-center">
      <h3 class="question pr-2">{props.question[0]}: </h3>
      <p class="titleInput">
        <span class={color}>{props.answerInputs[0]}</span>
        |
        <span class="text-success">{props.answers[0]}</span>
      </p>
    </div>
    <div class="form d-flex justify-content-center">
      <h3 class="question pr-2">{props.question[1]}: </h3>
      <p class="titleInput">
        <span class={color}>{props.answerInputs[1]}</span>
        |
        <span class="text-success">{props.answers[1]}</span>
      </p>
    </div>
    <div class="form d-flex justify-content-center">
      <h3 class="question pr-2">{props.question[2]}: </h3>
      <p class="titleInput">
        <span class={color}>{props.answerInputs[2]}</span>
        |
        <span class="text-success">{props.answers[2]}</span>
      </p>
    </div>
    </div>
  );
}


function Controller(props) {
  var stage = props.name;

  if (stage === 'New'){
    return(
      <button onClick={props.nextStage} class='btn btn-primary m-4'>
        {props.name}
      </button>
    )
  }

  return(
    <button onClick={props.nextStage} class='btn btn-success m-4'>
      {props.name}
    </button>
  )
}
