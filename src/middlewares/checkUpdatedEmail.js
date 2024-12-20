import Doctor from "../../database/models/doctors.model.js"
import User from "../../database/models/users.model.js"
import AppError from "../../utils/AppErrorClass.js"

const checkUpdatedEmail = async (req, res, next) => {
    if (req.body.email) {
        const doctor = await Doctor.findOne({email: req.body.email})
        const user = await User.findOne({email: req.body.email})

        if (req.doctor) {
            if (req.doctor.email === req.body.email) {
                next()
            } else {
                if (doctor)
                    return next(new AppError("Email allredy exist!", 400))
                next()
            }
        } else {
            if (req.user.email === req.body.email) {
                next()
            } else {
                if (user)
                    return next(new AppError("Email allredy exist!", 400))
                next()
            }
        }
    } else {
        next()
    }
}

export default checkUpdatedEmail;