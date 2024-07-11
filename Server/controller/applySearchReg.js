import { resolveInclude } from 'ejs';
import express from 'express'
import authenticateToken from '../middlewares/tokenAuth.js';
const applySearchReg=express.Router()
import searchResult from '../Arrays/searchResult.js';
applySearchReg.post("/applySearchBank", authenticateToken, async (req, res) => {
    const result = req.body;
    const id = result.id;
    const db = req.db;
    const query = req.query;
    const latitude = result.latitude;
    const longitude = result.longitude;
    
    if (req.user) {
        try {
            const rows = await query(`select * from BloodBank where id=${id}`);
            console.log(rows)
            searchResult=rows;
            res.send(rows); // Send sorted rows back to the client
        } catch (error) {
            
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    } else {
        res.send("-1")
    }
});
export default apply;