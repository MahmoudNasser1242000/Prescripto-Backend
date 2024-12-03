import AppError from "../../utils/AppErrorClass.js"

const checkActiveExpireDateIsValid = async (req, res, next) => {
    const dateNow = new Date();
    if (req.body.activeExpire && dateNow > new Date(`${req.body.activeExpire}`)) 
        return next(new AppError("Date is already expired", 400))
    
    next()
}

export default checkActiveExpireDateIsValid;