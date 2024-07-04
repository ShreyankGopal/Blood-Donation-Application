import React, { useState } from "react";
import './css/images.css'

function Images(){
    const images=[
        "https://static.pib.gov.in/WriteReadData/userfiles/image/image00185KM.jpg",
        "https://static.pib.gov.in/WriteReadData/userfiles/image/image00185KM.jpg",
        "https://static.pib.gov.in/WriteReadData/userfiles/image/image00185KM.jpg",
        "https://static.pib.gov.in/WriteReadData/userfiles/image/image00185KM.jpg"
    ]
    return (
        <div>
            <div className="img-position" style={{transform:'translate(20%,30%)'}}>
                <img src={images[0]} alt="" style={{top:'0%',left:'0%'}}/>
            </div>
            <div className="img-position" style={{transform:'translate(350%,30%)'}}>
                <img src={images[0]} alt="" style={{top:'0%',left:'0%'}}/>
            </div>
            <div className="img-position" style={{transform:'translate(20%,250x)'}}>
                <img src={images[0]} alt="" style={{top:'0%',left:'0%'}}/>
            </div>
        </div>
        

    )
}   
export default Images;