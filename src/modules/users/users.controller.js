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
    const {name} = req.query
    const filterObj = {}
    if (name) {
        filterObj.name = {
            $regex: new RegExp(
                name.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"),
                "i"
            ),
        };
    }
    const users = await User.find(filterObj);
    res.status(200).json({results: users.length, users})
})

const getSpecificUser = errorAsyncHandler(async (req, res, next) => {    
    const user = await User.findOne({_id: req.params.userId});
    if (!user) 
        return next(new AppError("Wrong user Id", 404))
    res.status(200).json({user})
})

const updateUser = errorAsyncHandler(async (req, res, next) => {
    if (req.body.active === true) req.body.activeExpire = new Date("0000-01-01T00:00:00Z");
    const user = await User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true});
    res.status(202).json({message: `User updated successfully`, user})
})

const deleteUser = errorAsyncHandler(async (req, res, next) => {
    const user = await User.findOneAndDelete({_id: req.params.userId});
    res.status(202).json({message: "User deleted successfully", user})
})

export {
    addUserManager,
    getAllusers,
    getSpecificUser,
    deleteUser,
    updateUser
}