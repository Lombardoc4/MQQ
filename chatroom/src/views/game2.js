import React, { useState } from "react";
import "./game.scss";
import Contribute from "./contribute";

function UserContainer () {
    const [experience, setExperience] = useState('Play');

    const experienceTitle = experience === "Play" ? "Contribute" : "Play";

    const switchExperience = () => {
        setExperience(experienceTitle);
    }

    const UserExperience = () => {
        return(experience === "Play" ? <GameBody /> : <Contribute/>);
    }

    return (
        <div>
            <SideSelector buttonLabel={experienceTitle} switch={switchExperience}/>
            <UserExperience />
        </div>
    )
}

export default UserContainer;

function SideSelector (props) {
    return (
        <button onClick={props.switch}>{props.buttonLabel}</button>
    )
}

function VisualAid (props) {
    let imageStuff = [];

    let imageIndex = props.stageArray[props.stageArray.length - 1]
    let currentImage;
    console.log(imageIndex)

    if (typeof imageIndex === 'undefined'){
        return null;
    }

    if (imageIndex === 2){
        let youtubeLink;
        if (props.images[imageIndex].link.includes("watch?v=")) {
            youtubeLink = props.images[imageIndex].link.replace("watch?v=", "embed/")
        }

        currentImage = <iframe style={{marginBottom:"-6px"}} rel="0" playsInline="1" modestbranding="1" type="text/html" width="640" height="360"
        src={youtubeLink}
        frameBorder="0"></iframe>
    } else {
        console.log("load image")
        currentImage = <img src={props.images[imageIndex].link}/>
    }

    // for (let i = 0; i < props.stageArray.length; i++){
    //     let orderId = props.stageArray[i];

    //     if(props.stageArray[i] === 2){
    //         console.log(props.images[orderId].link)
    //         let youtubeTitle = props.images[orderId].link.replace("watch?v=", "embed/")
    //         imageStuff.push(<iframe style={{marginBottom:"-6px"}} rel="0" playsInline="1" modestbranding="1" type="text/html" width="640" height="360"
    //         src={youtubeTitle}
    //         frameBorder="0"></iframe>)
    //     } else {
    //         imageStuff.push(<img key={i} src={props.images[orderId].link}/>)
    //     }
    // }

    return (
        <div>
            <div onClick={props.shiftLeft} style={{height: "25px", width:"25px", background: "black" }} className="left-arrow"></div>
            {currentImage}
            <div onClick={props.shiftRight} style={{height: "25px", width:"25px", background: "black" }} className="right-arrow"></div>
        </div>
    )
}

function Quote (props) {
    return(
        <div>{props.quote}</div>
    )
}



function QuestionSet (props) {

    const FALSEDATA1 = "WRONG"; 
    const FALSEDATA2 = "WRONG2"; 

    const options = [];
    const userOptions = [];

    // how can this be an array already?
    options.push(FALSEDATA1, FALSEDATA2, props.question.answer);
    const optionsLength = options.length;

    for (let i = 0; i < optionsLength; i++){
        const rando = Math.floor(Math.random() * (3 - i));
        userOptions.push(<p key={options[rando]} onClick={props.nextStage}>{options[rando]}</p>);
        options.splice(rando, 1);
    }

    return (
        <div>
            <h1>{props.question.question}</h1>
            {userOptions}
        </div>
    )
}

function Answers (props) {
    const answerSet = [];

    props.answers.forEach(answer => {
        answerSet.push(
            <div key={answer.answer}>
                <h1>{answer.question}</h1>
                <p>{answer.answer}</p>
            </div>
        )
    });

    return (
        <div>
            {answerSet}
            <button onClick={props.newQuote}>New Quote</button>

        </div>
    )
}

function GameBody () {
    const DATA = {
        quote: "I've had it with these motherfuckin snakes on this motherfuckin plane",
        quoteData: [
            {question:"Film Title", answer: "Snakes on a Plane"},
            {question:"Actor", answer: "Neville Flynn"},
            {question:"Year", answer: "2006"}
        ],
        images: [
            {imageType: "poster", link: "https://m.media-amazon.com/images/M/MV5BZDY3ODM2YTgtYTU5NC00MTE4LTkzNjktMzNhZWZmMzJjMWRjXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX182_CR0,0,182,268_AL_.jpg"},
            {imageType: "actor", link: "https://m.media-amazon.com/images/M/MV5BMTM4OTc4NDY0OF5BMl5BanBnXkFtZTcwNzE3NzU0NA@@._V1_.jpg"},
            {imageType: "clip", link: "https://www.youtube.com/watch?v=vLaX8UvVUQw"}
        ]
    }

    const [stage, setStage] = useState([]);

    const incrementStage = () => {
        if (stage.length < 3) {
            let mutatedArray = stage.map(loc => loc);
            mutatedArray.push(stage.length);
            setStage(mutatedArray);
        } else {
            setStage([]);
        }
    }

    // const incrementStage = () => {

    //     if (stage.length < 3) {
    //         let mutatedArray = stage;
    //         mutatedArray.push(stage.length);
    //         setStage(mutatedArray);
    //         console.log(stage);
    //     } else {
    //         setStage([0]);
    //     }
    // }

    const shiftOrderRight = () => {
        let mutatedArray = stage.map(loc => loc);
        let first = mutatedArray.shift();
        mutatedArray.push(first);
        setStage(mutatedArray)
        console.log(stage);
    };    
    
    const shiftOrderLeft = () => {
        let mutatedArray = stage.map(loc => loc);
        let last = mutatedArray.pop();
        mutatedArray.unshift(last);
        console.log(mutatedArray);
        setStage(mutatedArray)
    }

    const InputOutput = () => {
        return(stage.length < 3 ? <QuestionSet nextStage={incrementStage} question={DATA.quoteData[stage.length]}/> : <Answers newQuote={incrementStage} answers={DATA.quoteData}/>);
    }

    const splicedData = DATA.images.splice(0, stage.length);

    return (
        <div>
            <VisualAid shiftRight={shiftOrderRight} shiftLeft={shiftOrderLeft} stageArray={stage} images={splicedData}/>
            <Quote quote={DATA.quote}/>
            <InputOutput/>
        </div>
    )
}





//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////


function ContributeBody () {
    return (
        <div>

        <div>
          <p>Thank you for your submission</p>
          <p>Please provide all the information</p>
        </div>
        <div>
          <div>
            <input
              required
            //   onKeyDown={this.keyPress}
            //   onChange={this.handleQuote}
                placeholder="Quote"
              type="text"
            />
          </div>


          <div>
            <input
              required
            //   onKeyDown={this.keyPress}
            //   onChange={this.handleTitle}
              type="text"
              maxLength="40"
              placeholder="Title"
            />
          </div>
          <div >
            <input
                placeholder = "Video Link"
              required
            //   onKeyDown={this.keyPress}
            //   onChange={this.handleLink}
              type="text"
            />
                          <button>
                Search for Video
              </button>
          </div>
        </div>
      </div>
    )
}

