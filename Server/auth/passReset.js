import express from 'express'; // Import Express.js framework
import { Router } from 'express'; // Import Router from Express
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const PassResetRouter=express()
PassResetRouter.post('/resetPassword', async (req, res) => {
    const db = req.db;
    const query = req.query;
    const { token, newPassword, confirmPassword } = req.body;
    console.log(token)
    console.log(newPassword)
    console.log(confirmPassword)
    if (!token || !newPassword || !confirmPassword) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ success: false, message: "Passwords do not match." });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.status(400).json({ success: false, message: "Invalid or expired token." });
        }

        const { email } = decoded;

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password in the database
        const query = `UPDATE users SET password = '${hashedPassword}' WHERE email = '${email}'`;
        await db.query(query);

        res.json({ success: true, message: "Your password has been reset successfully." });
    });
});
export default PassResetRouter;