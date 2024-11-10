import {Router} from "express"
import protectAuth from "../../middlewares/ProtectAuth.js";
import checkUserEmail from "../../middlewares/checkUserEmail.js";
import checkDoctorEmail from "../../middlewares/checkDoctorEmail.js";
import { addUserManager, deleteUser, getAllManagers, getAllusers, getSprcificUser, updateUser } from "./users.controller.js";
import roleAccess from "../../middlewares/roleAccess.js";
import filesUpload from "../../../services/filesUpload.js";
import checkUserId from "../../middlewares/checkUserId.js";

const userRouter = Router();

userRouter.get("/getAllManagers", protectAuth, roleAccess("manager"), getAllManagers)

userRouter.route("/")
    .post(protectAuth, roleAccess("manager"), filesUpload("managers").single("image"), checkUserEmail, checkDoctorEmail, addUserManager)
    .get(protectAuth, roleAccess("manager"), getAllusers)

userRouter.route("/:userId")
    .get(protectAuth, roleAccess("manager", "doctor"), checkUserId, getSprcificUser)
    .delete(protectAuth, roleAccess("manager"), checkUserId, deleteUser)
    .patch(protectAuth, roleAccess("manager"), checkUserId, updateUser)
    
export default userRouter;