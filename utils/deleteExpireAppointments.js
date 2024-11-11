import Appointment from "../database/models/appointments.model.js";
import errorAsyncHandler from "../services/errorAsyncHandler.js";

const deleteExpireAppointments = errorAsyncHandler(async (req, res, next) => {
    await Appointment.deleteMany(
        { expireDate: { $lt: new Date() } },
    );
    next();
});

export default deleteExpireAppointments