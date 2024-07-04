import express from 'express';
import multer from 'multer';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

dotenv.config();

const signuprouter = express();

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, '../uploads/');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const phone = req.body.phone;
        const fileExt = path.extname(file.originalname);
        const newFilename = `${phone}${fileExt}`;
        cb(null, newFilename);
    }
});

const upload = multer({ storage: storage });

signuprouter.post('/signup', upload.single('file'), async (req, res) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    
    const result = req.body;
    console.log(result);
    
    const db = req.db;
    const query = req.query;
    console.log(result.fname);
    console.log(result.lname);
    console.log(result.phone);
    console.log(result.email);
    
    bcrypt.hash(result.password, 10).then(async (hash) => {
        const rows = await query(`SELECT * FROM users WHERE email='${result.email}' OR phone='${result.phone}'`);
        if (rows.length != 0) {
            console.log("User already exists with that email or phone number");
            res.send("-1");
        } else {
            let data = {
                userEmail: result.email,
            };
            const token = jwt.sign(data, jwtSecretKey);
            
            query(`INSERT INTO users (fname, lname, city, pincode, age, email, phone, file, password) VALUES ('${result.fname}', '${result.lname}', '${result.city}', '${result.pincode}', ${result.age}, '${result.email}', '${result.phone}', '../uploads/${result.phone}.pdf', '${hash}')`);
            
            res.cookie('authToken', token, {
                httpOnly: true,
                sameSite: 'none'
            });
            res.send("0");
        }
    })
    .catch((error) => {
        console.log(error);
    });
});

export default signuprouter;
