import express from 'express';
import {connectDB} from './config/database.js';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';

dotenv.config();

connectDB();
const app = express();

app.use(cors()); // Enable CORS
app.use(express.json()); //Parse json bodies
app.use(express.urlencoded({extended:true})); //Parse url

const PORT = 3000 || process.env.PORT;

// Essential middleware

app.get('/',(req,res)=>{
    const message = req.query.message || 'Hello';
    res.send(`<h1>${message}</h1> `);
});

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});

