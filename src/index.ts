import dotenv from "dotenv";
import express, { Express } from "express";
import cors from "cors";
import routes from "./routes/index";
import gDB from "./data-source";
import path from "path";
import http from "http";
import { setupSocketIO } from "./helpers/socketio";

const CLIENT_URL = process.env.CLIENT_URL;

dotenv.config();
const SERVER_PORT = process.env.SERVER_PORT || 8080; // Default to 3800 if not specified

export const app: Express = express();

const startSever = async () => {
  try {
    await gDB.initialize();

    const corsOptions = {
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      allowedHeaders: ["Content-Type", "authtoken", "Authorization"],
    };

    app.use(cors(corsOptions));

   
    // app.use(express.static("public"));
    app.use("/uploads", express.static(path.join(__dirname, '../uploads')));
    app.use(express.json());

    app.use(express.urlencoded({ extended: true }));

    app.use("/api", routes);
      // const server = http.createServer(app);
    app.listen(SERVER_PORT, () => {
      console.log(`🚀 Server running on ${SERVER_PORT}`);
    });
  } catch (error) {
    console.error(error.stack);
    //res.status(500).send("Something broke!");
  }
//  const server = http.createServer(app);
  try {
  
    setupSocketIO();
    console.log("Socket.IO has been initialized successfully.");
  } catch (error) {
    console.error(
      "Socket.IO initialization failed: \n",
      error.stack || error.message
    );
  }
};

startSever();
