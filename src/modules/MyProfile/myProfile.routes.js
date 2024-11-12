import {Router} from "express"
import { deleteMyProfile, getMyProfile, updateMyDoctorProfile, updateMyManagerProfile, updateMyUserProfile } from "./myProfile.controller.js";
import roleAccess from "../../middlewares/roleAccess.js";
import protectAuth from "../../middlewares/ProtectAuth.js";
import filesUpload from "../../../services/filesUpload.js";
import schemaValidation from "../../../services/validationSchema.js";
import { updateDoctorProfileSchema, updateUserORMmanagerProfileSchema } from "./myProfile.validation.js";

const myProfileRouter = Router();

myProfileRouter.use(protectAuth)

myProfileRouter.patch("/updateDoctorProfile", roleAccess("doctor"), filesUpload("doctors").single("image"), schemaValidation(updateDoctorProfileSchema), updateMyDoctorProfile)
myProfileRouter.patch("/updateUserProfile", roleAccess("user"), filesUpload("doctors").single("image"), schemaValidation(updateUserORMmanagerProfileSchema), updateMyUserProfile)
myProfileRouter.patch("/updateManagerProfile", roleAccess("super-manager", "manager"), filesUpload("doctors").single("image"), schemaValidation(updateUserORMmanagerProfileSchema), updateMyManagerProfile)
    
myProfileRouter.route("/")
    .get(getMyProfile)
    .delete(roleAccess("user"), deleteMyProfile)
export default myProfileRouter;