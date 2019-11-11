import React from 'react';
import $ from 'jquery';
import axios from 'axios';

import Modal from './modal.component'

import './admin.css';
const LOCALIP = 'http://192.168.1.5:8080';

// how can we get a rerender on delete or edit?
// use omdbAPI to make req for posters and year.
// how can we make an API for the remaining:
// character, character img, & clip

class AdminPanel extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      verify: [],
      confirmed: [],
      verifyLength: '',
      confirmedLength: '',
      side: 'Verify',
      selected: [],
    };
    this.flipTable = this.flipTable.bind(this);
    this.openModal= this.openModal.bind(this);
    this.closeModal= this.closeModal.bind(this);
    this.modalElement = React.createRef();
  }

  componentDidMount(){
    var serverLocation = LOCALIP + "/verifymyguy/verify";
      axios.get(serverLocation)
      .then(res => {
        this.setState({
          verify: res.data,
          verifyLength: res.data.length });
      })
      .catch(function (error){
        console.log(error);
      });
    serverLocation = LOCALIP + "/verifymyguy/confirmed";
      axios.get(serverLocation)
      .then(res => {
        this.setState({
          confirmed: res.data,
          confirmedLength: res.data.length });
      })
      .catch(function (error){
        console.log(error);
      });
      this.flipTable()
    }

  flipTable () {
    var side = this.state.side;
    console.log(side);
    if (side === 'Confirmed'){
      $('.confirmed').show();
      $('.verify').hide();
      this.setState({side: 'Verify'});
    }
    if (side === 'Verify'){
      $('.confirmed').hide();
      $('.verify').show();
      this.setState({side: 'Confirmed'});
    }
  }

  closeModal(){
    this.modalElement.current.closeQuote()
    $('.background').hide();
    $('.editModal').hide();
  }

  openModal(quote){
    this.setState({selected: quote})
    this.modalElement.current.loadQuote()
    $('.background').show();
    $('.editModal').show();
  }

    render(){
      var table;
      if(this.state.side === 'Confirmed') {
        table = this.state.verify.map((currentQuote, quote) => {
          return <Verify
                  side={this.state.side}
                  openModal={this.openModal}
                  verify={currentQuote}
                  key={quote._id} />
        })
      }
      if(this.state.side === 'Verify') {
        table = this.state.confirmed.map((currentQuote, quote) => {
          return <Confirmed
                  side={this.state.side}
                  openModal={this.openModal}
                  confirmed={currentQuote}
                  key={quote._id} />
        })
      }

      return(
        <div>
          <div class='holder'>
            <button class="btn btn-info float-right m-3" onClick={this.flipTable} >
              View {this.state.side}
            </button>

            <div class='p-4 verify'>
            <h1 class='a title mb-0'> Please verify quotes </h1>
            <table className="mt-0 table table-hover">
              <thead>
                <tr>
                  <th>Total Quotes: {this.state.verifyLength}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {table}
              </tbody>
            </table>
          </div>

          <div class='p-4 confirmed'>
            <h2 class='a title mb-0'> Need to edit any quotes? </h2>
            <table className="mt-0 table table-hover" >
              <thead>
                <tr>
                  <th>Total Quotes: {this.state.confirmedLength}</th>
                  <th>Search by film</th>
                </tr>
              </thead>
              <tbody>
                {table}
              </tbody>
            </table>
          </div>
        </div>
        <div onClick={this.closeModal} class="background">
        </div>
        <div class="editModal">
          <Modal
              ref={this.modalElement}
              data={this.state.selected}
              submit={this.closeModal}
              side={this.state.side}/>
        </div>
      </div>
    )
  }
}

export default AdminPanel;

function Verify(props) {

  var deleteQuote = (thisQuote) => {
    var serverLocation = LOCALIP + "/verifymyguy/verify/remove/" + thisQuote;
    axios.delete(serverLocation)
      .catch(function (error){
        console.log(error);
      })
      .then(console.log("Quote denied!"))
  }

  return (
    // just return title and year
    // on click load rest of information
    // for confirm make edit page
    // for verify make add picture page
  <tr>
    <td class="title admin">"{props.verify.quote}"</td>
    <td class="d-flex justify-content-end">
      <tr class="m-2">{props.verify.clipLink}</tr>
      <tr class="m-2"><button onClick={() => props.openModal(props.verify)}>  Confirm </button></tr>
      <tr class="m-2"><p onClick={() => deleteQuote(props.verify._id)}><img src="https://cdn2.iconfinder.com/data/icons/iconza-2/24/Trash-512.png" alt="..." class="trash"/></p></tr>
    </td>
  </tr>
  )
}

//About is the wrong way it will create a modal on load for every quote not on click

function Confirmed(props) {

  var deleteQuote = (thisQuote) => {
    var serverLocation = LOCALIP + "/verifymyguy/confirmed/remove/" + thisQuote;
    axios.delete(serverLocation)
      .catch(function (error){
        console.log(error);
      })
      .then(console.log("Quote denied!"))
      }

  return (
    // just return title and year
    // on click load rest of information
    // for confirm make edit page
    // for verify make add picture page

    <tr>
      <td class="title admin">{props.confirmed.quote}</td>
      <td class="d-flex justify-content-end">
        <tr class="m-2">{props.confirmed.title}</tr>
        <tr class="m-2"><button onClick= {() => props.openModal(props.confirmed)}> Edit </button></tr>
        <tr class="m-2"><p onClick={() => deleteQuote(props.confirmed._id)}><img src="https://cdn2.iconfinder.com/data/icons/iconza-2/24/Trash-512.png" alt="..." class="trash"/></p></tr>
      </td>

    </tr>
  )
}
