import {Router} from "express"
import { signin, signup } from "./auth.controller.js";
import checkUserEmail from "../../middlewares/checkUserEmail.js";
import filesUpload from "../../../services/filesUpload.js";
import checkDoctorEmail from "../../middlewares/checkDoctorEmail.js";
import schemaValidation from "../../../services/validationSchema.js";
import { signinSchema, signupSchema } from "./auth.validation.js";

const authRouter = Router();

authRouter.post("/signup", filesUpload("users").single("image"), schemaValidation(signupSchema), checkUserEmail, checkDoctorEmail, signup)
authRouter.post("/signin", schemaValidation(signinSchema), signin)

export default authRouter;