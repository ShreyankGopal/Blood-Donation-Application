import nodemailer from'nodemailer'
import express from 'express'
const sendOTP=express.Router()
sendOTP.post('/sendOTP',(req,res)=>{
    console.log("entered OTP route\n");
    const message = req.body.messageHtml
    console.log(message)
    var transporter=req.transporter;
    var mail = {
        from: "shreyank",
        to: req.body.email,
        subject: 'OTP for email confirmation',
        html: message
      }
      transporter.sendMail(mail, (err, data) => {
        if (err) {
          console.log(err)
          res.send({
            msg: 'fail'
          })
        } else {
          res.send({
            msg: 'success'
          })
        }
      })
})
export default sendOTP;