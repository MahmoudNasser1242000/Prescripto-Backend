import {Router} from "express"
import protectAuth from "../../middlewares/ProtectAuth.js";
import checkUserEmail from "../../middlewares/checkUserEmail.js";
import checkDoctorEmail from "../../middlewares/checkDoctorEmail.js";
import { addUserManager, getAllManagers, getAllusers, getSprcificUser } from "./users.controller.js";
import roleAccess from "../../middlewares/roleAccess.js";
import filesUpload from "../../../services/filesUpload.js";

const userRouter = Router();

userRouter.get("/getAllManagers", protectAuth, roleAccess("manager"), getAllManagers)

userRouter.route("/")
    .post(protectAuth, roleAccess("manager"), filesUpload("mangers").single("image"), checkUserEmail, checkDoctorEmail, addUserManager)
    .get(protectAuth, roleAccess("manager"), getAllusers)

userRouter.route("/:userId")
    .get(protectAuth, roleAccess("manager", "doctor"), getSprcificUser)

export default userRouter;