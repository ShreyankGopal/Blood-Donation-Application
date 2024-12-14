import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import api from "./API/api";
function QRcodeScanner() {
  const [result, setResult] = useState("");
  const [userId, setUserId] = useState(null);
  const [bankId, setBankId] = useState(null);
  const [success, setSuccess] = useState(-1);

  useEffect(() => {
    let html5QrcodeScanner;

    // Function to handle successful scan
    function onScanSuccess(decodedText, decodedResult) {
      console.log(`Code matched = `, decodedResult.result);
      const scannedText = decodedResult.result.text; // Get the scanned string
      setResult(scannedText);
    
      // Process the result string
      const parts = scannedText.split(" "); // Split by space
      let tempUserId = null;
      let tempBankId = null;
    
      parts.forEach((part) => {
        if (part.toLowerCase().includes("userid:")) {
          tempUserId = parseInt(part.split(":").pop()); // Extract and convert userId
        }
        if (part.toLowerCase().includes("branchid:")) {
          tempBankId = parseInt(part.split(":").pop()); // Extract and convert bankId
        }
      });
    
      setUserId(tempUserId);
      setBankId(tempBankId);
      setSuccess(0);
    
      // Close the camera
      if (html5QrcodeScanner) {
        html5QrcodeScanner.clear();
      }
    
      console.log(bankId + " " + userId);
      api.post("/Qrscanauth", { userid: tempUserId, bankid: tempBankId })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // Function to handle failed scan
    function onScanFailure(error) {
      console.warn(`Code scan error = ${error}`);
    }

    // Initialize the scanner only once
    html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: { width: 300, height: 300 },
      },
      /* verbose= */ false
    );

    // Render the QR code scanner
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);

    // Clean up on unmount
    return () => {
      if (html5QrcodeScanner) {
        html5QrcodeScanner.clear(); // This will stop the camera and remove the scanner
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <div>
      <div id="reader" style={{ margin: "auto" }}></div>
      {success !== -1 && (
        <div style={{ borderRadius: '20px' }}>
          <p>Result: {result}</p>
          <p>User ID: {userId !== null ? userId : "Not Found"}</p>
          <p>Bank ID: {bankId !== null ? bankId : "Not Found"}</p>
        </div>
      )}
    </div>
  );
}

export default QRcodeScanner;
