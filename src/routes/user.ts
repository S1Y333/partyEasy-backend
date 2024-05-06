import { Router } from "express";
import UserController from "../controllers/userController";
import { authCheck } from "../middleware/authMiddleware";
// import multer from 'multer';
import fileUpload from "../middleware/file-upload";

const router = Router();

// const upload = multer({ dest:'uploads/'})

router.post("/createNewUser", fileUpload.single('avatar'), authCheck, UserController.createNewUser);
router.post("/currentUser", authCheck, UserController.currentUser);
// router.get("/currentUser/:id", UserController.getUser);

export default router;
