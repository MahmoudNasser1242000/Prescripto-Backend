import {Router} from "express"
import { addDoctor, deleteDoctor, getAllDoctors, getSpecificDoctor, updateDoctor, updateDoctorExamination_dates } from "./doctors.controller.js";
import checkDoctorEmail from "../../middlewares/checkDoctorEmail.js";
import filesUpload from "../../../services/filesUpload.js";
import checkDoctorId from "../../middlewares/checkDoctorId.js";
import schemaValidation from "../../../services/validationSchema.js";
import { addDoctorSchema, doctorIdSchema, getDoctorSchema, updateDoctorDatesSchema, updateDoctorSchema } from "./doctors.validation.js";
import protectAuth from "../../middlewares/ProtectAuth.js";
import roleAccess from "../../middlewares/roleAccess.js";
import appointmentRouter from "../appointments/appointments.routes.js";
import checkActiveExpireDateIsValid from "../../middlewares/checkActiveExpireDateIsValid.js";
import checkUserEmail from "../../middlewares/checkUserEmail.js";

const doctorRouter = Router({mergeParams: true});

doctorRouter.use(protectAuth)

doctorRouter.use("/:docId/appointments", roleAccess("super-manager", "manager"), schemaValidation(doctorIdSchema), checkDoctorId, appointmentRouter)

doctorRouter.patch("/updateDates/:docId", roleAccess("super-manager", "manager"), schemaValidation(updateDoctorDatesSchema), checkDoctorId, updateDoctorExamination_dates)

doctorRouter.route("/")
    .post(roleAccess("super-manager", "manager"), filesUpload("doctors").single("image"), schemaValidation(addDoctorSchema), checkUserEmail, checkDoctorEmail, addDoctor)
    .get(schemaValidation(getDoctorSchema), getAllDoctors)

doctorRouter.route("/:docId")
    .patch(roleAccess("super-manager", "manager"), schemaValidation(updateDoctorSchema), checkDoctorId, checkActiveExpireDateIsValid,  updateDoctor)
    .delete(roleAccess("super-manager", "manager"), schemaValidation(doctorIdSchema), checkDoctorId, deleteDoctor)
    .get(schemaValidation(doctorIdSchema), checkDoctorId, getSpecificDoctor)

export default doctorRouter;