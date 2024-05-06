import { Router } from "express";
import CloudinaryController from "../controllers/cloudinaryController";
import { authCheck } from "../middleware/authMiddleware";

const router = Router();

// router.post(
//   "/createOrUpdateUser",
//   authCheck,
//   UserController.createOrUpdateUser
// );
// router.post("/currentUser", authCheck, UserController.currentUser);
// router.get("/currentUser/:id", UserController.getUser);
router.post("/uploadimages", CloudinaryController.uploadImage);

export default router;
