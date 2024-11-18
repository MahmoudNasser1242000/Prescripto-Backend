import AppError from "../../utils/AppErrorClass.js"

const checkAppointmentDateIsValid = async (req, res, next) => {
    const dateNow = new Date();
    if (dateNow > new Date(`${req.body.date}`)) 
        return next(new AppError("Date is already expired", 400))
    
    next()
}

export default checkAppointmentDateIsValid;