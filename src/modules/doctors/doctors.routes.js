import {Router} from "express"
import { addDoctor, deleteDoctor, getAllDoctors, getSpecificDoctor, updateDoctor } from "./doctors.controller.js";
import checkDoctorEmail from "../../middlewares/checkDoctorEmail.js";
import filesUpload from "../../../services/filesUpload.js";
import checkDoctorId from "../../middlewares/checkDoctorId.js";

const doctorRouter = Router();

doctorRouter.route("/")
    .post(checkDoctorEmail, filesUpload("doctors").single("image"), addDoctor)
    .get(getAllDoctors)

doctorRouter.route("/:docId")
    .patch(checkDoctorId, checkDoctorEmail, filesUpload("doctors").single("image"), checkDoctorEmail, updateDoctor)
    .delete(checkDoctorId, deleteDoctor)
    .get(checkDoctorId, getSpecificDoctor)

export default doctorRouter;