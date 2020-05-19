import React, { useState } from "react";
import { Link, useLocation} from "react-router-dom";

import "./game.scss";
import Contribute from "./contribute";
import GameBody from "./game";

const UserContainer =  () => {
    // Get URL Location
    const local = useLocation();
    const experienceTitle = local.pathname;

    // Setting Button Link
    let buttonLink;
    let buttonTitle;
    if (experienceTitle === '/play'){
        buttonLink = '/contribute'
        buttonTitle = 'CONTRIBUTE'
    }

    if (experienceTitle === '/contribute'){
        buttonLink = '/play'
        buttonTitle = 'PLAY'
    }

    // Creating Button
    const SideSelector = () =>  (<Link to={buttonLink}><button>{buttonTitle}</button></Link>);

    // Create Main Component
    const UserExperience = () => (experienceTitle === "PLAY" ? <GameBody /> : <Contribute/>);

    return (
        <div>
            <SideSelector />
            <UserExperience />
        </div>
    )
}







//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////


const ContributeBody =  () => {
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

export default UserContainer