import { Router } from 'express'
import UserController from '../controllers/userController'
import {authCheck} from '../middleware/authMiddleware'

const router = Router();



router.post("/createNewUser", authCheck, UserController.createNewUser);
router.post("/currentUser", authCheck, UserController.currentUser);
router.get("/currentUser/:id", UserController.getUser);
 

export default router;