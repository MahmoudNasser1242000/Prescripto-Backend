import {Router} from "express"
import { addDoctor, getAllDoctors, updateDoctor } from "./doctors.controller.js";
import checkDoctorEmail from "../../middlewares/checkDoctorEmail.js";
import filesUpload from "../../../services/filesUpload.js";
import checkDoctorId from "../../middlewares/checkDoctorId.js";

const doctorRouter = Router();

doctorRouter.route("/")
    .post(checkDoctorEmail, filesUpload("doctors").single("image"), addDoctor)
    .get(getAllDoctors)

doctorRouter.patch("/:docId", checkDoctorId, checkDoctorEmail, filesUpload("doctors").single("image"), checkDoctorEmail, updateDoctor)

export default doctorRouter;