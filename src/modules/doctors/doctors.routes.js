import {Router} from "express"
import { addDoctor } from "./doctors.controller.js";
import checkDoctorEmail from "../../middlewares/checkDoctorEmail.js";
import filesUpload from "../../../services/filesUpload.js";

const doctorRouter = Router();

doctorRouter.post("/", filesUpload("doctors").single("image"), checkDoctorEmail, addDoctor)

export default doctorRouter;