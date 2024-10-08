import express, { response } from 'express'
import authenticateToken from '../middlewares/tokenAuth.js';
import axios from 'axios'
const drives = express.Router();

drives.post('/regDrive', authenticateToken, async (req, res) => {
    const {  title, description, bloodGroup, bank } = req.body;
    const db = req.db;
    const query = req.query;
    async function testForSpam(description) {
        const data = {
            "checkForLength": true,
            "content": description,
            "allowedLanguages": ["en"]
        };
    
        try {
            const response = await axios.post(
                "https://api.oopspam.com/v1/spamdetection",
                data,
                {
                    headers: {
                        "content-type": "application/json",
                        "X-Api-Key": "0WPQEZXEtCst16kBRj6B3KAdhYYWENJzh508JOSM"
                    }
                }
            );
            
            console.log(response.data);
            console.log(response.data.Score);
            
            // Return -1 if the Score is greater than 3, otherwise return 0
            return response.data.Score > 3 ? -1 : 0;
            
        } catch (error) {
            console.error("Request failed:", error);
            // Return -1 or another value to indicate an error if needed
            return -1;
        }
    }
    
    async function sendDriveEmail(userId, driveId) {
        try {
            const users = await query('SELECT email, fname FROM users WHERE id != ?', [userId]);

            const transporter = req.transporter; // Assuming transporter is initialized in middleware or app level
            console.log(users.length)

            users.forEach(user => {
                const mailOptions = {
                    from: 'shreyank@example.com',
                    to: user.email,
                    subject: 'New Blood Donation Drive Launched',
                    html: `<p>Hello ${user.fname},</p>
                           <p>Someone has launched a drive and is in need of blood. Please check it out.</p>
                           <p>Title: ${title}</p>
                           <p>Description: ${description}</p>
                           <p>Blood Group: ${bloodGroup}</p>
                           <p>Bank: ${bank}</p>`
                           
                };

                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        console.error('Error sending email to', user.email, ':', err);
                    } else {
                        console.log('Email sent to', user.email, ':', info.response);
                    }
                });
            });
        } catch (error) {
            console.error('Failed to send registration emails:', error);
        }
    }
    try {
        if(await testForSpam(description)==0){
            console.log("applied function for spam detection")
        if (req.user) {
            // Start a transaction
            const userId=req.user.userid;
            await query('START TRANSACTION');
            const date = new Date();
            const formattedDate = date.toISOString().split('T')[0];
            // Insert into Drives table
            await query(
                'INSERT INTO Drives (title, purpose, bloodGroup, bank, Date) VALUES (?, ?, ?, ?,?)',
                [title, description, bloodGroup, bank,formattedDate]
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
            // send a mail to all other users with pushnotif on here showing the drive has been registered 
            sendDriveEmail(userId,driveId);
            res.status(201).json({ message: 'Drive registered successfully', driveId });
        }
    }
    else{
        console.log("caught in spam")
        res.send("spam")
    }

    } catch (error) {
        // Rollback the transaction in case of an error
        await query('ROLLBACK');
        console.error('Error registering drive:', error);
        res.status(500).json({ message: 'Error registering drive' });
    }
});

export default drives;
