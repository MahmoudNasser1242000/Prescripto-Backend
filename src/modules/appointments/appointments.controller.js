import Appointment from "../../../database/models/appointments.model.js";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";

const addappointment = errorAsyncHandler(async (req, res, next) => {    
    const appointmentModel = new Appointment(req.body);
    const appointment = await appointmentModel.save()
    res.status(201).json({message: "Appointment created successfully", appointment})
})

const getAllAppointments = errorAsyncHandler(async (req, res, next) => {
    let filterObj = {};
    if (req.params.userId) {
        filterObj.user = req.params.userId
    } else if (req.params.docId) {
        filterObj.doctor = req.params.docId
    }
    const appointments = await Appointment.find(filterObj);
    res.status(200).json({results: appointments.length, appointments})
})

const getAppointmentsForSpecificUser = errorAsyncHandler(async (req, res, next) => {    
    const appointments = await Appointment.find({user: req.params.userId});
    res.status(200).json({results: appointments.length, appointments})
})

const getSpecificAppointment = errorAsyncHandler(async (req, res, next) => {    
    const appointment = await Appointment.findOne({_id: req.params.appointmentId});
    res.status(200).json({appointment})
})

export {
    addappointment,
    getAllAppointments,
    getAppointmentsForSpecificUser,
    getSpecificAppointment
}