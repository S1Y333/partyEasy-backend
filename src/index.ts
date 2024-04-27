import dotenv from 'dotenv'
import express, { Express } from "express";
import cors from "cors";
import routes from './routes/index'



const CLIENT_URL = process.env.CLIENT_URL;

dotenv.config()
const SERVER_PORT = process.env.SERVER_PORT || 8080 // Default to 3800 if not specified

export const app: Express = express();

const startSever = async () => {
    try {const corsOptions = {
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      allowedHeaders: ["Content-Type", "authtoken", "Authorization"],
    };

    app.use(cors(corsOptions));
    app.use(express.static("public"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    app.use("/", routes);

    app.listen(SERVER_PORT, () => {
      console.log(`🚀 Server running on ${SERVER_PORT}`);
    });
    } catch (error) {
         console.error(error.stack);
         //res.status(500).send("Something broke!");
    }
}

startSever();


