import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from 'axios'
function QRcodeScanner() {
  useEffect(() => {
    function onScanSuccess(decodedText, decodedResult) {
      // axios.post('/scannSuccess',{})
      // Handle the scanned code as you like
      console.log(`Code matched = `, decodedResult.result);
    }

    function onScanFailure(error) {
      // Handle scan failure, usually better to ignore and keep scanning
      console.warn(`Code scan error = ${error}`);
    }

    let html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 300, height: 300 } },
      /* verbose= */ false
    );
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);

    // Clean up on unmount
    return () => {
      html5QrcodeScanner.clear();
    };
  }, []);

  return <div id="reader"></div>;
}

export default QRcodeScanner;
