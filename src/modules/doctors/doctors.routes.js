import {Router} from "express"
import { addDoctor, deleteDoctor, getAllDoctors, getSpecificDoctor, updateDoctor } from "./doctors.controller.js";
import checkDoctorEmail from "../../middlewares/checkDoctorEmail.js";
import filesUpload from "../../../services/filesUpload.js";
import checkDoctorId from "../../middlewares/checkDoctorId.js";
import schemaValidation from "../../../services/validationSchema.js";
import { addDoctorSchema, doctorIdSchema, updateDoctorSchema } from "./doctors.validation.js";
import protectAuth from "../../middlewares/ProtectAuth.js";
import roleAccess from "../../middlewares/roleAccess.js";

const doctorRouter = Router();

doctorRouter.route("/")
    .post(protectAuth, roleAccess("manager"), filesUpload("doctors").single("image"), schemaValidation(addDoctorSchema), checkDoctorEmail, addDoctor)
    .get(protectAuth, getAllDoctors)

doctorRouter.route("/:docId")
    .patch(protectAuth, roleAccess("manager", "doctor"), filesUpload("doctors").single("image"), schemaValidation(updateDoctorSchema), checkDoctorId, checkDoctorEmail, updateDoctor)
    .delete(protectAuth, roleAccess("manager"), schemaValidation(doctorIdSchema), checkDoctorId, deleteDoctor)
    .get(protectAuth, schemaValidation(doctorIdSchema), checkDoctorId, getSpecificDoctor)

export default doctorRouter;