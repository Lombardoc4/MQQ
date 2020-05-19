import React, { useState } from "react";
import { Link, useLocation} from "react-router-dom";

import "./game.scss";


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
        // VIDEO
        currentImage = <iframe style={{marginBottom:"-6px"}} rel="0" playsInline="1" modestbranding="1" type="text/html" width="640" height="360" src={youtubeLink} frameBorder="0"></iframe>
    } else {
        currentImage = <img src={props.images[imageIndex].link}/>
    }

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

        console.log(options[rando]);
        console.log(rando);


        userOptions.push(<div key={options[rando]} onClick={() => {props.nextStage(options[rando])}}>{options[rando]}</div>);
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
    const FAKEDATA = {
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

    const [gameState, gameInteraction] = useState({
        data:       FAKEDATA,
        userInputs:  [],
    });

    function incrementStage(input) {
        if (gameState.userInputs.length < 3) {
            let mutatedState = {...gameState};
            mutatedState.userInputs = mutatedState.userInputs.push(input);
            console.log(input);
            // mutatedArray.push(gameState.stage.length);
            // gameInteraction({...gameState, gameState.stage : mutatedArray});
        } else {
            gameInteraction({
                data:       FAKEDATA,
                userInputs:  [],
            });
        }
    }

    // const shiftOrderRight = () => {
    //     let mutatedArray = stage.map(loc => loc);
    //     let first = mutatedArray.shift();
    //     mutatedArray.push(first);
    //     setStage(mutatedArray)
    // };

    // const shiftOrderLeft = () => {
    //     let mutatedArray = stage.map(loc => loc);
    //     let last = mutatedArray.pop();
    //     mutatedArray.unshift(last);
    //     setStage(mutatedArray)
    // }
    console.log(gameState);

    const InputOutput = () => {
        return(
            // gameState.userInputs.length < 3 ?
            <QuestionSet nextStage={incrementStage()} question={gameState.data.quoteData[gameState.userInputs.length]}/>
            // :
            // <Answers newQuote={incrementStage()} answers={gameState.data.quoteData}/>
        );
    }

    // const splicedData = DATA.images.splice(0, stage.length);

    return (
        <div>
            {/* <VisualAid shiftRight={shiftOrderRight} shiftLeft={shiftOrderLeft} stageArray={stage} images={splicedData}/> */}
            <Quote quote={gameState.data.quote}/>
            <InputOutput/>
        </div>
    )
}

export default GameBody