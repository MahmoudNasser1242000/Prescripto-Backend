import {Router} from "express"
import protectAuth from "../../middlewares/ProtectAuth.js";
import roleAccess from "../../middlewares/roleAccess.js";
import { addappointment, getAllAppointments } from "./appointments.controller.js";
import checkDoctorId from "../../middlewares/checkDoctorId.js";
import checkUserId from "../../middlewares/checkUserId.js";

const appointmentRouter = Router();

appointmentRouter.use(protectAuth)

appointmentRouter.route("/")
    .post(roleAccess("user"), checkDoctorId, checkUserId, addappointment)
    .get(roleAccess("manager"), getAllAppointments)
    
export default appointmentRouter;