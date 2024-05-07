import { Router } from "express";
import user from "../routes/user";
import pack from "../routes/package";
import data from "../routes/data";

const routes = Router();

routes.use("/package", pack);
routes.use("/user", user);
routes.use("/data", data);

export default routes;