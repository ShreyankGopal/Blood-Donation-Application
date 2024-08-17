import express from 'express';
import authenticateToken from '../middlewares/tokenAuth.js';

const findDrives = express.Router();

findDrives.get('/find-drives', async (req, res) => {
    const db = req.db;
    const query = req.query;

    try {
      
            const driveResult = await query('SELECT * FROM Drives');
            
            res.status(200).json(driveResult);
        
    } catch (error) {
        console.error('Error fetching drives:', error);
        res.status(500).json({ message: 'Error fetching drives' });
    }
});

export default findDrives;
