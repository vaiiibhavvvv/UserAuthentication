// import express from 'express';
// import jwt from'jsonwebtoken';
// import bcrypt from 'bcrypt';
// import User from '../models/User';

// const router = express.Router();
// const key = "secretkey";

// // Register user
// router.post('/register',async (req , res) =>{
//     const {email, password, role} = req.body;
//     try {
//         const user = new User({email, password, role});
//         await user.save();
//         res.status(201).json({message : 'User registered successfully.'})
//     } catch (error) {
//         res.status(400).json({error: error.message});
//     }
// });

// // Login user
// router.post('/login',async(req,res) =>{
//     const {email,password} = req.body;
//     try {
//         // check if user exist
//         const user = await User.findOne({email});
//         if(!user) return res.status(404).json({error: "User not found"});

//        // Validate password
//         const isMatch = await bcrypt.compare(password,user.password);
//         if(!isMatch) return res.status(401).json({error: "invalid credentials"});
        
//         //generate token
//         const token = jwt.sign({id: user._id, role: user.role}, key || process.env.JWT_SECRET,{expiresIn:'1h'});
//         res.status(200).json({message:'login successful',token});

//     } catch (error) {
//         res.status(500).json({message: 'Error logging in', error: error.message});
//     }
// });

// // Protected routes
// router.get('/profile',authenticateToken,(req,res)=>{
//     res.json({message: 'Welcome to user profile',user: req.user})
// });

import express from 'express';
import {register,login,getUserProfile,updateUserProfile} from '../controllers/authController.js';
import {authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public Routes
router.post('/register',register);
router.post('/login',login);

// Protected routes 
router.get('/profile',authMiddleware,getUserProfile);
router.put('/profile',authMiddleware,updateUserProfile);

//Admin-only Routes
router.get('/admin',authMiddleware,(req,res) => {
    res.json({message: 'Admin access granted', user: req.user});
});