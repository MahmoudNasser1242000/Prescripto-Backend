import Appointment from "../../database/models/appointments.model.js"
import AppError from "../../utils/AppErrorClass.js"

const checkAppointmentCreated = async (req, res, next) => {
    const {user, doctor} = req.body
    const appointment = await Appointment.findOne({user, doctor})
    console.log(appointment);
    
    if (appointment)
        return next(new AppError("You have created an appointment for this doctor before", 400))
    next()
}

export default checkAppointmentCreated;