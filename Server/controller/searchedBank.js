import express from "express";
import authenticateToken from "../middlewares/tokenAuth.js";

const searchedBank=express.Router();
searchedBank.post('/:bid/showbanks',authenticateToken,(req,res)=>{
    function haversineDistance(lat1, lon1, lat2, lon2) {
        const toRad = (value) => (value * Math.PI) / 180;
        const R = 6371; // Earth's radius in kilometers
    
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in kilometers
    }
    console.log("search bank page");
    const result=req.body;
    console.log(result)
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
            for (const row of results) {
                row.distance = haversineDistance(result.latitude, result.longitude, row.latitude, row.longitude);
                row.userid=req.user.userid;
            }
            
    
            res.send(results);
        });
    }
})
export default searchedBank;