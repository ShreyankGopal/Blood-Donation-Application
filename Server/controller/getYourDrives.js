import express from 'express';
import authenticateToken from '../middlewares/tokenAuth.js';
const yourDrives = express.Router();
yourDrives.get('/getYourDrives',authenticateToken,async (req,res)=>{
    const db=req.db;
    const query=req.query;
    if(req.user){
        const userid=req.user.userid;
        try {
            const drives = await query(
                `SELECT Drives.*
                 FROM Drives
                 JOIN userDrives ON Drives.id = userDrives.driveid
                 WHERE userDrives.userid = ?`,
                [userid]
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
export default yourDrives;