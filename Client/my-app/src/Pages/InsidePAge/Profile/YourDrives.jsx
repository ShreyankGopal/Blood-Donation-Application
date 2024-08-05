import React from "react";
import { useEffect,useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function YourDrives(){
    const {id}=useParams();
    return(
        <div className="full-container">
            <button className="back-button" onClick={() => navigate(`/userid/${id}/profile`)}>⬅️ profile</button>
        </div>
    )
}