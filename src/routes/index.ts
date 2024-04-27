import { Router } from "express";
import user from "../routes/user";
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
// routes.use("/chart", chart);
routes.use("/user", user);

export default routes;
