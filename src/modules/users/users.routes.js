import {Router} from "express"
import protectAuth from "../../middlewares/ProtectAuth.js";
import checkUserEmail from "../../middlewares/checkUserEmail.js";
import checkDoctorEmail from "../../middlewares/checkDoctorEmail.js";
import { addUserManager, deleteUser, getAllManagers, getAllusers, getSprcificUser, updateUser } from "./users.controller.js";
import roleAccess from "../../middlewares/roleAccess.js";
import filesUpload from "../../../services/filesUpload.js";
import checkUserId from "../../middlewares/checkUserId.js";
import schemaValidation from "../../../services/validationSchema.js";
import { addUserSchema, updateUserSchema, userIdSchema } from "./users.validation.js";
import UpdateUserActivity from "../../../utils/UpdateUserActivity.js";

const userRouter = Router();

userRouter.use(UpdateUserActivity)

userRouter.get("/getAllManagers", protectAuth, roleAccess("manager"), getAllManagers)

userRouter.route("/")
    .post(protectAuth, roleAccess("manager"), filesUpload("managers").single("image"), schemaValidation(addUserSchema), checkUserEmail, checkDoctorEmail, addUserManager)
    .get(protectAuth, roleAccess("manager"), getAllusers)

userRouter.route("/:userId")
    .get(protectAuth, roleAccess("manager", "doctor"), schemaValidation(userIdSchema), checkUserId, getSprcificUser)
    .delete(protectAuth, roleAccess("manager"), schemaValidation(userIdSchema), checkUserId, deleteUser)
    .patch(protectAuth, roleAccess("manager"), schemaValidation(updateUserSchema), checkUserId, updateUser)
    
export default userRouter;