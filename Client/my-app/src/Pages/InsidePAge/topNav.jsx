import React, { useContext } from "react";
import './css/topNav.css'
import NavBar from "./sidNavBar";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDetectClickOutside } from 'react-detect-click-outside'
import { SearchContext } from "../Context/searchContext";
import { Navigate } from "react-router-dom";
function TopNav(){
const {id}=useParams()
const [authenticated,setAuth]=useState(-1);
const [search,setSearch]=useState('')
const [results,setResult]=useState([])
const [displayDropdown, setDisplayDropdown] = useState(false);
const {searchResult, setSearchResult } = useContext(SearchContext);
const navigate=useNavigate()
const closeDropdown = () => {
  setDisplayDropdown(false);
}
const ref = useDetectClickOutside({ onTriggered: closeDropdown });

function handlClick(id){
  try {
    setSearchResult(id);
  } catch (error) {
    console.log(error)
  }
  
  
  
}
function handleSearchChange(e){
  console.log(displayDropdown)
  setDisplayDropdown(true)
  setSearch(e.target.value);
  console.log(search.length)
  if(search.length===0){
    
    setResult([])
  }
  
    axios.post('http://localhost:5001/searchBanks',{search:search},{
    withCredentials:true
    })     
    .then((response)=>{
      console.log(response.data)
      setResult(response.data);
    })
    .catch((error)=>{
      console.log(error);
    })
  
  
  
}
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
},[])

  
  if(authenticated==0){
    return (
        <div>
            
            <div className="navbar">
                <NavBar id={id}/>
                <a className="active" href="#"><i className="fa fa-fw fa-home"></i> Home</a>
                
                <a href="#"><i className="fa fa-fw fa-envelope"></i> Contact</a>
                <div>
                  <input  className="search" type="text" placeholder="Search centers" value={search} onChange={(e)=>handleSearchChange(e)} onClick={()=>setDisplayDropdown(true)} />
                
                  {results.length > 0 && displayDropdown && (
                    <div  id="search-cards" className="card"  style={{ width: '16rem' }} ref={ref}>
              
                      
                      {results.map((result, index) => (
                        <a key="index" href="/showBanks" onClick={handlClick(result.id)}>{result.Name}</a>
                      ))}
                      
                    </div>
                  )}
                    
                    
                </div>
                
                
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