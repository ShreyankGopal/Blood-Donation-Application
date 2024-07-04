import React from 'react';
import parse from 'html-react-parser';

export default function OTP(props) {
  const emailContent = `
    <div>
      
      <p>Your OTP ${props.otp}</p>
    </div>
  `;

  return (
    <div>
      {parse(emailContent)}
    </div>
  );
}
