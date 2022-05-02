import React from "react";
import { Link } from 'react-router-dom';
import SearchBar from "../SearchBar/SearchBar";
import { findBreedByName } from "../../actions/index";

import './Home.css'

export default function mainRoute(){

    return (
        <div>
            <div>
            <span className='searchBar'><SearchBar onSearch={findBreedByName}/></span>
            </div>
        </div>
    )
}