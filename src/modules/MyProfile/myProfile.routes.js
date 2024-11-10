import {Router} from "express"
import UpdateUserActivity from "../../../utils/UpdateUserActivity";
import { getMyProfile } from "./myProfile.controller";

const myProfileRouter = Router();

myProfileRouter.use(protectAuth, UpdateUserActivity)
    
myProfileRouter.get("/", getMyProfile)
export default myProfileRouter;