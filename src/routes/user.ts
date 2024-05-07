import { Router } from "express";
import UserController from "../controllers/userController";
import { authCheck } from "../middleware/authMiddleware";
import fileUpload from "../middleware/file-upload";

const router = Router();

router.post("/createNewUser", fileUpload.single('avatar'), UserController.createNewUser);
router.post("/currentUser", authCheck, UserController.currentUser);


export default router;
