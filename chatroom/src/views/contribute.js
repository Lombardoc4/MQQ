import React from "react";
import axios from "axios";
import $ from "jquery";
import "./contribute.scss";
import { Link } from "react-router-dom";

import QuestionBox from "../components/game/questionBox.component";
import Controller from "../components/controller.component";

const LOCALHOST = process.env.REACT_APP_SERVER_IP;
const LOCALIP = "http://" + LOCALHOST + ":8080";
// gotta to reset the text after submit'

let bots = false;

class Contribute extends React.Component {
  // use state to decide which stage of question
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleQuote = this.handleQuote.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleCharacter = this.handleCharacter.bind(this);
    this.handleYear = this.handleYear.bind(this);
    this.handleLink = this.handleLink.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.videoSearch = this.videoSearch.bind(this);

    this.state = {
      quote: "",
      title: "",
      character: "",
      year: "",
      clipLink: ""
    };
  }


  handleQuote(e) {
    this.setState({ quote: e.target.value });
    document.getElementsByTagName('input')[0].classList.remove('invalid');
  }
  handleTitle(e) {
    this.setState({ title: e.target.value });
    document.getElementsByTagName('input')[1].classList.remove('invalid');

  }
  handleCharacter(e) {
    this.setState({ character: e.target.value });
    document.getElementsByTagName('input')[2].classList.remove('invalid');

  }
  handleYear(e) {
    this.setState({ year: e.target.value });
    document.getElementsByTagName('input')[3].classList.remove('invalid');

  }
  handleLink(e) {
    this.setState({ clipLink: e.target.value });
    document.getElementsByTagName('input')[4].classList.remove('invalid');

  }
  handleBots(e) {
    bots = true;
  }

  videoSearch(e) {
    e.preventDefault();
    console.log(this.state);
    let searchString = "https://www.youtube.com/results?search_query=";
    if (typeof this.state.quote !== 'undefined'){
      searchString += this.state.quote + " ";
    }
    if (typeof this.state.title !== 'undefined'){
      searchString += this.state.title + " ";
    }
    
    window.open(searchString, "_blank");
  }

  keyPress(e) {
    if (e.keyCode === 13) {
      this.handleSubmit(e);
      // put the login here
    }
  }
  validateForm() {
    var valid = false;
    var list = document.getElementsByTagName("input");

    if (bots === true){
      console.log("youre a bot");
      return valid;
    } else {
      for (var i = 0; i < list.length; i++) {
        // If a field is empty...
        if (!list[i].value) {
          $(list[i]).addClass("invalid");
          valid = false;
        } else {
          $(list[i]).removeClass("invalid");
          valid = true;
        }
      }
      return valid;
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let validator = this.validateForm()
    if (!validator) {
      $(".failure").fadeIn();
      return false;
    }
    $(".failure").hide();

    // if (ghostInput === true) {
    //   denyForm-thisIsABot
    // } else {}

    var newQuote = {
      quote: this.state.quote,
      title: this.state.title,
      character: this.state.character,
      year: this.state.year,
      clipLink: this.state.clipLink,
      verified: false
    };
    //  send to db
    var serverLocation = LOCALIP + "/verifymyguy/verify";
    axios.post(serverLocation, newQuote).catch(err => console.log(err));

    $(".submission").fadeIn();
    this.setState({
      quote: "",
      title: "",
      character: "",
      year: "",
      clipLink: ""
    });
  }

  render() {
    // insert map function for inputs for each question
    //cliplink is special because button also quote because textarea

    return (
      <div>
        <div>
          <p class="submission text-success">Thank you for your submission</p>
          <p class="failure text-danger">Please provide all the information</p>
        </div>
        <div>
            <input
              required
              placeholder="Quote"
              onKeyDown={this.keyPress}
              onChange={this.handleQuote}
              type="text"
            />

            <input
              required
              placeholder="Hidden Question"
              onChange={this.handleBots}
              type="text"
            />
            <input
              required
              onKeyDown={this.keyPress}
              onChange={this.handleTitle}
              placeholder="Title"
              type="text"
              maxLength="40"
            />
            <input
              required
              placeholder="Hidden Question"
              onChange={this.handleBots}
              type="text"
            />
              <button onClick={this.videoSearch}>
                Search Youtube
              </button>
            <input
              required
              onKeyDown={this.keyPress}
              onChange={this.handleLink}
              placeholder="Video Link"
              type="text"
            />
        </div>
        <div style={{ height: "20%" }}>
          <Controller nextStage={this.handleSubmit} name="Submit" />
        </div>
      </div>
    );
  }
}

export default Contribute;
