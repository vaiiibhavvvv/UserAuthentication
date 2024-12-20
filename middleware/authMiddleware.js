import jwt from 'jsonwebtoken';
import {User} from '../models/User.js';

const authMiddleware = async (req,res,next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer','');
        if(!token) {return res.status(401).json({error: 'Authentication required'}); }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        const user = await User.findOne({ _id: decoded.userId});
        if(!user) {
            return res.status(401).json({error: 'Authentication failed'});
        }
        req.user = user;
        req.token = token;
        next();

    } catch (error) {
        res.status(401).json({error: 'Authentication failed'});
    }
};

export default authMiddleware;