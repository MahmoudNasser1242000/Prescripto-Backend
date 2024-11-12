import Doctor from "../../../database/models/doctors.model.js";
import User from "../../../database/models/users.model.js";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import AppError from "../../../utils/AppErrorClass.js";
import bcrypt from "bcrypt";

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

const deleteMyProfile = errorAsyncHandler(async (req, res, next) => {
    const profile = await User.findOneAndDelete({_id: req.user._id});
    res.status(202).json({message: "Profile deleted successfully", profile})
})

const updateMyDoctorProfile = errorAsyncHandler(async (req, res, next) => {
    const doctor = await Doctor.findOneAndUpdate({_id: req.doctor._id}, req.body, {new: true});
    res.status(202).json({message: `Doctor updated successfully`, doctor})
})
const updateMyUserProfile = errorAsyncHandler(async (req, res, next) => {
    const user = await User.findOneAndUpdate({_id: req.user._id}, req.body, {new: true});
    res.status(202).json({message: `User updated successfully`, user})
})
const updateMyManagerProfile = errorAsyncHandler(async (req, res, next) => {
    const manager = await User.findOneAndUpdate({_id: req.user._id}, req.body, {new: true});
    res.status(202).json({message: `Manager updated successfully`, manager})
})

const changeDoctorPassword = errorAsyncHandler(async (req, res, next) => {
    const {newPassword, password} = req.body;
    const comparePass = bcrypt.compareSync(password, req.doctor?.password)
    if (!comparePass) 
        return next(new AppError("Wrong doctor password", 400))
    
    const doctor = await Doctor.findOneAndUpdate({_id: req.user._id}, {password: newPassword, changePasswordAt: new Date()}, {new: true});
    res.status(202).json({message: `Password updated successfully`, doctor})
})
const changeUserPassword = errorAsyncHandler(async (req, res, next) => {
    const {newPassword, password} = req.body;
    const comparePass = bcrypt.compareSync(password, req.user.password)
    if (!comparePass) 
        return next(new AppError("Wrong user password", 400))
    
    const user = await User.findOneAndUpdate({_id: req.user._id}, {password: newPassword, changePasswordAt: new Date()}, {new: true});
    res.status(202).json({message: `Password updated successfully`, user})
})

export {
    getMyProfile,
    deleteMyProfile,
    updateMyDoctorProfile,
    updateMyUserProfile,
    updateMyManagerProfile,
    changeDoctorPassword,
    changeUserPassword
}