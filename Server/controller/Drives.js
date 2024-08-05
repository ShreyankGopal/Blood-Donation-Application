import express from 'express'
import authenticateToken from '../middlewares/tokenAuth.js';

const drives = express.Router();

drives.post('/regDrive', authenticateToken, async (req, res) => {
    const {  title, description, bloodGroup, bank } = req.body;
    const db = req.db;
    const query = req.query;
    try {
        if (req.user) {
            // Start a transaction
            const userId=req.user.userid;
            await query('START TRANSACTION');

            // Insert into Drives table
            await query(
                'INSERT INTO Drives (title, purpose, bloodGroup, bank) VALUES (?, ?, ?, ?)',
                [title, description, bloodGroup, bank]
            );

            // Retrieve the last inserted drive ID
            const driveResult = await query('SELECT LAST_INSERT_ID() as id');
            const driveId = driveResult[0].id;

            // Insert into userDrives table
            await query(
                'INSERT INTO userDrives (userid, driveid) VALUES (?, ?)',
                [userId, driveId]
            );

            // Commit the transaction
            await query('COMMIT');

            res.status(201).json({ message: 'Drive registered successfully', driveId });
        }

    } catch (error) {
        // Rollback the transaction in case of an error
        await query('ROLLBACK');
        console.error('Error registering drive:', error);
        res.status(500).json({ message: 'Error registering drive' });
    }
});

export default drives;
