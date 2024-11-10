import {Router} from "express"
import protectAuth from "../../middlewares/ProtectAuth.js";
import checkUserEmail from "../../middlewares/checkUserEmail.js";
import checkDoctorEmail from "../../middlewares/checkDoctorEmail.js";
import { addUserManager, getAllManagers, getAllusers, getSpecificUser } from "./users.controller.js";
import roleAccess from "../../middlewares/roleAccess.js";
import filesUpload from "../../../services/filesUpload.js";

const userRouter = Router();

userRouter.get("/getAllManagers", protectAuth, roleAccess("manager"), getAllManagers)

userRouter.route("/")
    .post(protectAuth, roleAccess("manager"), filesUpload("mangers").single("image"), checkUserEmail, checkDoctorEmail, addUserManager)
    .get(protectAuth, roleAccess("manager"), getAllusers)



export default userRouter;