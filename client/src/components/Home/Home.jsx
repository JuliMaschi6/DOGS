import React from "react";
import './Home.css'
import Cards from "../Breeds/Cards";

export default function mainRoute(){
    return (
        <div>
            <div className="home"> <Cards /> </div>
        </div>
    )
}