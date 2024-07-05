import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import './profile.css';
import TopNav from "../topNav";

function Profile() {
    const { id } = useParams();
    const navigate = useNavigate(); // Hook for navigation
    const [fname, setFname] = useState();
    const [lname, setLname] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [pincode, setPin] = useState();
    const [city, setCity] = useState();
    const [age, setAge] = useState();
    const [auth, setAuth] = useState(0);

    useEffect(() => {
        axios.post(`http://localhost:5001/userid/${id}/profile`, { id: id }, {
            withCredentials: true
        })
            .then((response) => {
                console.log(response.data);
                if (response.data == "-1") {
                    setAuth(-1);
                } else {
                    setCity(response.data.city);
                    setPin(response.data.pincode);
                    setEmail(response.data.email);
                    setLname(response.data.lname);
                    setFname(response.data.fname);
                    setPhone(response.data.phone);
                    setAge(response.data.age);
                    setAuth(0);
                }
            })
            .catch((error) => {
                console.log(error);
                setAuth(-1);
            });
    }, [id]);

    const handlePlusClick = () => {
        navigate('/update-profile-picture'); // Navigate to the update profile picture page
    };

    if (auth == 0) {
        return (
            <div>
                <TopNav />
                <div className="profile-container">
                    <div className="profile-image">
                        <div>
                            <img src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg" alt="Profile" />
                            <button className="plus-button" onClick={handlePlusClick}>+</button>
                        </div>

                        <a href="/currentReg">Current registration</a>
                        <a href="/drives">Previous registrations</a>
                        <a href="/drives">Your drives</a>
                        <a href="/drives">Your drives</a>
                        
                    </div>
                    <div className="vertical-line"></div>
                    <div className="profile-details">
                        <h2>{fname} {lname}</h2>
                        <p><span>Email: </span> {email}</p>
                        <p><span>Phone: </span>{phone}</p>
                        <p><span>City: </span>{city}</p>
                        <p><span>Pincode: </span>{pincode}</p>
                        <p><span>Age: </span>{age}</p>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <h4>You are not authorized</h4>
        );
    }
}

export default Profile;
