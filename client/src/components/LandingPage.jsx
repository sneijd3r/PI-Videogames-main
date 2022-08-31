import React from "react";
import {Link} from 'react-router-dom'
import './css/ladingpage.css'

export default function LandingPage(){
    return(
        <div class="background">
            <div className="containerLanding">
            <h1 className="welcome">WELCOME TO <br />
            GAMES.DATA</h1>
            <Link to ='/home'>
            <button class='button-31L'>Start</button>
            </Link>
            </div>
        </div>
        )
    }
