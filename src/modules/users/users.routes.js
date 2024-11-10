import {Router} from "express"
import protectAuth from "../../middlewares/ProtectAuth.js";
import checkUserEmail from "../../middlewares/checkUserEmail.js";
import checkDoctorEmail from "../../middlewares/checkDoctorEmail.js";
import { addUserManager } from "./users.controller.js";
import roleAccess from "../../middlewares/roleAccess.js";
import filesUpload from "../../../services/filesUpload.js";

const userRouter = Router();

userRouter.route("/")
    .post(protectAuth, roleAccess("manager"), filesUpload("users").single("image"), checkUserEmail, checkDoctorEmail, addUserManager)

userRouter.route("/:userId")

export default userRouter;