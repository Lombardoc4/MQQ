import React from 'react';
import $ from "jquery";
import axios from 'axios';

const LOCALIP = 'http://192.168.1.156:8080';

// how ccan we get a rerender on delete or edit?
// use omdbAPI to make req for posters and year.
// how can we make an API for the remaining:
// character, character img, & clip

class Modal extends React.Component {
  // use state to decide which stage of question
  constructor(props) {
    super(props);
    this.handleSubmit= this.handleSubmit.bind(this);
    this.handleQuote= this.handleQuote.bind(this);
    this.handleTitle= this.handleTitle.bind(this);
    this.handleCharacter= this.handleCharacter.bind(this);
    this.handleYear= this.handleYear.bind(this);
    this.handleLink= this.handleLink.bind(this);

    this.state = {
      quote: '',
      title: '',
      character: '',
      year: '',
      clipLink: '',
    }
  }

  onLoad(thisQuote) {
    var serverLocation = LOCALIP + '/verifymyguy/confirmed/edit/' + thisQuote;
      axios.get(serverLocation)
      .then(res => {
        //load quote
        console.log(res);
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


  handleQuote(e) {
    this.setState({quote: e.target.value});
  }
  handleTitle(e) {
    this.setState({title: e.target.value});
  }
  handleCharacter(e) {
    this.setState({character: e.target.value});
  }
  handleYear(e) {
    this.setState({year: e.target.value});
  }
  handleLink(e) {
    this.setState({clipLink: e.target.value});
  }
  validateForm(){
    var valid = true;
    var list = document.getElementsByClassName('inputContri');

    for (var i = 0; i < list.length; i++) {
      // If a field is empty...
      if (!list[i].value) {
        $(list[i]).css({borderColor: 'red'});
        valid = false;
      }
      else {
      $(list[i]).css({borderColor: 'black'});
      }
    }
    return valid;
  }

  handleSubmit(e){
    e.preventDefault();
    if (!this.validateForm()){
      $('.failure').fadeIn();
        return false;
      }
    $('.failure').hide();


    var newQuote = {
      quote: this.state.quote,
      title: this.state.title,
      character: this.state.character,
      year: this.state.year,
      clipLink: this.state.clipLink,
    };
    //  send to db
    var serverLocation = LOCALIP + "/verifymyguy/contribute";
    axios.post(serverLocation, newQuote)
      .catch(err => console.log(err));

    $('.submission').fadeIn();

    this.setState({
      quote: '',
      title: '',
      character: '',
      year: '',
      clipLink: '',
    });
  }

  render(){

    console.log(this.props._id);

    return (
      <div id='outer'>
      <p class="submission text-success">Thank you for your submission</p>
      <p class="failure text-danger">Please provide all the information</p>
      <div class="form contri p-4 d-flex justify-content-center">
        <h3 class="question pr-2">Quote: </h3>
        <input required class="inputContri" onChange={this.handleQuote} type="text"/>
      </div>
      <div class="form contri p-4 d-flex justify-content-center">
        <h3 class="question pr-2">Title: </h3>
        <input required class="inputContri" onChange={this.handleTitle} type="text" maxLength="20" />
      </div>
      <div class="form contri p-4 d-flex justify-content-center">
        <h3 class="question pr-2">Character: </h3>
        <input required class="inputContri" onChange={this.handleCharacter} type="text" maxLength="20" />
      </div>
      <div class="form contri p-4 d-flex justify-content-center">
        <h3 class="question pr-2">Year: </h3>
        <input required class="inputContri" onChange={this.handleYear} type="text" maxLength="4" />
      </div>
      <div class="form contri p-4 d-flex justify-content-center">
        <h3 class="question pr-2">Reference Link: </h3>
        <input required class="inputContri" onChange={this.handleLink} type="text"/>
      </div>
      <button onClick={this.handleSubmit} class='btn btn-success m-3'>
        Submit
      </button>
      </div>
    );
  }
}

export default Modal;
