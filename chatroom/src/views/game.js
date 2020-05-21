import React, { useState, useCallback, useEffect } from "react";

import "./game.scss";


const VisualAid = (props) => {
    const displayCount = parseInt(props.displayCount);
    const [availableImages, setImages] = useState([])
    // let imageIndex = props.displayCount - 1;
    let currentImage;
    useEffect(() => {
        let imageArray = [];
        for (let i = 0; i < props.displayCount; i++){
            imageArray.push(props.images[i]);
        }
        setImages(imageArray)
    }, [props.displayCount]);


    let viewingImage = availableImages[availableImages.length - 1];
    // if (typeof imageIndex === 'undefined'){
    //     return null;
    // }
    if ( availableImages.length === 0 ){
        return true;
    } else {
        if (viewingImage.imageType === 'clip') {
            let youtubeLink;
            if (viewingImage.link.includes("watch?v=")) {
                youtubeLink = viewingImage.link.replace("watch?v=", "embed/")
            }
            // VIDEO
            currentImage = <iframe style={{marginBottom:"-6px"}} rel="0" playsInline="1" modestbranding="1" type="text/html" width="640" height="360" src={youtubeLink} frameBorder="0"></iframe>
        } else {
        currentImage = <img src={viewingImage.link}/>
        }
    }

    // TODO: SHIFTING
    const shiftOrderRight = () => {
        const imageArray =  [...availableImages];
        let first = imageArray.shift();
        imageArray.push(first);
        console.log(imageArray);
        setImages( imageArray )
    };

    const shiftOrderLeft = () => {
        const imageArray =  [...availableImages];
        let last = imageArray.pop();
        imageArray.unshift(last);
        console.log(imageArray);

        setImages( imageArray )
    }

    const leftShifter = displayCount === 1 ? '' : <div onClick={shiftOrderLeft} style={{height: "25px", width:"25px", background: "black" }} className="left-arrow"></div>
    const righttShifter = displayCount === 1 ? '' : <div onClick={shiftOrderRight} style={{height: "25px", width:"25px", background: "black" }} className="right-arrow"></div>


    return (
        <div>
            {leftShifter}
            {currentImage}
            {righttShifter}
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
    });

    console.log('updating GameBody')


// available images === gameState.data.



        // user selects an answer
    const incrementStage = (input) => {
        if (gameState.userInputs.length < 3) {
            let mutatedState = {...gameState};
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
            <VisualAid displayCount={gameState.userInputs.length} images={FAKEDATA.images}/>
            <Quote quote={FAKEDATA.quote}/>
            <InputOutput/>
        </div>
    )
}

export default GameBody