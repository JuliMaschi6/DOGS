import React from "react";

export default function Card ({img, name, weight, temperaments, id}) {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <div className="row">
            <div>
              <p>Weight: </p>
              <p>{weight}</p>
            </div>
            <div>
              <p>Temperaments: </p>
              <p>{temperaments}</p>
            </div>
            <div>
              <img className="imageDog" src={img} width="80" height="80" alt="" />
            </div>
          </div>
        </div>
      </div>
    );
};