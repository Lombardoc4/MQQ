import React from "react";
import $ from "jquery";
import axios from "axios";

import Modal from "./modal.component";

import "./admin.css";
const LOCALHOST = process.env.REACT_APP_SERVER_IP;
const LOCALIP = "http://" + LOCALHOST + ":8080";

// how can we get a rerender on delete or edit?
// use omdbAPI to make req for posters and year.
// how can we make an API for the remaining:
// character, character img, & clip

class AdminPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      verify: [],
      confirmed: [],
      verifyLength: "",
      confirmedLength: "",
      side: "Verify",
      selected: []
    };
    this.flipTable = this.flipTable.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.modalElement = React.createRef();
  }

  componentDidMount() {
    var serverLocation = LOCALIP + "/verifymyguy/verify";
    axios
      .get(serverLocation)
      .then(res => {
        this.setState({
          verify: res.data,
          verifyLength: res.data.length
        });
      })
      .catch(function(error) {
        console.log(error);
      });
    serverLocation = LOCALIP + "/verifymyguy/confirmed";
    axios
      .get(serverLocation)
      .then(res => {
        this.setState({
          confirmed: res.data,
          confirmedLength: res.data.length
        });
      })
      .catch(function(error) {
        console.log(error);
      });
    this.flipTable();
  }

  flipTable() {
    var side = this.state.side;
    if (side === "Confirmed") {
      $(".confirmed").show();
      $(".verify").hide();
      this.setState({ side: "Verify" });
    }
    if (side === "Verify") {
      $(".confirmed").hide();
      $(".verify").show();
      this.setState({ side: "Confirmed" });
    }
  }

  closeModal() {
    this.modalElement.current.closeQuote();
    $(".background").hide();
    $(".editModal").hide();
  }

  openModal(quote) {
    this.setState({ selected: quote });
    this.modalElement.current.loadQuote();
    $(".background").show();
    $(".editModal").show();
  }

  render() {
    var table;
    if (this.state.side === "Confirmed") {
      table = this.state.verify.map((currentQuote, quote) => {
        return (
          <Verify
            side={this.state.side}
            openModal={this.openModal}
            verify={currentQuote}
            key={quote._id}
          />
        );
      });
    }
    if (this.state.side === "Verify") {
      table = this.state.confirmed.map((currentQuote, quote) => {
        return (
          <Confirmed
            side={this.state.side}
            openModal={this.openModal}
            confirmed={currentQuote}
            key={quote._id}
          />
        );
      });
    }

    return (
      <div>
        <div class="main">
          <button class="btn flipper btn-primary" onClick={this.flipTable}>
            View {this.state.side}
          </button>
          <div class="holder">
            <div class="p-3 verify">
              <h1 class="a title mb-0"> Please verify quotes </h1>
              <table className="table table-hover table-sm">
                <thead>
                  <tr>
                    <th>Total Quotes: {this.state.verifyLength}</th>
                  </tr>
                </thead>
                <tbody>{table}</tbody>
              </table>
            </div>

            <div class="p-3 confirmed">
              <h2 class="a title mb-0"> Need to edit any quotes? </h2>
              <table className="mt-0 table table-hover table-sm">
                <thead>
                  <tr>
                    <th>
                      Search by film
                      <hr
                        style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
                      />
                      Total Quotes: {this.state.confirmedLength}
                    </th>
                  </tr>
                </thead>
                <tbody>{table}</tbody>
              </table>
            </div>
          </div>
        </div>
        <div onClick={this.closeModal} class="background"></div>
        <div class="editModal">
          <Modal
            ref={this.modalElement}
            data={this.state.selected}
            submit={this.closeModal}
            side={this.state.side}
          />
        </div>
      </div>
    );
  }
}

export default AdminPanel;

function Verify(props) {
  var deleteQuote = thisQuote => {
    var serverLocation = LOCALIP + "/verifymyguy/verify/remove/" + thisQuote;
    axios
      .delete(serverLocation)
      .catch(function(error) {
        console.log(error);
      })
      .then(console.log("Quote denied!"));
  };

  return (
    //create alert verification for deleting
    <div class="pt-3">
      <div class="d-flex justify-content-center">
        <h1 class="title admin font-italic">"{props.verify.quote}"</h1>
      </div>
      <div class="lowerHalf">
        <div class="buttonGroup">
          <button
            class="btn btn-info btnz"
            onClick={() => props.openModal(props.verify)}
          >
            Confirm
          </button>
          <p class="pl-4" onClick={() => deleteQuote(props.verify._id)}>
            <img
              src="https://cdn2.iconfinder.com/data/icons/iconza-2/24/Trash-512.png"
              alt="..."
              class="trash"
            />
          </p>
        </div>
      </div>
      <hr style={{ marginTop: "0", marginBottom: "0" }} />
    </div>
  );
}

//About is the wrong way it will create a modal on load for every quote not on click

function Confirmed(props) {
  var deleteQuote = thisQuote => {
    var serverLocation = LOCALIP + "/verifymyguy/confirmed/remove/" + thisQuote;
    axios
      .delete(serverLocation)
      .catch(function(error) {
        console.log(error);
      })
      .then(console.log("Quote denied!"));
  };

  return (
    // just return title and year
    // on click load rest of information
    // for confirm make edit page
    // for verify make add picture page
    <div class="pt-3">
      <div class="d-flex justify-content-center">
        <h1 class="title admin font-italic">"{props.confirmed.quote}"</h1>
      </div>
      <div class="lowerHalf">
        <div class="buttonGroup">
          <button
            class="btn btn-info btnz"
            onClick={() => props.openModal(props.confirmed)}
          >
            Confirm
          </button>
          <p class="pl-4" onClick={() => deleteQuote(props.confirmed._id)}>
            <img
              src="https://cdn2.iconfinder.com/data/icons/iconza-2/24/Trash-512.png"
              alt="..."
              class="trash"
            />
          </p>
        </div>
      </div>
      <hr style={{ marginTop: "0", marginBottom: "0" }} />
    </div>
  );
}
