import { useParams } from "react-router-dom";
import TopNav from "./topNav";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactDOMServer from 'react-dom/server';
import './css/application.css';
import api from "../../API/api";
import MyEmail from './Email';

function Application() {
    const [fname, setFname] = useState();
    const [lname, setLname] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [pincode, setPin] = useState();
    const [city, setCity] = useState();
    const [age, setAge] = useState();
    const [auth, setAuth] = useState(0);
    const [branch, setBranch] = useState();
    const { id, bankid } = useParams();
    
    const [resp, setResponse] = useState({});
    const [stage,setStage]=useState(0);
    function handleButtonClick(e) {
        e.preventDefault();
        setStage(1);
        const messageHtml = ReactDOMServer.renderToStaticMarkup(
            <MyEmail fname={fname} lname={lname} branch={branch}></MyEmail>
        );
        api.post("/sendApplicationEmail", { messageHtml: messageHtml,email:email ,id:id,bankid:bankid})
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        axios.post(`http://localhost:5001/userid/${id}/apply/bankid/${bankid}/application`, { id: id, bankid: bankid }, {
            withCredentials: true
        })
        .then((response) => {
            setResponse(response);
            if(response.data === "-1"){
                setAuth(-1);
            } else if(response.data === "applied"){
                setAuth(1);
            } else {
                setCity(response.data[1].city);
                setPin(response.data[1].pincode);
                setEmail(response.data[1].email);
                setLname(response.data[1].lname);
                setFname(response.data[1].fname);
                setPhone(response.data[1].phone);
                setAge(response.data[1].age);
                setBranch(response.data[0].Name);
                setAuth(0);
            }
        })
        .catch((error) => {
            setAuth(-1);
            console.log(error);
        });
    }, [id, bankid]);

    if(auth === 0 && stage==0) {
        return (
            <div className="full-container">
               
                <div className="container">
                    <h2>Registration Details</h2>
                    <h6>Branch : {branch}</h6>
                    <p>Name : {fname} {lname}</p>
                    <p>Phone : {phone}</p>
                    <p>Email : {email}</p>
                    <p>Age : {age}</p>
                    <img src={`https://api.qrserver.com/v1/create-qr-code/?data=branch:${branch} fname:${fname} lname:${lname} phone:${phone} email:${email} age:${age} branch:${branch}&amp;size=100x100`} alt="" title="" />
                    <p className="warning-message">Scan this at the center</p>
                    <button onClick={handleButtonClick}>Confirm application</button>
                </div>
            </div>
        )}
    else if(auth==0 && stage==1){
        return(
            <div className="success-container">
                <div className="success-card">
                <div className="success-icon"></div>
                <h2 className="success-title">Registration Successful!</h2>
                <p className="success-message">
                    Thank you for registering. You can view your details in your profile.
                 </p>
                <div className="qr-container">
                    {/* Your QR code component goes here */}
                </div>
                </div>
            </div>
        )

    }
     else if(auth === 1 ) {
        return (
<div style={{
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #fff5f5 0%, #ffe3e3 100%)',
    padding: '2rem'
}}>
    <div style={{
        background: 'white',
        padding: '2.5rem',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        maxWidth: '500px',
        width: '90%',
        animation: 'slideIn 0.5s ease-out',
        position: 'relative'
    }}>
        <div style={{
            width: '64px',
            height: '64px',
            background: '#ff4d4f',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 auto 1.5rem',
            color: 'white',
            fontSize: '32px'
        }}>
            !
        </div>
        <h3 style={{
            color: '#2c3e50',
            fontSize: '1.5rem',
            margin: '0 0 1rem 0',
            fontWeight: '600',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
            You have already registered for this!
        </h3>
        <p style={{
            color: '#666',
            fontSize: '1.1rem',
            lineHeight: '1.5',
            margin: '0'
        }}>
            Please check your profile to view your registration details.
        </p>
    </div>
    <style>
        {`
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `}
    </style>
</div>
        );
    } else {
        return <h2>You are not authorised</h2>;
    }
}

export default Application;
