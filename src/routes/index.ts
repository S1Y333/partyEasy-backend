import { Router } from "express";
import user from "../routes/user";
import pack from "../routes/package";
import data from "../routes/data";
import image from "../routes/image";
// import images from "./images";
// import auth from "./auth";
// import video from "./video";
// import system from "./system";
// import chart from "./chart";

const routes = Router();
// routes.use("/user", user);
// routes.use("/images", images);
// routes.use("/auth", auth);
// routes.use("/video", video);
// routes.use("/system", system);
routes.use("/package", pack);
routes.use("/user", user);
routes.use("/data", data);
routes.use("/image", image);

export default routes;
