import { Router } from "express";
import PackageController from "../controllers/packageController";
import { authCheck } from "../middleware/authMiddleware";

const router = Router();

router.post("/createNewPackage", PackageController.createNewPackage);
router.get("/", PackageController.fetchAllPackages);
router.get("/:userId", authCheck, PackageController.fetchPackagesByUser);

export default router;
