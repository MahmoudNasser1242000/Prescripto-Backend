import Doctor from "../../database/models/doctors.model.js"
import AppError from "../../utils/AppErrorClass.js"

const checkDoctorId = async (req, res, next) => {
    const doctor = await Doctor.findById(req.params.docId)
    if (!doctor)
        return next(new AppError("Doctor id is not found", 404))
    next()
}

export default checkDoctorId;