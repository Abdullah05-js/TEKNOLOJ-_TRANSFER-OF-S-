import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MongoURL)
        console.log("mongoDB connected");
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;