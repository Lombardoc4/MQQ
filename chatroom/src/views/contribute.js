import React from "react";
import axios from "axios";
import $ from "jquery";
import "./contribute.css";
import { Link } from "react-router-dom";

import Controller from "../components/controller.component";

const LOCALHOST = process.env.REACT_APP_SERVER_IP;
const LOCALIP = "http://" + LOCALHOST + ":8080";
// gotta to reset the text after submit

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
  }
  handleTitle(e) {
    this.setState({ title: e.target.value });
  }
  handleCharacter(e) {
    this.setState({ character: e.target.value });
  }
  handleYear(e) {
    this.setState({ year: e.target.value });
  }
  handleLink(e) {
    this.setState({ clipLink: e.target.value });
  }
  keyPress(e) {
    if (e.keyCode === 13) {
      this.handleSubmit(e);
      // put the login here
    }
  }
  validateForm() {
    var valid = true;
    var list = document.getElementsByClassName("inputContri");
    var questions = document.getElementsByClassName("question");

    for (var i = 0; i < list.length; i++) {
      // If a field is empty...
      if (!list[i].value) {
        $(questions[i]).addClass("invalid");
        valid = false;
      } else {
        $(questions[i]).removeClass("invalid");
      }
    }
    return valid;
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.validateForm()) {
      $(".failure").fadeIn();
      return false;
    }
    $(".failure").hide();

    var newQuote = {
      quote: this.state.quote,
      title: this.state.title,
      character: this.state.character,
      year: this.state.year,
      clipLink: this.state.clipLink
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
    return (
      <div class="page main">
        <div style={{ height: "10%" }}>
          <Link to="/play">
            <button
              class="btn btn-outline-secondary"
              style={{ marginTop: "1vh", padding: "1vh" }}
            >
              Play
            </button>
          </Link>
        </div>
        <div style={{ height: "5%" }}>
          <p class="submission text-success">Thank you for your submission</p>
          <p class="failure text-danger">Please provide all the information</p>
        </div>
        <div style={{ height: "65%" }}>
          <div class="form justify-content-center">
            <h3
              class="question col-3"
              style={{ margin: "0", marginTop: "auto" }}
            >
              Quote:{" "}
            </h3>
            <textarea
              required
              class="inputContri col-9"
              onKeyDown={this.keyPress}
              onChange={this.handleQuote}
              type="text"
            />
          </div>
          <div class="form justify-content-center">
            <h3
              class="question col-3"
              style={{ margin: "0", marginTop: "auto" }}
            >
              Title:{" "}
            </h3>
            <input
              required
              class="inputContri col-9"
              onKeyDown={this.keyPress}
              onChange={this.handleTitle}
              type="text"
              maxLength="40"
            />
          </div>
          <div class="form justify-content-center">
            <h3
              class="question col-3"
              style={{ margin: "0", marginTop: "auto" }}
            >
              Actor:{" "}
            </h3>
            <input
              required
              class="inputContri col-9"
              onKeyDown={this.keyPress}
              onChange={this.handleCharacter}
              type="text"
              maxLength="40"
            />
          </div>
          <div class="form justify-content-center">
            <h3
              class="question col-3"
              style={{ margin: "0", marginTop: "auto" }}
            >
              Year:{" "}
            </h3>
            <input
              required
              class="inputContri col-9"
              onKeyDown={this.keyPress}
              onChange={this.handleYear}
              type="text"
              maxLength="4"
            />
          </div>
          <div class="form pt-2 link justify-content-center">
            <h3
              class="question pb-3"
              style={{ margin: "0", marginTop: "auto" }}
            >
              VideoLink:{" "}
              <button class="btn helper btn-danger text-white">
                Search Youtube
              </button>
            </h3>

            <input
              required
              class="inputContri"
              onKeyDown={this.keyPress}
              onChange={this.handleLink}
              type="text"
            />
          </div>
        </div>
        <div style={{ height: "20%" }}>
          <Controller nextStage={this.handleSubmit} name="Submit" />
        </div>
      </div>
    );
  }
}

export default Contribute;
