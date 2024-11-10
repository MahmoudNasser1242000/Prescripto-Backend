import {Router} from "express"
import protectAuth from "../../middlewares/ProtectAuth.js";
import checkUserEmail from "../../middlewares/checkUserEmail.js";
import checkDoctorEmail from "../../middlewares/checkDoctorEmail.js";
import { addUserManager, deleteUser, getAllManagers, getAllusers, getSpecificUser, updateUser } from "./users.controller.js";
import roleAccess from "../../middlewares/roleAccess.js";
import filesUpload from "../../../services/filesUpload.js";
import checkUserId from "../../middlewares/checkUserId.js";
import schemaValidation from "../../../services/validationSchema.js";
import { addUserSchema, updateUserSchema, userIdSchema } from "./users.validation.js";
import UpdateUserActivity from "../../../utils/UpdateUserActivity.js";

const userRouter = Router();

userRouter.use(protectAuth)

userRouter.get("/getAllManagers", roleAccess("manager"), getAllManagers)

userRouter.route("/")
    .post(roleAccess("manager"), filesUpload("managers").single("image"), schemaValidation(addUserSchema), checkUserEmail, checkDoctorEmail, addUserManager)
    .get(roleAccess("manager"), getAllusers)

userRouter.route("/:userId")
    .get(roleAccess("manager", "doctor"), schemaValidation(userIdSchema), checkUserId, getSpecificUser)
    .delete(roleAccess("manager"), schemaValidation(userIdSchema), checkUserId, deleteUser)
    .patch(roleAccess("manager"), schemaValidation(updateUserSchema), checkUserId, updateUser)
    
export default userRouter;