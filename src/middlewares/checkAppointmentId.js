import Appointment from "../../database/models/appointments.model.js"
import AppError from "../../utils/AppErrorClass.js"

const checkAppointmentId = async (req, res, next) => {
    const appointment = await Appointment.findById(req.params.appointmentId)
    if (!appointment)
        return next(new AppError("Appointment id is not found", 404))
    next()
}

export default checkAppointmentId;