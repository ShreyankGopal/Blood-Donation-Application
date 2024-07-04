
import express from 'express'
import authenticateToken from '../middlewares/tokenAuth.js';

const applicationRoute=express.Router()
applicationRoute.post('/userid/:id/apply/bankid/:bankid/application',authenticateToken,async(req,res)=>{
    console.log("entered the application route");
    console.log(req.body)

    const result=req.body;
    const id=result.id;
    const bankid=result.bankid;
    const query=req.query;
    const db=req.db;
    try {
        if(req.user && req.user.userid==id){

            const userRegRow=await query(`select * from userReg where userid=${id} and bankid=${bankid}`)
            console.log(userRegRow.length);
            if(userRegRow.length>0){
                res.send("applied");
                
            }
            else{
                const rows=await query(`select Name from BloodBank where id=${bankid}`)
                const userdata=await query(`select * from users where id=${id}`)
                
                const data=[rows[0],userdata[0]];
                res.send(data); 
            }


        }
        else{
            res.send("-1");
        }
        
    } catch (error) {
        console.log("duplicate entry");
        res.send("applied");
    }

})
export default applicationRoute;