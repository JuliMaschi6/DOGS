import React , {Component} from "react";
import { Link } from 'react-router-dom';
import SearchBar from "../SearchBar/SearchBar";
import { findBreedByName } from "../../actions/index";

import './navBar.css'

export default class Nav extends Component {
    render() {
        return (
            <div>
                <div className="navStyle">
                    <Link to={'/'}>
                        <button className='toLanding'> Init </button>
                    </Link>
                    <Link to={'/home'}>
                        <button className='toLanding'> Home </button>
                    </Link>
                    <Link to={'/home/create'}>
                        <button className='toLanding'> Create Dog </button>
                    </Link>
                    <div className="search"><SearchBar onSearch={findBreedByName}/></div>
                </div>
            </div>
        )
    }
}
