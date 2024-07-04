import { useParams } from "react-router-dom";
import TopNav from "./topNav";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactDOMServer from 'react-dom/server';
import './css/application.css';

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
        axios.post("http://localhost:5001/sendApplicationEmail", { messageHtml: messageHtml,email:email ,id:id,bankid:bankid})
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
            <div>
                
                <h3>Thank You for Registering. You can view the details in your profile. Show the QR code at the centre</h3>
            </div>
        )

    }
     else if(auth === 1 ) {
        return (
            <div className="full-container">
               
            
            <h3>You have already registered for this!</h3>
        </div>
        );
    } else {
        return <h2>You are not authorised</h2>;
    }
}

export default Application;
