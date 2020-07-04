import React, { useState, useEffect } from "react";

// import "./game.scss";


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
        // return true;
    } else {
        if (viewingImage.imageType === 'clip') {
            let youtubeLink;
            if (viewingImage.link.includes("watch?v=")) {
                youtubeLink = viewingImage.link.replace("watch?v=", "embed/")
            }
            // VIDEO
            currentImage = <iframe className="center-h" rel="0" playsInline="1" modestbranding="1" type="text/html" src={youtubeLink} frameBorder="0"></iframe>
        } else {
        currentImage = <img className="center-h" src={viewingImage.link}/>
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

    const leftShifter = displayCount <= 1 ? '' : <div onClick={shiftOrderLeft} className="left-arrow"></div>
    const righttShifter = displayCount <= 1 ? '' : <div onClick={shiftOrderRight} className="right-arrow"></div>


    return (
        <div className="image-container">
            {leftShifter}
            <div className="asset-container">{currentImage}</div>
            {righttShifter}
        </div>
    )
}

function Quote (props) {
    return(
        <div className="quote-container">
            "
            <div className="quote">{props.quote}</div>
            "
        </div>
    )
}

function QuestionTitle(props) {
    if (props.sceneNum < 3) {
        return (
            <p className="question-title">Scene {props.sceneNum + 1}: {props.question.question}</p>
        )
    }
    return true;
}

function QuestionSet(props) {
    // PROPS will BRING DATA

    const FALSEDATA1 = "WRONG";
    const FALSEDATA2 = "WRONG2";

    const options = [FALSEDATA1, FALSEDATA2, props.question.answer];
    const userOptions = [];

    for (let i = options.length - 1; i >= 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        [options[i], options[j]] = [options[j], options[i]];

        userOptions.push(<button className="bc-black question-option" key={options[i]} onClick={() => {props.nextStage(options[i])}}>{options[i]}</button>);
    }

    // const sceneNum =

    return (
        <div className="question-container">
            {userOptions}
        </div>
    )
}


function Answers (props) {
    const answerSet = [];
    props.answers.forEach(answer => {
        answerSet.push(
            <div className="courier" key={answer.answer}>
                <div>{answer.question}</div>
                <div>{answer.answer}</div>
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
        quote: "I've had it with these motherfuckin snakes on this motherfuckin plane, I've had it with these motherfuckin snakes on this motherfuckin plane, I've had it with these motherfuckin snakes on this motherfuckin plane I've had it with these motherfuckin snakes on this motherfuckin plane",
        quoteData: [
            {question:"Film", answer: "Snakes on a Plane"},
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
            <QuestionSet question={FAKEDATA.quoteData[inputLength]} nextStage={incrementStage} />
            :
            <Answers newQuote={incrementStage} answers={FAKEDATA.quoteData}/>
        )
    }


    const inputLength = gameState.userInputs.length;
    return (
        <div className="main-container">
            <QuestionTitle sceneNum={inputLength} question={FAKEDATA.quoteData[inputLength]} />
            {/* <VisualAid displayCount={gameState.userInputs.length} images={FAKEDATA.images}/> */}
            <Quote quote={FAKEDATA.quote}/>
            <InputOutput/>
        </div>
    )
}

export default GameBody