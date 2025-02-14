import express from 'express';
const Resetrouter = express.Router();
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken';
Resetrouter.post('/forgotPassword', async (req, res) => {
    const { email } = req.body;
    console.log(email);
    const db = req.db;
    const query = req.query;
    // Check if the email exists in the database
    const user = await query(`SELECT * FROM users WHERE email='${email}'`);
    if (user.length === 0) {
        return res.json({ success: false, message: "Email not found." });
    }

    // Generate a password reset token (you can use JWT or any other method)
    const resetToken = jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    // Send the reset link to the user's email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "shreyankgbhat@gmail.com",
            pass: "zbyi riiu ricb zwxf",
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Request',
        text: `Click the link below to reset your password:\n\nhttp://localhost:3000/resetPassword?token=${resetToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.json({ success: false, message: "Failed to send email." });
        } else {
            console.log('Email sent: ' + info.response);
            return res.json({ success: true, message: "Password reset link sent to your email." });
        }
    });
});

export default Resetrouter;