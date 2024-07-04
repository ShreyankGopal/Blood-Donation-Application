import React from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import './css/bloodBank.css'
function Cards(props){
  const formattedDistance = props.distance.toFixed(2);
  const navigate=useNavigate()
  function handleClick(event){
    
    navigate(`bankid/${props.id}/application`);
  }
    return(
    <div className="card mb-3">
   
  <div className="card-body">
    <h5 className="card-title">{props.name}</h5>
    <p className="card-text">{props.address}</p>
    <p className="cardtext2 card-text">approx. {formattedDistance} km</p>
    <button className="applyButton"onClick={(e)=>handleClick(e)}>Apply</button>
  </div>
</div>
    )

}
export default Cards;