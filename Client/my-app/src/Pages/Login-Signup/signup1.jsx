import React, { useState,useEffect } from "react";
import axios from 'axios';
import './css/background.css';
import './css/login-signup.css';
import 'react-slideshow-image/dist/styles.css'
import Slideshow from "./slideshow";
import { useNavigate } from 'react-router-dom';
import Images from "./introImage";
import OTP from "./OTPformatmail";
import ReactDOMServer from 'react-dom/server';
import './css/OTP.css'

function Signup() {
    const apiUrl = process.env.REACT_APP_API_URL;
    
    const navigate=useNavigate();
    const [city, setCity] = useState('Bangalore');
    const [age, setAge] = useState(18);
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [pincode,setPin]=useState();
    const [stage,setStage]=useState(1);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState('');
    const [passLength,setLength]=useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const [submission,setSubmission]=useState(0);
    const [otp,setOtp]=useState(1111);
    const [inputOTP,setInputOtp]=useState();
    const[timer,setTimer]=useState(120)
    //const [lname, setLname] = useState('');
    useEffect(() => {
        let countdown;
        if (timer > 0) {
            countdown = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        } else {
            setOtp(-1);
        }

        return () => clearInterval(countdown);
    }, [timer]);
    function handleOtpSubmitButton(e){
        e.preventDefault();
        if(e.target.value==-1){
            window.alert("wrong otp")
        }
        else if(inputOTP==otp){
            setStage(3);
        }
        else{
            window.alert("Wrong otp");
        }
    }
    function generateOTP() { 
  
        // Declare a digits variable 
        // which stores all digits  
        let digits = '0123456789'; 
        let OTP = ''; 
        let len = digits.length 
        for (let i = 0; i < 4; i++) { 
            OTP += digits[Math.floor(Math.random() * len)]; 
        } 
        console.log(OTP)
        return OTP; 
    }
    function handleResendOtp(e){
            e.preventDefault()
            console.log("resending otp")
            const newOtp = generateOTP();
            setOtp(newOtp);
            setTimer(120);
            const messageHtml = ReactDOMServer.renderToStaticMarkup(
                <OTP otp={newOtp}></OTP>
            );
            axios.post('http://localhost:5001/sendOTP',{messageHtml:messageHtml,email:email})
            .then((response)=>{
                console.log(response.data)
                
                console.log(stage)
            })
            .catch((error)=>{
                console.log(error);
            })
    }
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        // Get the first file selected by the user
        
        if(file){
            const filename=file.name;
            const extension=filename.split(".").pop().toLowerCase()
            if(extension=="pdf"){
                setSelectedFile(event.target.files[0]);   
                setSubmission(1);
            }
            else{
                window.alert("document needs to be pdf format");
                setSubmission(0);
            }
        }
    };
    function handlePassword(e){
        setPassword(e.target.value)
        setLength(e.target.value.length);
    }
    function handleCityClick(cityName) {
        setCity(cityName);
        
    }
    function handleSubmit2(e){
        e.preventDefault();
        if(passLength<8){
            window.alert("password should be atleast 8 characters long");
        }
        else{
            setStage(9);
            const newOtp = generateOTP();
            setOtp(newOtp);
            setTimer(120)
            
            const messageHtml = ReactDOMServer.renderToStaticMarkup(
                <OTP otp={newOtp}></OTP>
            );
            axios.post('http://localhost:5001/sendOTP',{messageHtml:messageHtml,email:email})
            .then((response)=>{
                console.log(response.data)
                
                console.log(stage)
            })
            .catch((error)=>{
                console.log(error.data);
            })
            
        }

    }
    function handleSubmit3(e){
        if(submission==0){
            return;
        }
        e.preventDefault();
        const formData = new FormData();
        formData.append("fname", fname);
        formData.append("lname", lname);
        formData.append("phone", phone);
        formData.append("age", age);
        formData.append("city", city);
        formData.append("email", email);
        formData.append("pincode", pincode);
        formData.append("password", password);
        formData.append("file", selectedFile);
        console.log(formData)
        axios.post('http://localhost:5001/signup',formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true
        })
        .then((response)=>{
            console.log("DONE")
            console.log(response);
            if(response.data!="0"){
                window.alert("email/phone already exists\n");
                
            }
            else{
                navigate(`/login`);
            }
        })
            
        
        .catch((error)=>{
            console.log(error);
            console.log("eerorr is happened")
        })



    }

    function handleSubmit1(e) {
       

        
        e.preventDefault();
        if(fname.length==0 || lname.length==0 || pincode.length==0){
            window.alert("Fill all the fields")
        }
        else{
            setStage(2);
        }
        
    }

    function handlePlusClick(event) {
        event.preventDefault();
        if (age < 60) {
            setAge(age + 1);
        }
    }

    function handleMinusClick(event) {
        event.preventDefault();
        if (age > 18) {
            setAge(age - 1);
        }
    }
    if(stage==1){

    
    return (
    <div>
        
        <Slideshow />
       
        
        <div className="table-container">
            <form className="form" onSubmit={handleSubmit1}>
                <table>
                    <tr>
                        <td><label htmlFor="fname">First Name</label><br /></td>
                        <td><input type="text" id="fname" name="fname" placeholder="John" value={fname} onChange={(e) => setFname(e.target.value)} /><br /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="lname">Last Name</label><br /><br /></td>
                        <td><input type="text" id="lname" name="lname" placeholder="Doe" value={lname} onChange={(e) => setLname(e.target.value)} /><br /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="city">City</label><br /></td>
                        <td>
                            <div className="dropdown">
                                <button id="dropdown-button" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                                    {city}
                                </button>
                                <ul className="dropdown-menu">
                                    <li className="dropdown-item" onClick={() => handleCityClick("Bangalore")}>Bangalore</li>
                                    <li className="dropdown-item" onClick={() => handleCityClick("Mysore")}>Mysore</li>
                                    <li className="dropdown-item" onClick={() => handleCityClick("Hyderabad")}>Hyderabad</li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td><label htmlFor="pincode">PinCode</label><br /><br /></td>
                        <td><input type="text" id="pincode" name="pincode"  value={pincode} onChange={(e) => setPin(e.target.value)} /><br /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="age">Age</label><br /><br /></td>
                        <td>
                            <div className="form-group">
                                <button id="plusButton" onClick={(e) => handleMinusClick(e)}>
                                    -
                                </button>
                                <input type="text" id="age" name="age" value={age} readOnly /><br />
                                <button id="minusButton" onClick={(e) => handlePlusClick(e)}>
                                    +
                                </button>
                            </div>
                        </td>
                    </tr>
                </table>
               
                <button type="submit" id="front-button1">→</button>

            </form>
        </div>
        </div>
    )
    }
    else if(stage==2){
        return (
            <div>
            <Slideshow />
            <div className="table-container">
                <form className="form" >
                    <table>
                        <tr>
                            <td><label htmlFor="Email">Email</label><br /></td>
                            <td><input type="text" id="email" name="email" placeholder="John@example.com" value={email} onChange={(e) => setEmail(e.target.value)} /><br /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="Phone">Phone</label><br /><br /></td>
                            <td><input type="text" id="phone" name="phone" placeholder="123456789"  onChange={(e) => setPhone(e.target.value)} /><br /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="password">Password</label><br /><br /></td>
                            <td><input type="password" id="password" name="password"  value={password} onChange={(e) => handlePassword(e)} /><br /></td>
                        </tr>
                        
                        
                    </table>
                    <button  id="back-button1" onMouseDownCapture={()=>setStage(1)}>←</button>
                    <button  onClick={(e)=>handleSubmit2(e)} id="front-button2">→</button>
                </form>
        </div>
        </div>
        )
    }
    else if(stage==9){
        return(
        <div className="center-container">
            <div className="form-container">
                <h1>Enter OTP</h1>
                <p>OTP sent to {email}</p>
                <input
                    type="text"
                    id="otp"
                    value={inputOTP}
                    onChange={(e) => setInputOtp(e.target.value)}
                    placeholder="Enter your OTP"
                />
                {otp === -1 ? (
                    <button onClick={(e)=>handleResendOtp(e)}>resend</button>
                ) : (
                <div>
                    <p>Your OTP will expire in {timer} seconds</p>
                    
                </div>
            )}
            <button type="submit" onClick={(e) => handleOtpSubmitButton(e)}>
                Submit
            </button>
        </div>
        </div>
    )

    }
    else if(stage==3){
        return (
            <div>
                <Slideshow />
            <div className="table-container">
                <form className="form" onSubmit={handleSubmit3}>
                    
                        <label htmlFor="Email">Upload a valid ID(Pan/Aadhar/Driving licence) PDF format only</label><br />
                        <input type="file" class="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" onChange={handleFileChange} aria-label="Upload"/><br />
                        
                        
                        
                        
                    
                    <button  id="back-button2" onClick={()=>setStage(2)}>←</button>
                   
                    <button type="submit" id="submit-button">submit</button>
                </form>
            </div>
            </div>
        )
    }
}

export default Signup;
