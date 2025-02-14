import React, { useContext } from "react";
import './css/home2.css'
import './css/topNav.css'
import NavBar from "./sidNavBar";
import { useEffect , useRef} from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDetectClickOutside } from 'react-detect-click-outside'
import { SearchContext } from "../Context/searchContext";
import { Navigate } from "react-router-dom";
import api from "../../API/api";
import TopNav from "./topNav";
function Home2(){
  console.log(process.env.REACT_APP_API_URL)
  const {id}=useParams()
  const [authenticated,setAuth]=useState(-1);
  const [search,setSearch]=useState('')
  const [results,setResult]=useState([])
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const {setSearchResult } = useContext(SearchContext);
  const contactRef = useRef(null);
  const navigate=useNavigate()
  const closeDropdown = () => {
    setDisplayDropdown(false);
  }
  const ref = useDetectClickOutside({ onTriggered: closeDropdown });
  
  function handlClick(bid){
    try {
      
      navigate(`/userid/${id}/bankid/${bid}/showbanks`);
    } catch (error) {
      console.log(error)
    }
    
    
    
  }
  
  
    // Function to scroll to the element
    const scrollToContact = () => {
      if (contactRef.current) {
        contactRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };
  function handleSearchChange(e){
    console.log(displayDropdown)
    setDisplayDropdown(true)
    setSearch(e.target.value);
    console.log(search.length)
    if(search.length===0){
      
      setResult([])
    }
    
      api.post('/searchBanks',{search:search})     
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
      
    api.get(`/userid/${id}/home`)
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




  
  
    return (
        <div>
            
            <div className="navbar">
                <NavBar id={id}/>
                <a className="active" href={`/userid/${id}/home`}><i className="fa fa-fw fa-home"></i> Home</a>
                
                <a  href="#" onClick={scrollToContact}><i className="fa fa-fw fa-envelope"></i> Contact</a>
                <div>
                  <input  className="search" type="text" placeholder="Search centers" value={search} onChange={(e)=>handleSearchChange(e)} onClick={()=>setDisplayDropdown(true)} />
                
                  {results.length > 0 && displayDropdown && (
                    <div  id="search-cards" className="card"  style={{ width: '16rem' }} ref={ref}>
              
                      
                      {results.map((result, index) => (
                        <a key="index"  onClick={()=>handlClick(result.id)}>{result.Name}</a>
                        
                      ))}
                      
                    </div>
                  )}
                    
                    
                </div>
                
                
                <a href={`/userid/${id}/profile`}><i className="fa fa-fw fa-user"></i> Profile</a>
                <a href="/" onClick={handlLogoutClick}><i className="fa fa-fw"  ></i> Logout</a>
                
                
                
                
            </div>
            <div className="image-container">
    <img src="https://www.rythmfoundation.org/wp-content/uploads/2020/07/1865-scaled.jpg" alt="Image 1" className="full-width-image" />
    <img src="https://www.met.edu/uploadfile/gallery/571/Pic-1.JPG" alt="Image 2" className="full-width-image" />
    <img src="https://www.rythmfoundation.org/wp-content/uploads/2020/07/1865-scaled.jpg" alt="Image 3" className="full-width-image" />
    <img src="https://www.rythmfoundation.org/wp-content/uploads/2020/07/1865-scaled.jpg" alt="Image 4" className="full-width-image" />
</div>

<div id="contact" className="contact-section" ref={contactRef}>
    <div className="contact-card">
        <h2>Contact</h2>
        <p><i className="fa fa-whatsapp"></i> WhatsApp: 9606900656</p>
        <p><i className="fa fa-envelope"></i> Email: shreyankgbhat@gmail.com</p>
        <p><i className="fa fa-instagram"></i> Instagram: <a href="https://instagram.com/shreyank_beast">shreyank_beast</a></p>
    </div>
</div>

        </div>
    )
  
  
}
export default Home2;