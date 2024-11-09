import Doctor from "../../database/models/doctors.model.js";
import User from "../../database/models/users.model.js";
import AppError from "../../utils/AppErrorClass.js";
import jwt from "jsonwebtoken"

const protectAuth = async (req, res, next) => {
    const {authorization} = req.headers;
    if (!(authorization && authorization.startsWith("Bearer"))) 
        return next(new AppError("You are not authorized", 401))

    const token = authorization.split(" ")[1]
    if (!token) 
        return next(new AppError("You are not authorized", 401));

    const decodeToken = jwt.verify(token, "Login System");

    if (decodeToken.role === "doctor") {
        const doctor = await Doctor.findOne({_id: decodeToken.docId})
        req.doctor = doctor
    } else {
        const user = await User.findOne({_id: decodeToken.userId})
        req.user = user
    }
    next()
}

export default protectAuth;