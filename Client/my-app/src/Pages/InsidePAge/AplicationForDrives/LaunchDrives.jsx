import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopNav from "../topNav";
import { Link } from "react-router-dom";
import api from "../../../API/api";
import './LaunchDrives.css'

function LaunchDrives(){

    const [banks, setBanks] = useState([]);
    const id = useParams();
    const [auth, setAuth] = useState(0);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        bloodGroup: '',
        bank: ''
    });
    const [submit,setSubmit]=useState(-1);
    const [regedDrive,setRegDrive]=useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        api.get('/banksToDonate')
            .then((response) => {
                console.log(response)
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

    const handleSubmit = (e) => {
        e.preventDefault();
        api.post('/regDrive', {
            userId: id,
            title: formData.title,
            description: formData.description,
            bloodGroup: formData.bloodGroup,
            bank: formData.bank
        })
        .then((response) => {
            console.log(response.data);
            setSubmit(0);
             // Replace with the route you want to navigate to after successful form submission
        })
        .catch((error) => {
            console.log(error);
        });
    };

        if(submit==-1){
            return (
                <div>
                    <TopNav/>
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
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option>A+</option>
                                    <option>B+</option>
                                    <option>AB+</option>
                                    <option>O+</option>
                                    <option>A-</option>
                                    <option>B-</option>
                                    <option>AB-</option>
                                    <option>O-</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="bank">Which Hospital/Blood Bank to Donate?</label>
                                <select
                                    className="form-control"
                                    id="bank"
                                    name="bank"
                                    value={formData.bank}
                                    onChange={handleInputChange}
                                    required
                                >
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
        }
        else{
            return(
                <div>
                <TopNav/>
                <div className="div-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <h3>You have launched your drive ☑️</h3>
                        </div>
                    </form>
                </div>
            </div>
            )

                    

            
        }
        
    
}

export default LaunchDrives;
