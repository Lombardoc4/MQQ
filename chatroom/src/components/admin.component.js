import React from 'react';
import $ from 'jquery';
import axios from 'axios';

import './admin.css';

// how ccan we get a rerender on delete or edit?
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
    }
  }

  componentDidMount(){
    var serverLocation = "http://localhost:8080/verifymyguy/verify";
      axios.get(serverLocation)
      .then(res => {
        console.log(res);
        this.setState({ verify: res.data,
          verifyLength: res.data.length });
      })
      .catch(function (error){
        console.log(error);
      });
    serverLocation = "http://localhost:8080/verifymyguy/confirmed";
      axios.get(serverLocation)
      .then(res => {
        this.setState({ confirmed: res.data,
          confirmedLength: res.data.length });
      })
      .catch(function (error){
        console.log(error);
      });
  }

  verify_List() {
  return this.state.verify.map(function(currentQuote, quote) {
    return <Verify verify={currentQuote} key={quote._id} />
  })
}
  confirmed_List() {
  return this.state.confirmed.map(function(currentQuote, quote) {
    return <Confirmed confirmed={currentQuote} key={quote._id} />
  })
}
  closeModal(){
    $('.background').hide();
    $('.editModal').hide();
  }

  render(){
    return(
      <div>
      <div onClick={this.closeModal} class="background">
      </div>
      <div class="editModal">
        <h4 class="title">It's me edit modal  </h4>
        <div class="modalBody">This looks like a great place to edit the quote data muaahhah time to use an ajax request. maybe should use a new component for this so i can use modals everywhere  </div>
        <button onClick={this.closeModal}>Close  </button>
        <button class="btn-success">Confirm </button>

      </div>

        <div class='row d-flex justify-content-center holder'>
          <div class='col-lg-6 p-4 verify'>
            <h1 class='a title mb-0'> Please verify quotes </h1>
            <table className="mt-0 table table-hover">
            <thead>
              <tr>
                <th>Total Quotes: {this.state.verifyLength}</th>
              </tr>
            </thead>
            <tbody>
              { this.verify_List() }
            </tbody>
            </table>
          </div>
          <div class='col-lg-6 p-4 confirmed'>
            <h2 class='a title mb-0'> Need to edit any quotes? </h2>
            <table className="mt-0 table table-hover" >
            <thead>
              <tr>
                <th>Total Quotes: {this.state.confirmedLength}</th>
                <th>Search by film</th>
              </tr>
            </thead>
            <tbody>
              { this.confirmed_List() }
            </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default AdminPanel;

function Verify(props) {

  var deleteUser = (thisQuote) => {
    var serverLocation = "http://localhost:8080/verifymyguy/verify/remove/" + thisQuote;
    console.log(serverLocation);
    axios.delete("http://localhost:8080/verifymyguy/verify/remove/" + thisQuote)
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
  <tr class="flex-fill">
    <td class="d-block">"{props.verify.quote}"</td>
    <tr class="d-flex justify-content-end">
      <td>{props.verify.clipLink}</td>
      <td><button>  Confirm </button></td>
      <td><a onClick={() => deleteUser(props.verify._id)}><img src="https://cdn2.iconfinder.com/data/icons/iconza-2/24/Trash-512.png" alt="..." class="trash"/></a></td>
      </tr>
  </tr>
)
}

function ModalFunction(){
    $('.editModal').show()
    $('.background').show()

    // $('.editModal').modal({backdrop: 'static', keyboard: false})
  return
}

function Confirmed(props) {
  return (
    // just return title and year
    // on click load rest of information
    // for confirm make edit page
    // for verify make add picture page
    <tr>
      <td>{props.confirmed.quote}</td>
      <tr class="d-block">
        <td>{props.confirmed.title}</td>
        <td><button onClick={ModalFunction} class=""> Edit </button></td>
        <td><img src="https://cdn2.iconfinder.com/data/icons/iconza-2/24/Trash-512.png" alt="..." class="trash"/></td>
        </tr>

      </tr>
)
}
