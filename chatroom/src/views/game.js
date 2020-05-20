import React, { useState, useCallback } from "react";

import "./game.scss";


const VisualAid = (props) => {
    const [availableImages, setImages] = useState([]);
    // let imageIndex = props.displayCount - 1;
    let currentImage;


    // if (typeof imageIndex === 'undefined'){
    //     return null;
    // }
    if ( typeof props.image === 'undefined'){
        return true;
    } else {
        if (props.image.imageType === 'clip') {
            let youtubeLink;
            if (props.image.link.includes("watch?v=")) {
                youtubeLink = props.image.link.replace("watch?v=", "embed/")
            }
            // VIDEO
            currentImage = <iframe style={{marginBottom:"-6px"}} rel="0" playsInline="1" modestbranding="1" type="text/html" width="640" height="360" src={youtubeLink} frameBorder="0"></iframe>
        } else {
        currentImage = <img src={props.image.link}/>
        }
    }


    // if (imageIndex === 2){
    // } else {
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

function QuestionSet(props) {
    // PROPS will BRING DATA

    // TODO: PREVENT FROM RERENDER ON SHIFT

    const FALSEDATA1 = "WRONG";
    const FALSEDATA2 = "WRONG2";

    const options = [FALSEDATA1, FALSEDATA2, props.question.answer];
    const userOptions = [];

    for (let i = options.length - 1; i >= 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        [options[i], options[j]] = [options[j], options[i]];

        userOptions.push(<div key={options[i]} onClick={() => {props.nextStage(options[i])}}>{options[i]}</div>);
    }

    return (
        <div>
            <h1>{props.question.question}</h1>
            {userOptions}
        </div>
    )
}
function checkValues(prev, next) {
    if (prev.question === next.question){
        return true;
    } else {
        return false;
    }
};

const QuestionBody = React.memo(QuestionSet, checkValues);

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
        userInputs:  [],
        availableImages: []
    });

    console.log('updating GameBody')


// available images === gameState.data.

    const shiftOrderRight = () => {
        // Get relative array, for available images
        // const imageStaticSlice = FAKEDATA.images.slice(gameState.userInputs.length)
        const imageArray =  [...gameState.availableImages];
        let first = imageArray.shift();
        imageArray.push(first);

        gameInteraction({...gameState, availableImages: imageArray})
    };

    const shiftOrderLeft = () => {
        let mutatedArray =  gameState.stage.map(loc => loc);
        let last = mutatedArray.pop();
        mutatedArray.unshift(last);
        gameInteraction(mutatedArray)
    }


        // user selects an answer
    const incrementStage = (input) => {
        if (gameState.userInputs.length < 3) {
            let mutatedState = {...gameState};
            mutatedState.availableImages = [...gameState.availableImages, FAKEDATA.images[gameState.userInputs.length]]
            mutatedState.userInputs = [...gameState.userInputs, input];

            gameInteraction(mutatedState);
        } else {
            gameInteraction({
                userInputs:  [],
                availableImages: []
            });
        }
    }

    const InputOutput = () => {
        return(
            gameState.userInputs.length < 3 ?
            <QuestionBody nextStage={incrementStage} question={FAKEDATA.quoteData[gameState.userInputs.length]}/>
            :
            <Answers newQuote={incrementStage} answers={FAKEDATA.quoteData}/>
        )
    }



    return (
        <div>
            <VisualAid shiftRight={shiftOrderRight} shiftLeft={shiftOrderLeft} displayCount={gameState.userInputs.length} image={gameState.availableImages[gameState.userInputs.length - 1]}/>
            <Quote quote={FAKEDATA.quote}/>
            <InputOutput/>
        </div>
    )
}

export default GameBody