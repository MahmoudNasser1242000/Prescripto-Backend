import {Router} from "express"
import UpdateUserActivity from "../../../utils/UpdateUserActivity";
import { deleteProfile, getMyProfile } from "./myProfile.controller";
import roleAccess from "../../middlewares/roleAccess";

const myProfileRouter = Router();

myProfileRouter.use(protectAuth, UpdateUserActivity)
    
myProfileRouter.route("/")
    .get(getMyProfile)
    .delete(roleAccess("user"), deleteProfile)
export default myProfileRouter;