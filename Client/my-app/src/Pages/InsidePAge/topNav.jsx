import React from "react";
import './css/topNav.css'
import NavBar from "./sidNavBar";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
function TopNav(){
const {id}=useParams()
const [authenticated,setAuth]=useState(-1);
function handlLogoutClick(){
  //console.log("logout")
  //document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  axios.post("http://localhost:5001/logout",{},{
    withCredentials:true
  })
  .then((response)=>{
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  })
  .catch((error)=>{
    console.log(error);
  })
}
useEffect(()=>{
  console.log('useEffect called');
    
  axios.get(`http://localhost:5001/userid/${id}/home`,{
    withCredentials:true
  })
  .then((response)=>{
    console.log(response.data)
    if(response.data=="0"){

      setAuth(0);
    }
    else{
      console.log("unauthorised")
    }
    
  })
  .catch((error)=>{
    console.log(error)
    console.log(error.data)
  })
},[id])

  
  if(authenticated==0){
    return (
        <div>
            
            <div className="navbar">
                <NavBar id={id}/>
                <a className="active" href="#"><i className="fa fa-fw fa-home"></i> Home</a>
                
                <a href="#"><i className="fa fa-fw fa-envelope"></i> Contact</a>
                <input  className="search" type="text" placeholder="Search centers"/>
                <a href="profile"><i className="fa fa-fw fa-user"></i> Profile</a>
                <a href="/" onClick={handlLogoutClick}><i className="fa fa-fw"  ></i> Logout</a>
                
                
                
                
            </div>

        </div>
    )
  }
  else{
    return(
        <h1>You are not authorised</h1>
    )
  }
}
export default TopNav;