import {Router} from "express"
import UpdateUserActivity from "../../../utils/UpdateUserActivity";
import { deleteMyProfile, getMyProfile, updateMyDoctorProfile, updateMyManagerProfile, updateMyUserProfile } from "./myProfile.controller";
import roleAccess from "../../middlewares/roleAccess";

const myProfileRouter = Router();

myProfileRouter.use(protectAuth, UpdateUserActivity)

myProfileRouter.patch("/updateDoctorProfile", roleAccess("doctor"), updateMyDoctorProfile)
myProfileRouter.patch("/updateUserProfile", roleAccess("user"), updateMyUserProfile)
myProfileRouter.patch("/updateManagerProfile", roleAccess("manager"), updateMyManagerProfile)
    
myProfileRouter.route("/")
    .get(getMyProfile)
    .delete(roleAccess("user"), deleteMyProfile)
export default myProfileRouter;