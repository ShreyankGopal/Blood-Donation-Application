import { resolveInclude } from 'ejs';
import express from 'express'
import authenticateToken from '../middlewares/tokenAuth.js';
const profile=express.Router()
profile.post("/userid/:id/profile",authenticateToken,async(req,res)=>{
    console.log("profile page")
    const db=req.db
    const query=req.query;
    const result =req.body;
    const id=result.id;
    try{
    if(req.user && req.user.userid==id){
        console.log("u r in")
        console.log("profile page")
        const rows=await query(`select * from users where id=${id}`);
        var profile;
        for(const row of rows){
            profile={
                fname:row.fname,
                lname:row.lname,
                city:row.city,
                pincode:row.pincode,
                email:row.email,
                phone:row.phone,
                age:row.age
            }
        }
        res.send(profile);
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
export default profile