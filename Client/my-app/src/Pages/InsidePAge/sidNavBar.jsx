import React, { useState } from "react";
import './css/homeNavigation.css';

function NavBar(props) {
    const [navWidth, setNavWidth] = useState(0);

    const openNav = () => {
        setNavWidth(250);  // Set the width to 250px when opening the nav
    };

    const closeNav = () => {
        setNavWidth(0);  // Set the width to 0 when closing the nav
    };

    return (
        <div>
            <div id="mySidenav" className="sidenav" style={{ width: navWidth }}>
                <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
                <a href="/Drives">Launch drives</a>
                <a href="#">Find drives</a>
                <a href="apply">Apply as Donor</a>
                <a href="#">Contact</a>
            </div>
            <span style={{ fontSize: "30px", cursor: "pointer" }} onClick={openNav}>&#9776;</span>
        </div>
    );
}

export default NavBar;
