import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectdb = async()=>{
    try{
        const dbConnected = mongoose.connect(`${process.env.DB_URl}/${process.env.DB_NAME}`);
        console.log(`Database server is connected : ${(await dbConnected).connection.host}`)
    }catch(error){
        console.log("Mongodb connection error!", error);
        process.exit(1);
    }
}

export default connectdb

