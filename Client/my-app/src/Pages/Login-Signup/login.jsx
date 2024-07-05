import react, { useState } from "react";
import './css/background.css'
import './css/login-signup.css'
import Slideshow from "./slideshow";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Login(){
    const navigate=useNavigate();
   const [email,setEmail]=useState('')
   const [password,setPassword]=useState('')
   function handleSubmit(e){
        e.preventDefault();
        console.log("hi")
        const form={
            "email":email,
            "password":password
        }
        
        axios.post("http://localhost:5001/login",form,{
            withCredentials:true
        })
        .then((response)=>{
            console.log(response.data)
            
            if(response.data.mesg==="wrong"){
                window.alert("email/password doesnt exist")
            }
            else{
                console.log("success\ns")
                console.log(document.cookie);
                navigate(`/userid/${response.data.id}/home`)
            }
        })
        .catch((error)=>{
            console.log(error.data)
        })
        
   }

    return(
        <div>
            <Slideshow />
        <div className="table-container">
        <form className="form"  onSubmit={handleSubmit}>
            <table>
            <tr>
                <td><label htmlFor="email">email</label><br /></td>
                <td><input type="text" id="email" name="email" placeholder="John@example.com" value={email} onChange={(e) => setEmail(e.target.value)} /><br /></td>
            </tr>
            <tr>
                <td><label htmlFor="email">Password</label><br /></td>
                <td><input type="password" id="password" name="password"  value={password} onChange={(e) => setPassword(e.target.value)} /><br /></td>
            </tr>
            </table>
           
            <button type="submit" id="submit-button">Login</button>
            
            
        </form>
        </div>
        </div>
    )
}
export default Login;