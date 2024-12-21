import Doctor from "../../../database/models/doctors.model.js";
import User from "../../../database/models/users.model.js";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import AppError from "../../../utils/AppErrorClass.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

// @desc      sign up
// @method    POST
// @route     /api/v1/auth/signup
// @access    public
const signup = errorAsyncHandler(async (req, res, next) => {    
    if (req.file) req.body.profile = req.file.filename;
    req.body.role = "user";
    const userModel = new User(req.body);
    const user = await userModel.save()
    res.status(201).json({message: "User created successfully", user})
})

// @desc      sign in
// @method    POST
// @route     /api/v1/auth/signin
// @access    public
const signin = errorAsyncHandler(async (req, res, next) => {  
    const {email, password} = req.body;
    const user = await User.findOne({email});
    const doctor = await Doctor.findOne({email});

    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ name: user.name, email: user.email, userId: user._id, role: user.role }, process.env.TOKEN_SECRET_KEY);
        res.status(201).json({message: "Signin successfully", user, token});

    } else if (doctor && bcrypt.compareSync(password, doctor.password)) {
        const token = jwt.sign({ name: doctor.name, email: doctor.email, docId: doctor._id, role: doctor.role }, process.env.TOKEN_SECRET_KEY);
        res.status(201).json({message: "Signin successfully", doctor, token});

    } else {
        return next(new AppError("Wrong email or password", 400))
    }
})

export {
    signup,
    signin
}