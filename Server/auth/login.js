import express from 'express'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config();

const login=express.Router()
login.post('/login',async(req,res)=>{

    const db=req.db;
    const query=req.query

    //console.log(req);
    const result=req.body;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    
    console.log(result.email);
    

    var id=-1;
    const rows=await query(`select * from users where email='${result.email}'`)
    if(rows.length==0){
        console.log("doesnt exist");
        res.send({mesg:"wrong"})

    }
    else{
        var flag=-1;
        let isMatch=false;
        for (const row of rows) {
            const storedHash = row.password;
            
            isMatch = await bcrypt.compare(result.password, storedHash);
            if (isMatch) {
                id=row.id;
                flag=0;
                break;
            }
        }
        if(flag==0){
            let data = {
                userid:id,
                userEmail: result.email,
                
            }
            const token = jwt.sign(data, jwtSecretKey);
            //console.log(token);

            console.log(res.cookie('authToken',token,{
                httpOnly:true,
                sameSite: 'none',
                path: '/',
                secure: true,
               
            }))
            
            res.send({mesg:"success",id});
        }
        else{
            res.send({mesg:"wrong"})
        }

    }
    
})
export default login;