import express from "express";
import connectdb from "./config/db.js";
import bookRoute from "./routes/app.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

//API route
app.use("/save", bookRoute); //http://localhost:${PORT}/save/book

connectdb()
    .then(
        app.listen((process.env.PORT || 8080), () => {
            console.log(`Server Running : http://localhost:${process.env.PORT}`)
        })
    ).catch((error) => {
        console.log("Server connection failed!", error)
    })