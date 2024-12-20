import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {User} from '../models/User.js';

const generateToken = (userId,role) => {
    return jwt.sign(
        {userId,role},
        process.env.JWT_SECRET
    );
};

// User registeration

const register = async(req,res) =>{
    try {
        const { username, email,password,role} = req.body;
        const existingUser = await User.findOne({$or: [{email},{username}]});
        if(existingUser){
            return res.status(409).json({
                error: 'Registration failed',
                details: 'User already exists'
            });
        }

         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(password,salt);

         
        const newUser = new User({username,
            email,
            password:hashedPassword,
            role:role || 'user'
        });
        await newUser.save();
        const token = generateToken(newUser._id, newUser.role);

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role
            }
        });
    } 
    catch (error) {
        res.status(500).json({error: 'Serve error'});
    }

// User Login

const login = async(req,res) => {
    try {
        const {email,password} = req.body;
        const user =  await User.findOne({email});
        if(!user){
            return res.status(401).json({error:'login failed'});

        }

        const validPassword = await bcrypt.compare(password,user.password);
        if(!validPassword){
            return res.status(401).json({error:'Login failed'});
        }

    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user._id,user.role);

    res.json({
        message: 'Login successful',
        token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            lastLogin: user.lastLogin
        }
    });

    } catch (error) {
        res.status(500).json({error:'Server error'});
    }
};

}

const getUserProfile = async (req,res) => {
    try {
        const {_id,username,email,role,lastLogin} = req.user;
        res.json({
            id: _id,
            username,
            email,
            role,
            lastLogin
        });
    } catch (error) {
        res.status(500).json({error:'Profile retrieval failed'});
    }
};

const updateProfile = async (req,res) => {
    try {
        
        const {username} = req.body;
        
        if(!username){
            return res.status(400).json({error:'Validation failed'});
        }

        const user = await User.findByIdAndUpdate(
            req.user._id,
            {username},
            {new:true, runValidators: true}
        );

        res.json({
            message: 'Profile updated successfully',
            user: {
                 id: user._id,
                 username: user.username,
                 email: user.email,
                 role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({error:'Profile update failed'});
    }
}

export default {register,login,getUserProfile,updateProfile};