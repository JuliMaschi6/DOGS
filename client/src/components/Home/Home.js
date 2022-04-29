import React from "react";
import { NavLink } from 'react-router-dom';

import './Home.css'

export default function mainRoute(){

    return (
        <div>
            <header>
                <input placeholder="enter a breed"></input>
            </header>
            <div>
                <h1>MANY BREEDS HERE</h1>
            </div>
        </div>
    )
}