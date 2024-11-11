import { Router } from "express"
import protectAuth from "../../middlewares/ProtectAuth.js";
import roleAccess from "../../middlewares/roleAccess.js";
import { addappointment, getAllAppointments, getAppointmentsForSpecificUser } from "./appointments.controller.js";
import checkDoctorId from "../../middlewares/checkDoctorId.js";
import checkUserId from "../../middlewares/checkUserId.js";

const appointmentRouter = Router();

appointmentRouter.use(protectAuth)

appointmentRouter.route("/")
    .post(roleAccess("user"), checkDoctorId, checkUserId, addappointment)
    .get(roleAccess("manager"), getAllAppointments)

appointmentRouter.route("/:userId")
    .get(roleAccess("manager"), checkUserId, getAppointmentsForSpecificUser)

export default appointmentRouter;