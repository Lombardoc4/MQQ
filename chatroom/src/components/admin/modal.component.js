import React from "react";
import $ from "jquery";
import axios from "axios";
import ReactPlayer from "react-player";

import "./modal.css";

const LOCALHOST = process.env.REACT_APP_SERVER_IP;
const LOCALIP = "http://" + LOCALHOST + ":8080";

// how ccan we get a rerender on delete or edit?
// use omdbAPI to make req for posters and year.
// how can we make an API for the remaining:
// character, character img, & clip

class Modal extends React.Component {
  // use state to decide which stage of question
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleQuote = this.handleQuote.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleCharacter = this.handleCharacter.bind(this);
    this.handleYear = this.handleYear.bind(this);
    this.handleLink = this.handleLink.bind(this);
    this.handleFilmposter = this.handleFilmposter.bind(this);
    this.handleCharposter = this.handleCharposter.bind(this);
    this.nextStage = this.nextStage.bind(this);
    this.closeQuote = this.closeQuote.bind(this);

    this.state = {
      quote: "",
      title: "",
      character: "",
      year: "",
      clipLink: "",
      filmPoster: "https://via.placeholder.com/150x200",
      charPoster: "https://via.placeholder.com/150x200",
      init: true,
      stage: 1
    };
  }
  componentDidUpdate() {
    if (this.props.data.quote && this.state.init) {
      this.loadQuote();
      this.setState({
        init: false
      });
    }
  }

  closeQuote = () => {
    this.setState(state => {
      return {
        quote: "",
        title: "",
        character: "",
        year: "",
        clipLink: "",
        filmPoster: "https://via.placeholder.com/150x200",
        charPoster: "https://via.placeholder.com/150x200",
        init: true,
        stage: 1
      };
    });
    for (var i = 0; i < $(".form1").length; i++) {
      $(".form1")[i].classList.remove("d-none");
    }
    $(".form2").fadeOut();
    $(".form3").fadeOut();
    $(".success").hide();
  };

  // issuew with the image/film poster updating
  loadQuote = () => {
    this.setState((state, props) => {
      if (typeof this.props.data.filmPoster === "undefined") {
        return {
          quote: this.props.data.quote,
          title: this.props.data.title,
          character: this.props.data.character,
          year: this.props.data.year,
          clipLink: this.props.data.clipLink,
          filmPoster: "https://via.placeholder.com/150x200",
          charPoster: "https://via.placeholder.com/150x200"
        };
      } else {
        return {
          quote: this.props.data.quote,
          title: this.props.data.title,
          character: this.props.data.character,
          year: this.props.data.year,
          clipLink: this.props.data.clipLink,
          filmPoster: this.props.data.filmPoster,
          charPoster: this.props.data.charPoster
        };
      }
      // the variable is defined
    });
  };

  handleFilmposter(e) {
    this.setState({ filmPoster: e.target.value });
  }
  handleCharposter(e) {
    this.setState({ charPoster: e.target.value });
  }
  handleQuote(e) {
    this.props.data.quote = e.target.value;
    this.setState({ quote: e.target.value });
  }
  handleTitle(e) {
    this.props.data.title = e.target.value;
    this.setState({ title: e.target.value });
  }
  handleCharacter(e) {
    this.props.data.character = e.target.value;
    this.setState({ character: e.target.value });
  }
  handleYear(e) {
    this.props.data.year = e.target.value;
    this.setState({ year: e.target.value });
  }
  handleLink(e) {
    this.props.data.clipLink = e.target.value;
    this.setState({ clipLink: e.target.value });
  }
  validateForm() {
    var valid = true;
    var list = document.getElementsByClassName("inputContri");

    for (var i = 0; i < list.length; i++) {
      // If a field is empty...
      if (!list[i].value) {
        $(list[i]).css({ borderColor: "red" });
        valid = false;
      } else {
        $(list[i]).css({ borderColor: "black" });
      }
    }

    // if (this.state.filmPoster === "https://via.placeholder.com/150x200");
    //   {
    //     console.log('test');
    //   }
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
      clipLink: this.state.clipLink,
      filmPoster: this.state.filmPoster,
      charPoster: this.state.charPoster
    };
    // side is opposite because setState is behind?
    if (this.props.side === "Confirmed") {
      //  send to db
      var serverLocation = LOCALIP + "/verifymyguy/confirmed";
      axios
        .post(serverLocation, newQuote, this.props)
        .catch(err => console.log(err))
        .then(() => {
          axios
            .delete(
              LOCALIP + "/verifymyguy/verify/remove/" + this.props.data._id
            )
            .catch(function(error) {
              console.log(error);
            })
            .then(console.log("verify removed"));
        });
    }
    // side is opposite because setState is behind?
    if (this.props.side === "Verify") {
      //  send to db
      serverLocation =
        LOCALIP + "/verifymyguy/confirmed/edit/" + this.props.data._id;
      axios
        .put(serverLocation, newQuote)
        .catch(err => console.log(err))
        .then(console.log(newQuote));
    }

    $(".submission").fadeIn(1000, () => {
      this.props.submit();
    });
    $(".submission").fadeOut();

    this.setState({
      quote: "",
      title: "",
      character: "",
      year: "",
      clipLink: "",
      filmPoster: "",
      charPoster: ""
    });
  }

  nextStage() {
    var stage = this.state.stage;
    console.log(stage);
    if (stage === 1) {
      if (!this.validateForm()) {
        $(".failure").fadeIn();
        return false;
      }
      $(".failure").hide();

      for (var i = 0; i < $(".form1").length; i++) {
        $(".form1")[i].classList.add("d-none");
      }
      for (i = 0; i < $(".form2").length; i++) {
        $(".form2")[i].classList.remove("d-none");
      }
      $(".form2").fadeIn();
      this.setState({
        stage: 2
      });
    }
    if (stage === 2) {
      if (!this.validateForm()) {
        $(".failure").fadeIn();
        return false;
      }
      $(".failure").hide();

      for (i = 0; i < $(".form2").length; i++) {
        $(".form2")[i].classList.add("d-none");
      }
      $(".form3").fadeIn();
      this.setState({
        stage: 3
      });
    }
  }

  render() {
    var controller;
    if (this.state.stage === 3) {
      controller = (
        <Controller
          closeQuote={this.props.submit}
          nextStage={this.handleSubmit}
          stage={this.state.stage}
        />
      );
    } else {
      controller = (
        <Controller
          closeQuote={this.props.submit}
          nextStage={this.nextStage}
          stage={this.state.stage}
        />
      );
    }

    return (
      <div id="outer">
        <p class="submission text-success">Thank you for your confirmation</p>
        <p class="failure text-danger">Please provide all the information</p>
        <div class="form1 forms justify-content-center">
          <ReactPlayer
            url={this.props.data.clipLink}
            width="100%"
            height="100%"
            class="clip p-2"
          />
          <div class="form contri justify-content-center">
            <h3 class="question">
              ClipLink:{" "}
              <button class="btn helper btn-danger text-white">
                Search Youtube
              </button>
            </h3>
            <input
              value={this.props.data.clipLink}
              class="inputContri"
              onChange={this.handleLink}
              type="text"
            />
          </div>
          <div class="form contri justify-content-center">
            <h3 class="question">Quote: </h3>
            <textarea
              value={this.props.data.quote}
              class="inputContri"
              onChange={this.handleQuote}
              type="text"
            />
          </div>
        </div>
        <div
          style={{
            display: "none"
          }}
          class="form2 forms"
        >
          <div class="justify-content-center">
            <img
              src={this.state.filmPoster + ""}
              class="img-fluid mr-auto"
              id="img-upload"
              width="150px"
              height="200px"
              alt=""
            />
          </div>
          <div class="form contri justify-content-center">
            <h3 class="question">
              Film Poster:{" "}
              <button class="btn helper btn-warning">Search IMDb</button>
            </h3>
            <input
              value={this.state.filmPoster}
              onChange={this.handleFilmposter}
              class="inputContri"
              type="text"
              id="film"
            />
          </div>
          <div class="form contri d-flex">
            <h3 class="question">Title: </h3>
            <input
              value={this.props.data.title}
              class="inputContri"
              onChange={this.handleTitle}
              type="text"
            />
          </div>
          <div class="form contri d-flex">
            <h3 class="question">Actor: </h3>
            <input
              value={this.props.data.character}
              class="inputContri"
              onChange={this.handleCharacter}
              type="text"
            />
          </div>
          <div class="form contri d-flex">
            <h3 class="question">Year:</h3>
            <input
              value={this.props.data.year}
              class="inputContri"
              onChange={this.handleYear}
              type="text"
              maxLength="4"
            />
          </div>
        </div>
        <div
          style={{ display: "none" }}
          class="form3 forms contri justify-content-center"
        >
          <div class="justify-content-center">
            <img
              src={this.state.charPoster + ""}
              class="img-fluid mr-auto"
              id="img-upload"
              width="150px"
              height="200px"
              alt=""
            />
          </div>
          <div class="form contri justify-content-center">
            <h3 class="question">
              ActorPoster:
              <button class="btn helper btn-light text-success">Google</button>
            </h3>
            <input
              value={this.state.charPoster + ""}
              class="inputContri"
              onChange={this.handleCharposter}
              type="text"
              maxLength="20"
            />
          </div>
        </div>
        {controller}
      </div>
    );
  }
}

export default Modal;

function Controller(props) {
  var stage = props.stage;
  var button, helper;

  if (stage === 3) {
    button = (
      <button onClick={props.nextStage} class="btn control btn-success m-1">
        Confirm
      </button>
    );
  } else {
    button = (
      <button onClick={props.nextStage} class="btn control btn-primary m-1">
        Next
      </button>
    );
  }

  return (
    <div class="btnbox">
      {button}
      <button onClick={props.closeQuote} class="btn control btn-warning m-1">
        Cancel
      </button>
    </div>
  );
}
