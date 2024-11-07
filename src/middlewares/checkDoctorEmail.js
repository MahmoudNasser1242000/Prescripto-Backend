import Doctor from "../../database/models/doctors.model.js"
import AppError from "../../utils/AppErrorClass.js"

const checkDoctorEmail = async (req, res, next) => {
    const doctor = await Doctor.findOne({email: req.body.email})
    if (doctor)
        return next(new AppError("Email already exist", 400))
    next()
}

export default checkDoctorEmail;