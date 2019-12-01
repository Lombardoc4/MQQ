import React, { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import "./admin.css";
import Modal from "./modal.component";
const Verify = React.lazy(() => import("./verify.component"));
const Edit = React.lazy(() => import("./edit.component"));

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
    if (this.props.type === "verify") {
      console.log(this.props);
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
    }
    if (this.props.type === "edit") {
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
    }
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
    var table, link;
    if (this.state.side === "Confirmed") {
      link = (
        <Link to="/cris/verify">
          <button class="btn flipper btn-primary">
            View {this.state.side}
          </button>
        </Link>
      );
      table = this.state.verify.map((currentQuote, quote) => {
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <Verify
              side={this.state.side}
              openModal={this.openModal}
              verify={currentQuote}
              key={quote._id}
            />
          </Suspense>
        );
      });
    }
    if (this.state.side === "Verify") {
      link = (
        <Link to="/cris/edit">
          <button class="btn flipper btn-primary">
            View {this.state.side}
          </button>
        </Link>
      );
      table = this.state.confirmed.map((currentQuote, quote) => {
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <Edit
              side={this.state.side}
              openModal={this.openModal}
              confirmed={currentQuote}
              key={quote._id}
            />
          </Suspense>
        );
      });
    }

    return (
      <div>
        <div class="main">
          {link}
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
                        style={{
                          marginTop: "0.5rem",
                          marginBottom: "0.5rem"
                        }}
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

//About is the wrong way it will create a modal on load for every quote not on click
