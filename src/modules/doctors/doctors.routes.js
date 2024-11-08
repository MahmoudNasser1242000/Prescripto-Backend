import {Router} from "express"
import { addDoctor, deleteDoctor, getAllDoctors, getSpecificDoctor, updateDoctor } from "./doctors.controller.js";
import checkDoctorEmail from "../../middlewares/checkDoctorEmail.js";
import filesUpload from "../../../services/filesUpload.js";
import checkDoctorId from "../../middlewares/checkDoctorId.js";
import schemaValidation from "../../../services/validationSchema.js";
import { addDoctorSchema, doctorIdSchema, updateDoctorSchema } from "./doctors.validation.js";

const doctorRouter = Router();

doctorRouter.route("/")
    .post(filesUpload("doctors").single("image"), schemaValidation(addDoctorSchema), checkDoctorEmail, addDoctor)
    .get(getAllDoctors)

doctorRouter.route("/:docId")
    .patch(filesUpload("doctors").single("image"), schemaValidation(updateDoctorSchema), checkDoctorId, checkDoctorEmail, updateDoctor)
    .delete(schemaValidation(doctorIdSchema), checkDoctorId, deleteDoctor)
    .get(schemaValidation(doctorIdSchema), checkDoctorId, getSpecificDoctor)

export default doctorRouter;