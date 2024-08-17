import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import TopNav from "../InsidePAge/topNav";
//import './FindDrives.css';
import api from "../../API/api";
import './findDrives.css'
import { Link } from "react-router-dom";
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
                {drives.map((drive, index, arr) => {
                    const reversedIndex = arr.length - 1 - index; // Calculate the reversed index
                    const reversedDrive = arr[reversedIndex]; // Access the drive at the reversed index
                    var date;
                    if(reversedDrive.Date!=null){
                        date=reversedDrive.Date.split('T')[0];
                    }
                    else{
                        date=-1;
                    }
                    
                    return (
                        <div key={reversedIndex} className="card mb-3">
                            <div className="card-body">
                                <a href={`/full-drive-details/${reversedDrive.id}`}><h3 className="card-title">{reversedDrive.Title}</h3></a>
                                <p className="card-text">Bank: {reversedDrive.bank}</p>
                                <p className="card-text">Blood Group: {reversedDrive.bloodGroup}</p>
                                <p className="card-text-date">posted on {date}</p>
                            </div>
                        </div>
                    );
                })}
                </div>
            </div>
        );
   
}

export default FindDrives;
