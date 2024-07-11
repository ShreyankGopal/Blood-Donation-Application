import express from "express";
import authenticateToken from "../middlewares/tokenAuth.js";

const searchedBank=express.Router();
searchedBank.post('/showBanks',authenticateToken,(req,res)=>{
    const result=req.body;
    const id=result.id;
    const db=req.db;
    const query=req.query;
    const qry = 'SELECT * FROM BloodBank WHERE id=?';
    if(req.user){
        query(qry, [id], (err, results) => {
            if (err) {
                console.error('Error executing query:', err.stack);
                return res.status(500).send('Error executing query');
            }
    
            res.send(results);
        });
    }
})
export default searchedBank;