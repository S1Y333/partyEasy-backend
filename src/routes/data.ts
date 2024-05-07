import { Router } from "express";
import DataController from "../controllers/dataController";

const router = Router();

router.get("/venue", DataController.refreshVenueData);


export default router;