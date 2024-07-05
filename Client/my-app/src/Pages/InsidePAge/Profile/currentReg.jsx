import React from "react";
import { useEffect,useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './currentReg.css'
function CurrentReg(){
    const navigate=useNavigate()
    const [fname, setFname] = useState();
    const [lname, setLname] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [pincode, setPin] = useState();
    const [city, setCity] = useState();
    const [age, setAge] = useState();
    const [branch, setBranch] = useState();
    const {id}=useParams()
    const [auth,setAuth]=useState(0);
    const [result,setResult]=useState(null)
    useEffect(()=>{
        axios.post(`http://localhost:5001/userid/${id}/currentReg`,{id:id},{
            withCredentials:true
        })
        .then((response)=>{
            if(response.data=="-1"){
                setAuth(-1);
            }
            else{
                setResult(response.data)
            }
        })
        .catch((error)=>{
            console.log(error);
            setAuth(-1);
        })
    },[])
    if(auth==0 && result){
        return(
            <div className="full-container">
                <button className="back-button" onClick={() => navigate(`/userid/${id}/profile`)}>⬅️ profile</button>
            <div className="user-details-container">
                {result.map((item, index) => (
                    <div key={index} className="user-details-card">
                        <p><span>First Name:</span> {item.fname}</p>
                        <p><span>Last Name:</span> {item.lname}</p>
                        <p><span>Phone:</span> {item.phone}</p>
                        <p><span>Email:</span> {item.email}</p>
                        <p><span>Pincode:</span> {item.pincode}</p>
                        <p><span>City:</span> {item.city}</p>
                        <p><span>Age:</span> {item.age}</p>
                        <p><span>Branch:</span> {item.Name}</p>
                        <img src={`https://api.qrserver.com/v1/create-qr-code/?data=branch:${item.Name} fname:${item.fname} lname:${item.lname} phone:${item.phone} email:${item.email} age:${item.age} branch:${item.branch}&amp;size=100x100`}/>
                    </div>
                ))}
            </div>
            </div>
        ) 
    }

}
export default CurrentReg