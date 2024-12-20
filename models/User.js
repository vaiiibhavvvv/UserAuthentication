import mongoose from "mongoose";

// Define the structure of user data in the database and cretes the blueprint for user document and provides validatoin and constraints for user information


const UserSchema = new mongoose.Schema({
    username: {type: String, requried: [true,'Username is required'], unique: true},
    email: {type: String, required: [true,'Email is requried'], unique: true, match: [/^\\S+@\\S+\\.\\S+$/,'Please enter a valid email']},
    password: {type: String, requried: true},
    role: {type: String, enum: {value: ['user','admin','moderator'] , message: 'Invalid role'}, default: 'user'},
    isActive: {type: Boolean, default: true},
});

UserSchema.index({username: 1, email: 1},{unique: true});

export default mongoose.model('User', UserSchema);