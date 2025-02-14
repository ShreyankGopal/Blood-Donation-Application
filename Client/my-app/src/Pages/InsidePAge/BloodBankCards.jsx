import React from "react";
import { useNavigate } from "react-router-dom";
import './css/bloodBank.css';

function Cards({ id, bid, name, address, distance }) {
  const navigate = useNavigate();
  const formattedDistance = distance.toFixed(2);

  function handleClick() {
    navigate(`/userid/${id}/apply/bankid/${bid}/application`);
  }

  return (
    <div className="card">
      <div className="distance-badge">
        {formattedDistance} km
      </div>
      <div className="card-content">
        <h3 className="card-title">{name}</h3>
        <p className="card-text">{address}</p>
        <button 
          className="applyButton"
          onClick={handleClick}
          aria-label={`Apply to ${name}`}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}

export default Cards;