import {Router} from "express"
import { changeDoctorPassword, changeUserPassword, deleteMyProfile, getMyProfile, updateMyDoctorProfile, updateMyManagerProfile, updateMyUserProfile } from "./myProfile.controller.js";
import roleAccess from "../../middlewares/roleAccess.js";
import protectAuth from "../../middlewares/ProtectAuth.js";
import filesUpload from "../../../services/filesUpload.js";
import schemaValidation from "../../../services/validationSchema.js";
import { chanagePasswordSchema, updateDoctorProfileSchema, updateUserORMmanagerProfileSchema } from "./myProfile.validation.js";
import checkUpdatedEmail from "../../middlewares/checkUpdatedEmail.js";

const myProfileRouter = Router();

myProfileRouter.use(protectAuth)

myProfileRouter.patch("/updateDoctorProfile", roleAccess("doctor"), filesUpload("doctors").single("image"), schemaValidation(updateDoctorProfileSchema), checkUpdatedEmail, updateMyDoctorProfile)
myProfileRouter.patch("/updateUserProfile", roleAccess("user"), filesUpload("users").single("image"), schemaValidation(updateUserORMmanagerProfileSchema), checkUpdatedEmail, updateMyUserProfile)
myProfileRouter.patch("/updateManagerProfile", roleAccess("super-manager", "manager"), filesUpload("managers").single("image"), schemaValidation(updateUserORMmanagerProfileSchema), checkUpdatedEmail, updateMyManagerProfile)
    
myProfileRouter.patch("/changeDoctorPassword", roleAccess("doctor"), schemaValidation(chanagePasswordSchema), changeDoctorPassword)
myProfileRouter.patch("/changeUserPassword", roleAccess("super-manager", "manager", "user"), schemaValidation(chanagePasswordSchema), changeUserPassword)

myProfileRouter.route("/")
    .get(getMyProfile)
    .delete(roleAccess("user"), deleteMyProfile)
export default myProfileRouter;