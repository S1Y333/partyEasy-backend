import { Router } from "express";
import PackageController from "../controllers/packageController";
import { authCheck } from "../middleware/authMiddleware";

const router = Router();

router.post("/createNewPackage", authCheck, PackageController.createNewPackage);
router.get("/", PackageController.fetchAllPackages);
router.get("/:packageId", PackageController.fetchPackageByPackageId);
router.post("/userPackage", authCheck, PackageController.fetchPackagesByUser);
router.post("/like/:packageId", authCheck, PackageController.likeOnePackage);
//
export default router;
