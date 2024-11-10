import User from "../../../database/models/users.model.js";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import AppError from "../../../utils/AppErrorClass.js";

const addUserManager = errorAsyncHandler(async (req, res, next) => {    
    if (req.file) req.body.profile = req.file.filename;
    req.body.role = "manager";
    const userModel = new User(req.body);
    const user = await userModel.save()
    res.status(201).json({message: "Manager created successfully", user})
})

const getAllusers = errorAsyncHandler(async (req, res, next) => {    
    const users = await User.find({role: "user"});
    res.status(200).json({results: users.length, users})
})
const getAllManagers = errorAsyncHandler(async (req, res, next) => {    
    const managers = await User.find({role: "manager"});
    res.status(200).json({results: managers.length, managers})
})

const getSprcificUser = errorAsyncHandler(async (req, res, next) => {    
    const user = await User.findOne({_id: req.params.userId});
    if (!user) 
        return next(new AppError("Wrong user Id", 404))
    res.status(200).json({user})
})

export {
    addUserManager,
    getAllManagers,
    getAllusers,
    getSprcificUser
}