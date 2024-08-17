import express from 'express';
import authenticateToken from '../middlewares/tokenAuth.js';
const driveDetails = express.Router();
driveDetails.get('/getYourDrives/:id',authenticateToken,async (req,res)=>{
    const {id}=req.params;
    const db=req.db;
    const query=req.query;
    if(req.user){
        const userid=req.user.userid;
        console.log(userid);
        try {
            const drives = await query(
                `SELECT *
                 FROM Drives
                 
                 WHERE id = ?`,
                [id]
            );
            
            res.send(drives);
        } catch (error) {
            console.error('Error fetching drives:', error);
            res.status(500).json({ message: 'Error fetching drives' });
        }
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
    }
)
export default driveDetails;