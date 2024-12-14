import express, { response } from 'express'
import authenticateToken from '../middlewares/tokenAuth.js';
import axios from 'axios'
const qr=express.Router()
qr.post('/Qrscanauth',async(req,res)=>{


    const db = req.db;
    const query = req.query;
    const userid=req.body.userid
    const bankid=req.body.bankid
    console.log(userid);
    console.log(bankid)
    try{
        const rows=await query(`Update userReg set status=1 where userid=${userid} and bankid=${bankid}`)
        res.send("Successful, status updated");
    }
    catch(error){
        console.log(error);
       
    }
})
export default qr