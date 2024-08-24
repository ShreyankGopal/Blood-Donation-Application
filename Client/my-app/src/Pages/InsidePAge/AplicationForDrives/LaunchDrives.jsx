import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopNav from "../topNav";
import api from "../../../API/api";
import './LaunchDrives.css';

function LaunchDrives() {
    const [banks, setBanks] = useState([]);
    const { id } = useParams();
    const [auth, setAuth] = useState(0);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        bloodGroup: '',
        bank: ''
    });
    const [submit, setSubmit] = useState(-1);

    const navigate = useNavigate();

    useEffect(() => {
        api.get('/banksToDonate')
            .then((response) => {
                console.log(response);
                setBanks(response.data);
                setAuth(0);
            })
            .catch((error) => {
                console.log(error);
                setAuth(-1);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleBloodGroupChange = (e) => {
        setFormData({
            ...formData,
            bloodGroup: e.target.value
        });
    };

    const handleBankChange = (e) => {
        setFormData({
            ...formData,
            bank: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.post('/regDrive', {
            userId: id.id,
            title: formData.title,
            description: formData.description,
            bloodGroup: formData.bloodGroup,
            bank: formData.bank
        })
        .then((response) => {
            console.log(response.data);
            if(response.data=="spam"){
                setSubmit(9)
            }
            else{
                setSubmit(0);
            }
            
            // Replace with the route you want to navigate to after successful form submission
        })
        .catch((error) => {
            console.log(error);
        });
    };

    if (submit === -1) {
        return (
            <div>
                <TopNav />
                <div className="div-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Give a title for others to see</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Who is in need and how much is he/she in need?</label>
                            <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                rows="3"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="bloodGroup">Blood group</label>
                            <select
                                className="form-control"
                                id="bloodGroup"
                                name="bloodGroup"
                                value={formData.bloodGroup}
                                onChange={handleBloodGroupChange}
                                required
                            >
                                <option value=""></option>
                                <option value="A+">A+</option>
                                <option value="B+">B+</option>
                                <option value="AB+">AB+</option>
                                <option value="O+">O+</option>
                                <option value="A-">A-</option>
                                <option value="B-">B-</option>
                                <option value="AB-">AB-</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="bank">Which Hospital/Blood Bank to Donate?</label>
                            <select
                                className="form-control"
                                id="bank"
                                name="bank"
                                value={formData.bank}
                                onChange={handleBankChange}
                                required
                            >
                                <option value=""></option>
                                {Array.isArray(banks) && banks.map((bank, index) => (
                                    <option key={index} value={bank.Name}>{bank.Name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="button-container">
                            <button className="launch-button" type="submit">Launch</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    } else if(submit==0) {
        return (
            <div>
                <TopNav />
                <div className="div-container">
                    <form>
                        <div className="form-group">
                            <h3>You have launched your drive ☑️</h3>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
    else if(submit==9){
        return (
            <div>
                <TopNav />
                <div className="div-container">
                    <form>
                        <div className="form-group">
                            <h3>Your submission has been caught in spam 😕</h3>
                        </div>
                    </form>
                </div>
            </div>            
        )
    }
}

export default LaunchDrives;
