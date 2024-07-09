import express from "express"
import bodyParser from "body-parser";
import cors from "cors"
import util from 'util';
import promisify from "util.promisify";
//import { Router } from "express";
import axios from 'axios'
import applicationRoute from "./controller/applicationRoute.js";
import multer from "multer";
import signuprouter from './auth/signup.js'
import login from "./auth/login.js";
import mysql from 'mysql'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import authenticateToken from "./middlewares/tokenAuth.js";
import cookieParser from 'cookie-parser';
import profile from "./controller/profile.js";
import apply from "./controller/ApplyDonor.js";
import nodemailer from 'nodemailer'
import sendOTP from "./OTP/sendOTP.js";
import currentReg from "./controller/currentReg.js";
import searchBank from "./controller/searchBanks.js";
import searchResult from "./Arrays/searchResult.js";
dotenv.config();

const app=express()
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser())
var transport= {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: "shreyankgbhat@gmail.com",
    pass: "zbyi riiu ricb zwxf",
  }
}
  var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('All works fine, congratz!');
  }
});
var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : process.env.PASS2,
    database : 'BloodDonation',
    port:3306,
    autocommit: true
});
db.connect();
const query = util.promisify(db.query).bind(db);
app.use((req, res, next) => {
    req.db = db;
    req.query = query;
    req.transporter=transporter;
    next();
});//middle ware to share the database conection

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

const upload=multer({dest:"./uploads/"});
const port=5001;
var router=express.Router()
app.use("/",signuprouter)
app.use("/",login)
app.post("/logout",(req,res)=>{
    res.clearCookie('authToken',{path:'/'})
    res.send("logged out")
})
app.get("/userid/:id/home", authenticateToken, (req, res) => {
    const id=req.params.id;
    console.log(id)
    if (req.user && (req.user.userid==id)) {
        console.log("u r in ");
        console.log(req.user.userEmail);
        res.send("0");
    } else {
        console.log("you r out");
        res.send("-1");
    }
});
app.use('/',searchBank);
app.use("/",profile)
app.use('/',applicationRoute)
app.post('/sendApplicationEmail',async(req,res)=>{
  console.log("entered mail route\n");
    const message = req.body.messageHtml
    const id=req.body.id;
    const bankid=req.body.bankid;
    console.log(message)
    var mail = {
        from: "shreyank",
        to: req.body.email,
        subject: 'Registration Details',
        html: message
      }
      try{
        await query(`insert into userReg values(${id},${bankid})`);
      
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
    }
    catch(error){
      console.log("failed to register")
    }
})
app.use('/',currentReg);
app.post("/send_otp",async (req,res)=>{
    try { 
        const mobileNumber = req.body.phone;
        const otp = Math.floor(100000 + Math.random() * 900000);
        const response = await axios.post(`https://www.fast2sms.com/dev/bulk/wallet?authorization=${process.env.SMSKEY}`, {
          params: {
            authorization: process.env.SMSKEY,
            variables_values: `Your OTP is ${otp}`,
            route: 'otp',
            numbers: mobileNumber
          }
        });
        res.send("0");
      } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ success: false, message: 'Failed to send OTP.' });
      
    }
})
app.use("/",apply)
app.use('/',sendOTP)
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
