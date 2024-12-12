import {Router} from "express"
import protectAuth from "../../middlewares/ProtectAuth.js";
import checkUserEmail from "../../middlewares/checkUserEmail.js";
import checkDoctorEmail from "../../middlewares/checkDoctorEmail.js";
import { addUserManager, deleteUser, getAllusers, getSpecificUser, updateUser } from "./users.controller.js";
import roleAccess from "../../middlewares/roleAccess.js";
import filesUpload from "../../../services/filesUpload.js";
import checkUserId from "../../middlewares/checkUserId.js";
import schemaValidation from "../../../services/validationSchema.js";
import { addUserSchema, updateUserSchema, userIdSchema } from "./users.validation.js";
import appointmentRouter from "../appointments/appointments.routes.js";
import protectSuperManager from "../../middlewares/protectSuperManager.js";

const userRouter = Router();

userRouter.use(protectAuth)

userRouter.use("/:userId/appointments", roleAccess("super-manager", "manager"), schemaValidation(userIdSchema), checkUserId, appointmentRouter)

userRouter.route("/")
    .post(roleAccess("super-manager", "manager"), filesUpload("managers").single("image"), schemaValidation(addUserSchema), checkUserEmail, checkDoctorEmail, addUserManager)
    .get(roleAccess("super-manager", "manager"), getAllusers)

userRouter.route("/:userId")
    .get(roleAccess("super-manager", "manager"), schemaValidation(userIdSchema), checkUserId, getSpecificUser)
    .delete(roleAccess("super-manager", "manager"), schemaValidation(userIdSchema), checkUserId, protectSuperManager, deleteUser)
    .patch(roleAccess("super-manager", "manager"), schemaValidation(updateUserSchema), checkUserId, protectSuperManager, updateUser)
    
export default userRouter;