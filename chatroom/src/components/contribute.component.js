import React from 'react';
import axios from 'axios';
import $ from "jquery";
import './contribute.css';

const LOCALIP = 'http://192.168.1.156:8080';
// gotta to reset the text after submit


function Controller(props) {
  return(
    <button onClick={props.nextStage} class='btn btn-success m-3'>
      Submit
    </button>
  )
}

class Contribute extends React.Component {
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

    return (
      <div>
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
        <Controller nextStage={this.handleSubmit}/>
      </div>
    );
  }
}

export default Contribute;
