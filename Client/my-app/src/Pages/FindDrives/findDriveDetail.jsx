import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import TopNav from "../InsidePAge/topNav";
//import './FindDrives.css';
import api from "../../API/api";
import './findDrives.css'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function DriveDetail(){

    
        
        const navigate = useNavigate();
        const { id } = useParams();
        const [response, setResponse] = useState([]);
        const [auth, setAuth] = useState(-1);
    
        useEffect(() => {
            api.get(`/getDriveDetail/${id}`)
                .then((response) => {
                    setResponse(response.data);
                    setAuth(1); // Set auth to 1 if authorized
                })
                .catch((error) => {
                    console.log(error);
                    setAuth(0); // Set auth to 0 if unauthorized
                });
        }, []);
    
        if (auth === 0) {
            return <h4>You are not authorized</h4>;
        }
    
        if (response.length === 0) {
            return <h4>You have launched no drives</h4>;
        }
    
        return (
            <div className="full-container">
                <button className="back-button" onClick={() => navigate(`/userid/${id}/find-drives`)}>⬅️ back</button>
                <div className="user-details-container">
                    {response.map((item, index,arr) => {
                        const reversedIndex=arr.length-1-index;
                        const reversedArrayElement=arr[reversedIndex];
                        var date;
                        if(reversedArrayElement.Date!=null){
                            date=reversedArrayElement.Date.split('T')[0];
                        }
                        else{
                            date=-1;
                        }
                        return(
                        <div key={reversedIndex} className="user-details-card">
                            <h2> {reversedArrayElement.Title}</h2>
                            <h4><span>Blood Group:</span> {reversedArrayElement.bloodGroup}</h4>
                            <h4><span>Bank:</span> {reversedArrayElement.bank}</h4>
                            <p><span>Description:</span> {reversedArrayElement.purpose}</p>
                            <p className="date">{date}</p>
                            
    
                            
                        </div>
                    )
                    })}
                </div>
            </div>
        );
    }
    export default DriveDetail;
    
    
    
