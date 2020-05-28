import React, {useState} from "react";
import axios from "axios";

const LOCALHOST = process.env.REACT_APP_SERVER_IP;
const LOCALIP = "http://" + LOCALHOST + ":8080";
// gotta to reset the text after submit'

let bots = false;

const Contribute = () => {
  const [userInput, setInputs] = useState(
    {
      quote: '',
      title: '',
      clipLink: '',
      valid: ''
    }
  )

  const onChange = evt => {
    evt.persist();
    setInputs(inputs => {return({...inputs, [evt.target.name]: evt.target.value})});
  }

  const handleBots = (e) => {
    bots = true;
  }

  const videoSearch = (e) => {
    e.preventDefault();
    let searchString = "https://www.youtube.com/results?search_query=";
    if (typeof userInput.quote !== 'undefined'){
      searchString += userInput.quote + " ";
    }
    if (typeof userInput.title !== 'undefined'){
      searchString += userInput.title + " ";
    }

    window.open(searchString, "_blank");
  }

  const validateForm = () => {
    let tempValid = false;
    const list = document.getElementsByClassName("userInput");
    console.log(list);

    if (bots === true){
      console.log("youre a bot");
      return tempValid;
    } else {
      for (let i = 0; i < list.length; i++) {

        // If a field is empty...
        if (!list[i].value) {
          console.log(list[i].value)
          // $(list[i]).addClass("invalid");
          tempValid = false

        } else {
          console.log('temp true')
          // $(list[i]).removeClass("invalid");
          tempValid = true

        }
      }
      console.log('valid', tempValid);

      setInputs({...userInput, valid : tempValid});


      return tempValid;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let validator = validateForm()
    if (!validator) {
      return false;
    }

    const newQuote = { ...userInput,
      verified: false
    };

    console.log(newQuote);
    //  send to db
    // const serverLocation = LOCALIP + "/verifymyguy/verify";
    // axios.post(serverLocation, newQuote).catch(err => console.log(err));

    setInputs({
      quote: "",
      title: "",
      clipLink: "",
      valid: true
    });
  }

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
      // put the login here
    }
  }

  let confirmation = '';
  if (userInput.valid !== ''){
    confirmation = userInput.valid ? <p class="submission text-success">Thank you for your submission</p> : <p class="failure text-danger">Please provide all the information</p>
  }



    return (
      <div>
        <div>
          {confirmation}
        </div>
        <div>
            <input
              className="userInput"
              name="quote"
              placeholder="Quote"
              onKeyDown={keyPress}
              onChange={onChange}
              type="text"
            />

            <input
              placeholder="Hidden Question"
              onChange={handleBots}
              type="text"
            />
            <input
              className="userInput"
              name='title'
              onKeyDown={keyPress}
              onChange={onChange}
              placeholder="Title"
              type="text"
              maxLength="40"
            />
            <input
              placeholder="Hidden Question"
              onChange={handleBots}
              type="text"
            />
              <button onClick={videoSearch}>
                Search Youtube
              </button>
            <input
              className="userInput"
              name='clipLink'
              onKeyDown={keyPress}
              onChange={onChange}
              placeholder="Video Link"
              type="text"
            />
        </div>
        <div style={{ height: "20%" }}>
          <button onClick={handleSubmit} class="btn btn-success">Submit</button>
        </div>
      </div>
    );
}

export default Contribute;
