import React from 'react';
import parse from 'html-react-parser';

export default function MyEmail(props) {
  const emailContent = `
    <div>
      <p>Hello ${props.fname} ${props.lname},</p>
      <p>You have Successfully registered to blood donation at ${props.branch}. You can view the regostration details in the website</p>
    </div>
  `;

  return (
    <div>
      {parse(emailContent)}
    </div>
  );
}