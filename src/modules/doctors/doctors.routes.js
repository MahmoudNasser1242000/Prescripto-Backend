import {Router} from "express"
import { addDoctor, getAllDoctors } from "./doctors.controller.js";
import checkDoctorEmail from "../../middlewares/checkDoctorEmail.js";
import filesUpload from "../../../services/filesUpload.js";

const doctorRouter = Router();

doctorRouter.route("/")
    .post(checkDoctorEmail, filesUpload("doctors").single("image"), addDoctor)
    .get(getAllDoctors)

export default doctorRouter;