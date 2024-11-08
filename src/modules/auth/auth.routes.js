import {Router} from "express"
import { signup } from "./auth.controller.js";
import checkUserEmail from "../../middlewares/checkUserEmail.js";
import filesUpload from "../../../services/filesUpload.js";

const authRouter = Router();

authRouter.post("/signup", filesUpload("users").single("image"), checkUserEmail, signup)

export default authRouter;