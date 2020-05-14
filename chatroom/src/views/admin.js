import React, { useState, useEffect } from "react";


const conf = {
    verify : ['verify.com']
}
function AdminContainer() {
    
    const [experience, setExperience] = useState('Verify');

    const experienceTitle = experience === "Verify" ? "Edit" : "Verify";

    const switchExperience = () => {
        setExperience(experienceTitle);
    }

    const UserExperience = () => {
        return(experience === "Verify" ? <VerifyModule url={conf.verify}/> : <EditModule url="['edit.com']"/>);
    }

    return (
        <div>
            <SideSelector buttonLabel={experienceTitle} switch={switchExperience}/>
            <UserExperience />
        </div>
    )
}

export default AdminContainer;

function SideSelector (props) {
    return (
        <button onClick={props.switch}>{props.buttonLabel}</button>
    )
}

function VerifyModule(props) {
    const verifyData = [
        {
            quote: "I've have it with these mf snakes mf",
            film: "snakes on a plane",
            videoLink: 'https://www.imdb.com/'
        },
        {
            quote: "Quote2",
            film: "film2",
            videoLink: 'https://www.imdb.com/'
        }
    ]
    const [quotes, setQuoteOrder] = useState('');

    useEffect( () => {
        const setQuotes = async () => {
            await setQuoteOrder(verifyData);
        }
        setQuotes();
    }, []);

    const skipQuote = (id) => {
        let tempQuotes = quotes.map(quote => quote);
        let movedQuote = tempQuotes.splice(id, 1);
        tempQuotes.push(movedQuote[0]);
        setQuoteOrder(tempQuotes);
    }

    return (
        <div>
            <h1>Verify</h1>
            <AllQuoteCards skipQuote={skipQuote} data={quotes}/>
        </div>
    )
}


function EditModule(props) {
    const data = [
        {
            quote: "Quotesssssss1",
            film: "filmssssss1",
            actor: "tom crustssssss",
            year: 1990000000,
            videoLink: 'https://www.imdb.com/'
        },
        {
            quote: "Quote2sssss",
            film: "film2sssssss",
            actor: "tom crusssssssst",
            year: 199222212112,
            videoLink: 'https://www.imdb.com/'
        }
    ]
    const [quotes, setQuoteOrder] = useState('');

    useEffect( () => {
        const setQuotes = async () => {
            await setQuoteOrder(data);
        }
        setQuotes();
    }, []);

    const skipQuote = (id) => {
        let tempQuotes = quotes.map(quote => quote);
        let movedQuote = tempQuotes.splice(id, 1);
        tempQuotes.push(movedQuote[0]);
        setQuoteOrder(tempQuotes);
    }

    // this should have a state that is the order of the quotes

    return (
        <div>
            <h1>Edit</h1>
            <AllQuoteCards skipQuote={skipQuote} data={quotes}/>
        </div>
    )
}

function AllQuoteCards(props) {
    const quotes = [];

    for(let i = 0; i < props.data.length; i++){
        quotes.push(
                <VerifyQuoteCard key={i} data={props.data[i]}>           
                <button onClick={() => {props.skipQuote(i)}}>Skip</button>
                </VerifyQuoteCard>  
        );
    }

    return(
        <div>
            {quotes}
        </div>
    )
}


// What about accepting changes to the data?
// This should be changed to QuoteCard Generalize
function VerifyQuoteCard(props) {
    const modalStage = [];
    let nextConfirm;

    const [stage, setStage] = useState(0)

    const incrementStage = () => {
        let tempStage = stage;
        tempStage++;
        setStage(tempStage);
        console.log(stage);
    }

    const resetStage = () => {
        
    }

    const StageZero = (props) => {
        return(
            <div>
                <h1>{props.quote}</h1>
                <h2>{props.film}</h2>
            </div>
        )
    }

    const StageUno = (props) => {
        return(
            <div>
                <h2>{props.film}</h2>
                <p>Confirm quote is accurate</p>
                <input placeholder={props.quote} type="text"/>
                <iframe 
                    style={{marginBottom:"-6px"}} 
                    rel="0" 
                    playsInline="1" 
                    modestbranding="1" 
                    type="text/html" 
                    width="300px" 
                    height="200px"
                    src={props.videoLink}
                    title={props.index}
                    frameBorder="0"
                />
            </div>
        )
    }

    const StageDos = (props) => {
        // Some sort of logic to incorporate the title into the search
        const apiPrefix = "http://www.omdbapi.com/?i="
        const filmTitle = props.film.replace(/\s/g, '+')
        const apiPostfix = "&apikey=600cfc64"

        // use this to get id? 
        // Then go to imdb site?
        // We can get the film poster from 

        // This can be improved shun

        return(
            <div>
                <h2>{props.film}</h2>
                <input placeholder="Film Poster" type="text"/>


                <input placeholder="Actor" type="text"/>
                <input placeholder="Actor Image" type="text"/>
                
                <input placeholder="Year" type="text"/>

                {/* Figure out imdb search params for url */}
                <iframe 
                    style={{marginBottom:"-6px"}} 
                    rel="0" 
                    playsInline="1" 
                    modestbranding="1" 
                    type="text/html" 
                    width="300px" 
                    height="200px"
                    src={props.videoLink}
                    title={props.film}
                    frameBorder="0"
                />
            </div>
        )
    }

    const StageTres = (props) => {
        return(
            <div>
                <h1>{props.year}</h1>
                <h2>{props.actor}</h2>
            </div>
        )
    }

    if (stage === 0) {
        modalStage.push(<StageZero quote={props.data.quote} film={props.data.film}/>)
        nextConfirm = "View Clip"
    }
    if (stage === 1) {
        modalStage.push(<StageUno quote={props.data.quote} film={props.data.film} videoLink={props.data.videoLink}/>)
        nextConfirm = "Add Images"
    }
    if (stage === 2) {
        modalStage.push(<StageDos film={props.data.film} videoLink={props.data.videoLink}/>)
        nextConfirm = "Preview"
    }
    if (stage === 3) {
        modalStage.push(<StageTres film={props.data.film} year={props.data.year} actor={props.data.actor}/>)
        nextConfirm = "Confirm";
    }
        

    return(
        <div>   
            {modalStage}    
            {props.children}         
            <button onClick={incrementStage}>{nextConfirm}</button>
        </div>
        )
}