import Appointment from "../../../database/models/appointments.model.js";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import ApiFeatures from "../../../utils/apiFeatures.js";

const addappointment = errorAsyncHandler(async (req, res, next) => {
    const newDate = new Date(req.body.date)
    req.body.expireDate = newDate.setDate(newDate.getDate() + 1);
    const appointmentModel = new Appointment(req.body);
    const appointment = await appointmentModel.save()
    res.status(201).json({ message: "Appointment created successfully", appointment })
})

const getAllAppointments = errorAsyncHandler(async (req, res, next) => {
    let filterObj = {};
    if (req.params.userId) {
        filterObj.user = req.params.userId
    } else if (req.params.docId) {
        filterObj.doctor = req.params.docId
    }
    const collectionLength = (await Appointment.find(filterObj)).length;
    const apiFeatures = new ApiFeatures(Appointment.find(filterObj), req.query)
        .pagination(collectionLength)
        .filter()
        .sort()
        .search()
        .fields();
    const appointments = await apiFeatures.mongooseQuery;
    res.status(200).json({ results: appointments.length, metadata: apiFeatures.metadata, appointments })
})

const getSpecificAppointment = errorAsyncHandler(async (req, res, next) => {
    const appointment = await Appointment.findOne({ _id: req.params.appointmentId });
    res.status(200).json({ appointment })
})

const deleteAppointment = errorAsyncHandler(async (req, res, next) => {
    const appointment = await Appointment.findOneAndDelete({ _id: req.params.appointmentId });
    res.status(202).json({ message: "Appointment deleted successfully", appointment })
})

const upadteAppointment = errorAsyncHandler(async (req, res, next) => {
    if (req.body.date) {
        const newDate = new Date(req.body.date);
        req.body.expireDate = newDate.setDate(newDate.getDate() + 1);
    }
    const appointment = await Appointment.findOneAndUpdate({ _id: req.params.appointmentId }, req.body, { new: true });
    res.status(202).json({ message: "Appointment updated successfully", appointment })
})

export {
    addappointment,
    getAllAppointments,
    getSpecificAppointment,
    deleteAppointment,
    upadteAppointment
}