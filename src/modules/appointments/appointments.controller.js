import Appointment from "../../../database/models/appointments.model.js";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";

const addappointment = errorAsyncHandler(async (req, res, next) => {    
    const appointmentModel = new Appointment(req.body);
    const appointment = await appointmentModel.save()
    res.status(201).json({message: "Appointment created successfully", appointment})
})

const getAllAppointments = errorAsyncHandler(async (req, res, next) => {    
    const appointments = await Appointment.find();
    res.status(200).json({results: appointments.length, appointments})
})

export {
    addappointment,
    getAllAppointments
}