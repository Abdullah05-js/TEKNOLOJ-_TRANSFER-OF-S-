import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://kkii123:kkii123@cluster0.bge3c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("mongoDB connected");
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;