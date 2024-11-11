import Appointment from "../../../database/models/appointments.model.js";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";

const addappointment = errorAsyncHandler(async (req, res, next) => {    
    const appointmentModel = new Appointment(req.body);
    const appointment = await appointmentModel.save()
    res.status(201).json({message: "Appointment created successfully", appointment})
})

export {
    addappointment,
}