import Doctor from "../../database/models/doctors.model.js";
import User from "../../database/models/users.model.js";
import AppError from "../../utils/AppErrorClass.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const protectAuth = async (req, res, next) => {
    const {authorization} = req.headers;
    if (!(authorization && authorization.startsWith("Bearer"))) 
        return next(new AppError("You are not authorized", 401))

    const token = authorization.split(" ")[1]
    if (!token) 
        return next(new AppError("You are not authorized", 401));

    const decodeToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

    if (decodeToken.role === "doctor") {
        const doctor = await Doctor.findOne({_id: decodeToken.docId});
        if (!doctor) 
            return next(new AppError("Invalid doctor token", 400));

        if (doctor.changePasswordAt && decodeToken.iat < Math.round(doctor.changePasswordAt.getTime()/1000))             
            return next(new AppError("Invalid doctor token", 400));
        req.doctor = doctor
    } else {
        const user = await User.findOne({_id: decodeToken.userId});
        if (!user) 
            return next(new AppError("Invalid user token", 400));

        if (user.changePasswordAt && decodeToken.iat < Math.round(user.changePasswordAt.getTime()/1000)) 
            return next(new AppError("Invalid user token", 400));
        req.user = user
    }
    next()
}

export default protectAuth;