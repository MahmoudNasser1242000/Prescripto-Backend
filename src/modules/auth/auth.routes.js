import {Router} from "express"
import { signin, signup } from "./auth.controller.js";
import checkUserEmail from "../../middlewares/checkUserEmail.js";
import filesUpload from "../../../services/filesUpload.js";
import checkDoctorEmail from "../../middlewares/checkDoctorEmail.js";

const authRouter = Router();

authRouter.post("/signup", filesUpload("users").single("image"), checkUserEmail, checkDoctorEmail, signup)
authRouter.post("/signin", signin)

export default authRouter;