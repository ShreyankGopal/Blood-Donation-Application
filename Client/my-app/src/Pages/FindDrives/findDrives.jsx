import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import TopNav from "../InsidePAge/topNav";
//import './FindDrives.css';
import api from "../../API/api";
import './findDrives.css'
function FindDrives() {
    const { id } = useParams();
    const [drives, setDrives] = useState([]);
    //const [auth, setAuth] = useState();

    useEffect(() => {
        api.get('/find-drives')
            .then((response) => {
                setDrives(response.data);
                console.log(response.data);
               // setAuth(0);
            })
            .catch((error) => {
                console.log(error);
                //setAuth(-1);
            });
    }, []);


        return (
            <div>
                <TopNav />
                <div className="drives-container">
                    {drives.map((drive, index) => (
                        <div key={index} className="card mb-3">
                            <div className="card-body">
                                <h3 className="card-title">{drive.Title}</h3>
                                <p className="card-text">Bank: {drive.bank}</p>
                                <p className="card-text">Blood Group: {drive.bloodGroup}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
   
}

export default FindDrives;
