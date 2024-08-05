import express from 'express'
import authenticateToken from '../middlewares/tokenAuth.js';
const banksToDonate=express.Router()
banksToDonate.get('/banksToDonate',async (req,res)=>{
    console.log("entered drive route")
    const db=req.db
    const query=req.query;
    try{
        
            console.log("u r in")
            console.log("Drives")
            const rows=await query(`select * from BloodBank`);
            console.log(rows);
            
            
            res.send(rows);
        
        
            
    }
    catch(err){
        console.log(err);
        res.sendStatus.send(500);
    }
})
export default banksToDonate;