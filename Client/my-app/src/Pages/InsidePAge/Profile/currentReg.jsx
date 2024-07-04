import React from "react";
import { useEffect,useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
function CurrentReg(){
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
            
            <div>
                {result.map((item, index) => (
                    <div key={index}>
                        <p>First Name: {item.fname}</p>
                        <p>Last Name: {item.lname}</p>
                        <p>Phone: {item.phone}</p>
                        <p>Email: {item.email}</p>
                        <p>Pincode: {item.pincode}</p>
                        <p>City: {item.city}</p>
                        <p>Age: {item.age}</p>
                        <p>Branch: {item.Name}</p>
                    </div>
                ))}
            </div>
        ) 
    }

}
export default CurrentReg