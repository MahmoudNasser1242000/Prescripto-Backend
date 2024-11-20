import { Router } from "express"
import protectAuth from "../../middlewares/ProtectAuth.js";
import roleAccess from "../../middlewares/roleAccess.js";
import { addappointment, deleteAppointment, getAllAppointments, getSpecificAppointment, upadteAppointment } from "./appointments.controller.js";
import checkDoctorId from "../../middlewares/checkDoctorId.js";
import checkUserId from "../../middlewares/checkUserId.js";
import checkAppointmentId from "../../middlewares/checkAppointmentId.js";
import checkAppointmentCreated from "../../middlewares/checkAppointmentCreated.js";
import schemaValidation from "../../../services/validationSchema.js";
import { addAppointmentSchema, appointmentIdSchema, updateAppointmentSchema } from "./appointment.validation.js";
import checkAppointmentDateIsValid from "../../middlewares/checkAppointmentDateIsValid.js";

const appointmentRouter = Router({mergeParams: true});

appointmentRouter.use(protectAuth)

appointmentRouter.route("/")
    .post(roleAccess("user"), schemaValidation(addAppointmentSchema), checkDoctorId, checkUserId, checkAppointmentCreated, checkAppointmentDateIsValid, addappointment)
    .get(getAllAppointments)

appointmentRouter.route("/:appointmentId")
    .get(schemaValidation(appointmentIdSchema),  checkAppointmentId, getSpecificAppointment)
    .delete(schemaValidation(appointmentIdSchema), checkAppointmentId, deleteAppointment)
    .patch(roleAccess("user"), schemaValidation(updateAppointmentSchema),  checkAppointmentId, upadteAppointment)

export default appointmentRouter;