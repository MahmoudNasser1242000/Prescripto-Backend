import User from "../../../database/models/users.model.js";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";

const addUserManager = errorAsyncHandler(async (req, res, next) => {    
    if (req.file) req.body.profile = req.file.filename;
    req.body.role = "manager";
    const userModel = new User(req.body);
    const user = await userModel.save()
    res.status(201).json({message: "Manager created successfully", user})
})

export {
    addUserManager,
}