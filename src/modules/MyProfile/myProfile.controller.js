import Doctor from "../../../database/models/doctors.model.js";
import User from "../../../database/models/users.model.js";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import AppError from "../../../utils/AppErrorClass.js";

const getMyProfile = errorAsyncHandler(async (req, res, next) => {
    let profile;
    if (req.doctor) {
        profile = await Doctor.findOne({_id: req.doctor._id});
    } else {
        profile = await User.findOne({_id: req.user._id});
    } 
    if (!profile) 
        return next(new AppError("Wrong profile Id", 404))
    res.status(200).json({profile})
})

export {
    getMyProfile
}