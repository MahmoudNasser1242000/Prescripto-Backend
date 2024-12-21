import User from "../../../database/models/users.model.js";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import ApiFeatures from "../../../utils/apiFeatures.js";
import AppError from "../../../utils/AppErrorClass.js";

// @desc      add user
// @method    POST
// @route     /api/v1/users
// @access    (super-manager, manager)
const addUserManager = errorAsyncHandler(async (req, res, next) => {    
    if (req.file) req.body.profile = req.file.filename;
    req.body.role = "manager";
    const userModel = new User(req.body);
    const user = await userModel.save()
    res.status(201).json({message: "Manager created successfully", user})
})

// @desc      get all users
// @method    GET
// @route     /api/v1/users
// @access    (super-manager, manager)
const getAllusers = errorAsyncHandler(async (req, res, next) => {   
    const collectionLength = (await User.find()).length;
    const apiFeatures = new ApiFeatures(User.find(), req.query)
        .pagination(collectionLength)
        .filter()
        .sort()
        .search()
        .fields();
    const users = await apiFeatures.mongooseQuery;
    res.status(200).json({results: users.length, metadata: apiFeatures.metadata, users})
})

// @desc      get one user
// @method    GET
// @route     /api/v1/users/:userId
// @access    (super-manager, manager)
const getSpecificUser = errorAsyncHandler(async (req, res, next) => {    
    const user = await User.findOne({_id: req.params.userId});
    if (!user) 
        return next(new AppError("Wrong user Id", 404))
    res.status(200).json({user})
})

// @desc      update user
// @method    PATCH
// @route     /api/v1/users/:userId
// @access    (super-manager, manager)
const updateUser = errorAsyncHandler(async (req, res, next) => {
    if (req.body.active === true) req.body.activeExpire = new Date("0000-01-01T00:00:00Z");
    const user = await User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true});
    res.status(202).json({message: `User updated successfully`, user})
})

// @desc      delete user
// @method    DELETE
// @route     /api/v1/users/:userId
// @access    (super-manager, manager)
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