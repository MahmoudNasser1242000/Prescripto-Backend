import { Router } from "express"
import protectAuth from "../../middlewares/ProtectAuth.js";
import roleAccess from "../../middlewares/roleAccess.js";
import { addappointment, deleteAppointment, getAllAppointments, getSpecificAppointment, upadteAppointment } from "./appointments.controller.js";
import checkDoctorId from "../../middlewares/checkDoctorId.js";
import checkUserId from "../../middlewares/checkUserId.js";
import checkAppointmentId from "../../middlewares/checkAppointmentId.js";
import checkAppointmentCreated from "../../middlewares/checkAppointmentCreated.js";

const appointmentRouter = Router({mergeParams: true});

appointmentRouter.use(protectAuth)

appointmentRouter.route("/")
    .post(roleAccess("user"), checkDoctorId, checkUserId, checkAppointmentCreated, addappointment)
    .get(roleAccess("manager"), getAllAppointments)

appointmentRouter.route("/:appointmentId")
    .get(roleAccess("manager"), checkAppointmentId, getSpecificAppointment)
    .delete(checkAppointmentId, deleteAppointment)
    .patch(roleAccess("user"), checkAppointmentId, upadteAppointment)

export default appointmentRouter;