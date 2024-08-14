import React from "react";
import { useEffect,useState } from "react";
import axios from "axios";
import api from "../../../API/api";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function YourDrives(){
    const navigate=useNavigate();
    const {response,setResponse}=useState();
    const {auth,setAuth}=useState(-1);
    const {id}=useParams();
    api.get('/getYourDrives')
    .then((response)=>{
        setResponse(response.data);

    })
    .catch((error)=>{
        console.log(error);
        setAuth(0);
    })
    return(
        <div className="full-container">
            <button className="back-button" onClick={() => navigate(`/userid/${id}/profile`)}>⬅️ profile</button>
            <div className="user-details-container">
                {response.map((item, index) => (
                    <div key={index} className="user-details-card">
                        <p><span>First Name:</span></p>
                        <p><span>Last Name:</span></p>
                        <p><span>Phone:</span></p>
                        <p><span>Email:</span></p>
                        <p><span>Pincode:</span></p>
                        <p><span>City:</span></p>
                        <p><span>Age:</span></p>
                        <p><span>Branch:</span></p>
                        <img src={`https://api.qrserver.com/v1/create-qr-code/?data=branch:${item.Name} fname:${item.fname} lname:${item.lname} phone:${item.phone} email:${item.email} age:${item.age} branch:${item.branch}&amp;size=100x100`}/>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default YourDrives;