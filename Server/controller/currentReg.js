import express from 'express'
import authenticateToken from '../middlewares/tokenAuth.js';
const currentReg=express.Router()
currentReg.post('/userid/:id/currentReg',authenticateToken,async(req,res)=>{
    const db=req.db
    const query=req.query;
    const result =req.body;
    const id=result.id;
    try{
        if(req.user && req.user.userid==id){
            console.log("u r in")
            console.log("currentReg")
            const rows=await query(`select * from users u,BloodBank B,userReg uR where uR.userid=${id} and u.id=${id} and B.id=uR.bankid`);
            
            
            
            res.send(rows);
        }
        else{
            console.log("you r out");
            res.send("-1")
        }
    }
    catch(err){
        console.log(err);
    }
})
export default currentReg;