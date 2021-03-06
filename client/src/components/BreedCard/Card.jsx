import React from "react";
import { Link } from 'react-router-dom';
import './Card.css'

export default function Card ({img, name, weight, temperament, id ,temperaments}) {
    return (
      <div className="card">
        <Link to={`/home/breedDetail/${id}`} style={{ textDecoration: 'none', color: 'black' }} >
        <div className="card-body">
          <h2 className="card-title" key={id}>{name}</h2>
          <div className="row">
            <div>
              <h4>Weight: </h4>
              <p>{weight} Kg</p>
            </div>
            <div>
              {
                temperaments 
                  ? <div><h4>Temperaments: </h4><p>{temperaments.map(e=>{return e.name +','})}</p></div>
                  : <div><h4>Temperaments: </h4><p>{temperament}</p></div>
              }
            </div>
            <div className="imgDiv">
              <img className="imageDog" src={img} alt="Dog" />
            </div>
          </div>
        </div>
        </Link>
      </div>
    );
};
