import Doctor from "../database/models/doctors.model.js";
import User from "../database/models/users.model.js";
import errorAsyncHandler from "../services/errorAsyncHandler.js";

const UpdateUserActivity = errorAsyncHandler(async (req, res, next) => {
    if (req.doctor) {
        await Doctor.updateMany(
            {active: false, activeExpire: { $lt: new Date() } },
            { active: true, activeExpire: null }
        );
    } else if (req.user) {
        await User.updateMany(
            {active: false, activeExpire: { $lt: new Date() } },
            { active: true, activeExpire: null }
        );
    }
    next();
});

export default UpdateUserActivity