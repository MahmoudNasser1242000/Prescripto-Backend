import {Router} from "express"
import { addDoctor, deleteDoctor, getAllDoctors, getSpecificDoctor, updateDoctor } from "./doctors.controller.js";
import checkDoctorEmail from "../../middlewares/checkDoctorEmail.js";
import filesUpload from "../../../services/filesUpload.js";
import checkDoctorId from "../../middlewares/checkDoctorId.js";
import schemaValidation from "../../../services/validationSchema.js";
import { addDoctorSchema, doctorIdSchema, getDoctorSchema, updateDoctorSchema } from "./doctors.validation.js";
import protectAuth from "../../middlewares/ProtectAuth.js";
import roleAccess from "../../middlewares/roleAccess.js";
import appointmentRouter from "../appointments/appointments.routes.js";
import checkActiveExpireDateIsValid from "../../middlewares/checkActiveExpireDateIsValid.js";

const doctorRouter = Router({mergeParams: true});

doctorRouter.use(protectAuth)

doctorRouter.use("/:docId/appointments", roleAccess("super-manager", "manager"), schemaValidation(doctorIdSchema), checkDoctorId, appointmentRouter)

doctorRouter.route("/")
    .post(roleAccess("super-manager", "manager"), filesUpload("doctors").single("image"), schemaValidation(addDoctorSchema), checkDoctorEmail, addDoctor)
    .get(schemaValidation(getDoctorSchema), getAllDoctors)

doctorRouter.route("/:docId")
    .patch(roleAccess("super-manager", "manager"), schemaValidation(updateDoctorSchema), checkDoctorId, checkActiveExpireDateIsValid,  updateDoctor)
    .delete(roleAccess("super-manager", "manager"), schemaValidation(doctorIdSchema), checkDoctorId, deleteDoctor)
    .get(schemaValidation(doctorIdSchema), checkDoctorId, getSpecificDoctor)

export default doctorRouter;