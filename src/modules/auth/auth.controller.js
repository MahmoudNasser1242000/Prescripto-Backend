import Doctor from "../../../database/models/doctors.model.js";
import User from "../../../database/models/users.model.js";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import AppError from "../../../utils/AppErrorClass.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const signup = errorAsyncHandler(async (req, res, next) => {    
    if (req.file) req.body.profile = req.file.filename;
    req.body.role = "user";
    const userModel = new User(req.body);
    const user = await userModel.save()
    res.status(201).json({message: "User created successfully", user})
})

const signin = errorAsyncHandler(async (req, res, next) => {  
    const {email, password} = req.body;
    const user = await User.findOne({email});
    const doctor = await Doctor.findOne({email});

    let token;
    if (user && bcrypt.compareSync(password, user.password)) {
        token = jwt.sign({ name: user.name, email: user.email, userId: user._id, role: user.role }, "Login System");
        
    } else if (doctor && bcrypt.compareSync(password, doctor.password)) {
        token = jwt.sign({ name: doctor.name, email: doctor.email, userId: doctor._id, role: doctor.role }, "Login System");

    } else {
        return next(new AppError("Wrong email or password", 400))
    }

    res.status(201).json({message: "Signin successfully", user, token})
})

export {
    signup,
    signin
}