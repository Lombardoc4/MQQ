import React from "react";
import axios from "axios";

const LOCALHOST = process.env.REACT_APP_SERVER_IP;
const LOCALIP = "http://" + LOCALHOST + ":8080";

// how can we get a rerender on delete or edit?
// use omdbAPI to make req for posters and year.
// how can we make an API for the remaining:
// character, character img, & clip

class Table extends React.Component {
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
  }

  render() {
    console.log(this.state.side);
    var table;
    table = "test test test test";

    return (
      <div>
        <div class="main">
          <div class="holder">
            <div class="p-2 verify">
              <h1 class="a title mb-0"> Please verify quotes </h1>
              <table className="table table-hover table-sm">
                <thead>
                  <tr>
                    <th>Total Quotes: {this.state.verifyLength}</th>
                  </tr>
                </thead>
                <tbody>{this.state.verify}</tbody>
              </table>
            </div>

            <div class="p-2 confirmed">
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
                <tbody>{this.state.confirmed}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Table;

//About is the wrong way it will create a modal on load for every quote not on click
