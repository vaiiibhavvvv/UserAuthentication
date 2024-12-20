import mongoose from "mongoose";
import dotenv from 'dotenv';
import {} from '../.env'
dotenv.config();

// Establish connection with mongodb database and handles database connection errors and provides centralized database connection method

// const MONGODB_URI = process.env.MONGODB_URI;



const connectDB = async () =>{
    try {
        // await mongoose.connect(MONGODB_URI,{
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        // });
        /////////////////////////////////////////////////////////
        await mongoose.connect("mongodb://localhost:",{
            useNewUrlParser: true,
            useUnifiedTopology: true,

            // await mongoose.connect(process.env.MONGODB_URI,{
            //     useNewUrlParser: true,
            //     useUnifiedTopology: true,
        });
        console.log(`MongoDB connected successfully`);
    } catch (error) {
        console.log(`MongoDB connection error ${error.message}`);
        process.exit(1);
    }
};

export {connectDB};

