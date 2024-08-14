import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import './profile.css';
import TopNav from "../topNav";
import { Link } from "react-router-dom";
import api from "../../../API/api";
function Profile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [fname, setFname] = useState();
    const [lname, setLname] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [pincode, setPin] = useState();
    const [city, setCity] = useState();
    const [age, setAge] = useState();
    const [auth, setAuth] = useState(0);

    useEffect(() => {
        api.post(`/userid/${id}/profile`, { id: id })
            .then((response) => {
                console.log(response.data);
                if (response.data === "-1") {
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
        navigate('/update-profile-picture');
    };

    if (auth === 0) {
        return (
            <div>
                <TopNav />
                <div className="profile-container">
                    <div className="profile-image">
                        <div style={{ position: 'relative' }}>
                        <img src={`${process.env.PUBLIC_URL}/images/anchor2.png`}></img>
                            
                        </div>
                        <Link to={`/userid/${id}/currentReg`} className="plain-text-link">Current registration</Link>
                        <Link to="/drives" className="plain-text-link">Prev registrations</Link>
                        <Link to={`/userid/${id}/your-drives`} className="plain-text-link">Your drives</Link>
                        <Link to="/your-drives" className="plain-text-link">Your drives</Link>
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
                    <div className="picture">
                        <h3>You are a volunteer </h3>
                        <img src={`${process.env.PUBLIC_URL}/images/anchor2.png`}></img>
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
