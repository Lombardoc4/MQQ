import React, { useState } from "react";
import { Link, useLocation} from "react-router-dom";

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
    const SideSelector = () =>  (<Link to={buttonLink}><button className="bc-3 center-h my-10">{buttonTitle}</button></Link>);

    // Create Main Component
    const UserExperience = () => (experienceTitle === "/play" ? <GameBody /> : <Contribute/>);

    return (
        <div>
            <UserExperience />
            {/* <SideSelector /> */}

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