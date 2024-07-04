import { resolveInclude } from 'ejs';
import express from 'express'
import authenticateToken from '../middlewares/tokenAuth.js';
const apply=express.Router()

apply.post("/userid/:id/apply", authenticateToken, async (req, res) => {
    const result = req.body;
    const id = result.id;
    const db = req.db;
    const query = req.query;
    const latitude = result.latitude;
    const longitude = result.longitude;
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
    if (req.user && req.user.userid == id) {
        try {
            const rows = await query("select * from BloodBank");
            console.log(rows)
            for (const row of rows) {
                row.distance = haversineDistance(latitude, longitude, row.latitude, row.longitude);
            }

            // Sort rows by distance
            rows.sort((a, b) => a.distance - b.distance);

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