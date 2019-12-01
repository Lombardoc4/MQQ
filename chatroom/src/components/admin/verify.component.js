import React from "react";
import axios from "axios";

const LOCALHOST = process.env.REACT_APP_SERVER_IP;
const LOCALIP = "http://" + LOCALHOST + ":8080";

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

  var table;

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

export default Verify;
