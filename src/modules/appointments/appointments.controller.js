import Appointment from "../../../database/models/appointments.model.js";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";

const addappointment = errorAsyncHandler(async (req, res, next) => {    
    const newDate = new Date(req.body.date)
    req.body.expireDate = newDate.setDate(newDate.getDate() + 1);
    const appointmentModel = new Appointment(req.body);
    const appointment = await appointmentModel.save()
    res.status(201).json({message: "Appointment created successfully", appointment})
})

const getAllAppointments = errorAsyncHandler(async (req, res, next) => {
    let filterObj = {};
    if (req.query.userId) {
        filterObj.user = req.query.userId
    } else if (req.query.docId) {
        filterObj.doctor = req.query.docId
    }
    const appointments = await Appointment.find(filterObj);
    res.status(200).json({results: appointments.length, appointments})
})

const getSpecificAppointment = errorAsyncHandler(async (req, res, next) => {    
    const appointment = await Appointment.findOne({_id: req.params.appointmentId});
    res.status(200).json({appointment})
})

const deleteAppointment = errorAsyncHandler(async (req, res, next) => {    
    const appointment = await Appointment.findOneAndDelete({_id: req.params.appointmentId});
    res.status(202).json({message: "Appointment deleted successfully", appointment})
})

const upadteAppointment = errorAsyncHandler(async (req, res, next) => {    
    const appointment = await Appointment.findOneAndUpdate({_id: req.params.appointmentId}, req.body, {new: true});
    res.status(202).json({message: "Appointment updated successfully", appointment})
})

export {
    addappointment,
    getAllAppointments,
    getSpecificAppointment,
    deleteAppointment,
    upadteAppointment
}