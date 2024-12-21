import Doctor from "../../../database/models/doctors.model.js";
import User from "../../../database/models/users.model.js";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import AppError from "../../../utils/AppErrorClass.js";
import bcrypt from "bcrypt";

// @desc      get my profile
// @method    GET
// @route     /api/v1/myProfile
// @access    public
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

// @desc      delete my profile
// @method    DELETE
// @route     /api/v1/myProfile
// @access    (user, super-manager)
const deleteMyProfile = errorAsyncHandler(async (req, res, next) => {
    const profile = await User.findOneAndDelete({_id: req.user._id});
    res.status(202).json({message: "Profile deleted successfully", profile})
})

// @desc      update my doctor profile
// @method    PATCH
// @route     /api/v1/myProfile/updateDoctorProfile
// @access    doctor
const updateMyDoctorProfile = errorAsyncHandler(async (req, res, next) => {
    if (req.file) req.body.profile = req.file.filename
    const doctor = await Doctor.findOneAndUpdate({_id: req.doctor._id}, req.body, {new: true});
    res.status(202).json({message: `Doctor updated successfully`, doctor})
})
// @desc      update my user profile
// @method    PATCH
// @route     /api/v1/myProfile/updateUserProfile
// @access    user
const updateMyUserProfile = errorAsyncHandler(async (req, res, next) => {
    if (req.file) req.body.profile = req.file.filename
    const user = await User.findOneAndUpdate({_id: req.user._id}, req.body, {new: true});
    res.status(202).json({message: `User updated successfully`, user})
})
// @desc      update my manager profile
// @method    PATCH
// @route     /api/v1/myProfile/updateManagerProfile
// @access    (super-manager, manager)
const updateMyManagerProfile = errorAsyncHandler(async (req, res, next) => {
    if (req.file) req.body.profile = req.file.filename
    const manager = await User.findOneAndUpdate({_id: req.user._id}, req.body, {new: true});
    res.status(202).json({message: `Manager updated successfully`, manager})
})

// @desc      change doctor password
// @method    PATCH
// @route     /api/v1/myProfile/changeDoctorPassword
// @access    doctor
const changeDoctorPassword = errorAsyncHandler(async (req, res, next) => {
    const {newPassword, password} = req.body;
    const comparePass = bcrypt.compareSync(password, req.doctor?.password)
    if (!comparePass) 
        return next(new AppError("Wrong doctor password", 400))
    
    const doctor = await Doctor.findOneAndUpdate({_id: req.doctor._id}, {password: newPassword, changePasswordAt: new Date()}, {new: true});
    res.status(202).json({message: `Password updated successfully`, doctor})
})
// @desc      change user password
// @method    PATCH
// @route     /api/v1/myProfile/changeUserPassword
// @access    (user, manager, super-manager)
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