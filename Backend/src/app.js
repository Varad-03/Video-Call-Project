import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import connectToSocket from "./controller/socketManager.js";

const app = express();
const server = createServer(app);//Connect of Socket and express
const io = connectToSocket(server);//we Connect the io with SocketManager.js

app.set("port", (process.env.PORT || 8000));
app.use(cors());//We import Cors
app.use(express.json({limit : "40kb"}));//here we enter limit because payload 
app.use(express.urlencoded({limit : "40kb" , extended: true}));


const start = async () => {
    const connectionDB = await mongoose.connect("mongodb+srv://Varad:Varad1234@cluster0.jhhvsr3.mongodb.net/test");
    console.log(`MONGO Connected DB Host : ${connectionDB.connection.host}`);//connecting With Mongo 
    server.listen(app.get("port"), () => {
        console.log("LISTENING ON PORT 8000")
    });
}

start();