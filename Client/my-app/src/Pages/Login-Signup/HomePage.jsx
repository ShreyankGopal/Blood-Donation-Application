import React, { useEffect, useState } from "react";
import Slideshow from "./slideshow";
import './css/home.css';
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [tabColor,setTabColor]=useState(['red','green','blue','orange'])
  function openPage(pageName, elmnt) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(pageName).style.display = "block";
    elmnt.className += " active";
  }

  useEffect(() => {
    // Automatically open the "Home" tab on initial render
    const defaultElement = document.getElementById("defaultOpen");
    openPage('Home', defaultElement);
  }, []);

  return (
    <div>
      <Slideshow />
      <div className="button-style">
        <button onClick={() => navigate(`/signup`)}>Register</button>
        <button onClick={() => navigate(`/login`)}>Login</button>
      </div>
      
      <button style={{ backgroundColor: tabColor[0] }} className="tablink" onClick={(e) => openPage('Home', e.target)}>Home</button>
      <button style={{ backgroundColor: tabColor[1] }} className="tablink" onClick={(e) => openPage('News', e.target)} id="defaultOpen">News</button>
      <button style={{ backgroundColor: tabColor[2] }} className="tablink" onClick={(e) => openPage('Contact', e.target)}>Contact</button>
      <button style={{ backgroundColor: tabColor[3] }} className="tablink" onClick={(e) => openPage('About', e.target)}>About</button>

      <div id="Home" className="tabcontent">
        <h3 >Home</h3>
        <p>Home is where the heart is..</p>
      </div>

      <div id="News" className="tabcontent">
        <h3>News</h3>
        <p>Some news this fine day!</p>
      </div>

      <div id="Contact" className="tabcontent">
        <h3>Contact</h3>
        <p>Get in touch, or swing by for a cup of coffee.</p>
      </div>

      <div id="About" className="tabcontent">
        <h3>About</h3>
        <p>Want to Donate your blood to save someone's life? This is the right platform. You can register for blood donation here, know about blood donation drives, get notified when blood is urgently required, and launch your own drive so that it can reach a greater audience.</p>
      </div>
    </div>
  );
}

export default Home;
