import React, { lazy, useEffect, useState } from "react";
import Cards from "./BloodBankCards";
import { useParams } from "react-router-dom";
import TopNav from "./topNav";
import axios from "axios";
import './css/bloodBank.css'
import Loader from "../Loader/loader";
import api from "../../API/api";
function ApplyDonor() {
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [auth, setAuth] = useState(0);
  const [bloodBanks, setBloodBanks] = useState([]);

  // Define the function that finds the user's geolocation
  const getUserLocation = async () => {
    // If geolocation is supported by the user's browser
    if (navigator.geolocation) {
      try {
        // Get the current user's location
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        // Save the geolocation coordinates in two variables
        const { latitude, longitude } = position.coords;
        console.log(position.coords);

        // Update the value of userLocation variable
        setUserLocation({ latitude, longitude });
        setError(null); // Clear any previous errors
      } catch (error) {
        const latitude=0.000000;
        const longitude=0.000000;
        setUserLocation({ latitude, longitude });
        console.error('Error getting user location:', error);
        setError('Error getting user location. Please try again.');
      }
    }
    // If geolocation is not supported by the user's browser
    else {
      console.error('Geolocation is not supported by this browser.');
      setError('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    if (userLocation) {
      api.post(`/userid/${id}/apply`, { id: id, latitude: userLocation.latitude, longitude: userLocation.longitude })
        .then((response) => {
          console.log(response.data)
          if (response.data == "-1") {
            setAuth(-1);
          } else {
            console.log(response.data);
            setBloodBanks(response.data);
            setAuth(0);
          }
        })
        .catch((error) => {
          console.error('Error making post request:', error);
        });
    }
  }, [userLocation, id]);

  // Return an HTML page for the user to check their location
  if (auth == 0 ) {
    return (
     
      <div>
        {
          bloodBanks.length==0 && (
            <Loader/>
          )
        }
        <TopNav />
        <div className="container-background">
          {bloodBanks.map((bloodBank, index) => (
            <Cards
              distance={bloodBank.distance}
              key={index}
              id={id}
              bid={bloodBank.id}
              name={bloodBank.Name}
              address={bloodBank.address}
            />
          ))}
        </div>
      </div>
    );
  } 
  
  else {
    return (
      <h4>You aren't authorized</h4>
    );
  }
}

export default ApplyDonor;
