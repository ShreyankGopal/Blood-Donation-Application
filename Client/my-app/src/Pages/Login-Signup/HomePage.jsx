import React, { useState } from "react";
import Slideshow from "./slideshow";
import './css/home.css'
import { useNavigate } from "react-router-dom";


function Home(){
  console.log("jome")
  
  const navigate=useNavigate();
  
    function openPage(pageName, elmnt, color) {
        // Hide all elements with class="tabcontent" by default */
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }
      
        // Remove the background color of all tablinks/buttons
        tablinks = document.getElementsByClassName("tablink");
        for (i = 0; i < tablinks.length; i++) {
          tablinks[i].style.backgroundColor = "";
        }
      
        // Show the specific tab content
       document.getElementById(pageName).style.display = "block";
      
        // Add the specific color to the button used to open the tab content
       // elmnt.style.backgroundColor = color;
      }
      
      // Get the element with id="defaultOpen" and click on it
      
      
      
    return(
        <div>
            <Slideshow/>
            <div className="button-style">
              <button onClick={()=>navigate(`/signup`)}>Register</button>
              <button onClick={()=>navigate(`/login`)}>Login</button>
            </div>
            
            <button className="tablink" onClick={()=>openPage('Home', this, 'red')}>Home</button>
<button className="tablink" onClick={()=>openPage('News', this, 'green')} id="defaultOpen">News</button>
<button className="tablink" onClick={()=>openPage('Contact', this, 'blue')}>Contact</button>
<button className="tablink" onClick={()=>openPage('About', this, 'orange')}>About</button>

<div id="Home" className="tabcontent">
  <h3>Home</h3>
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
  <p>Want to Donate your blood to save someones life? This is the right platform. You can register for blood donation here, know about blood donation drives, get notified when blood is urgently required and launch your own drive so that it can reach a greater audience</p>
</div>
        </div>
    )
      
      
}
export default Home;