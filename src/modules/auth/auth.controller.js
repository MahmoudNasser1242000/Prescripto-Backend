import User from "../../../database/models/users.model.js";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";

const signup = errorAsyncHandler(async (req, res, next) => {    
    if (req.file) req.body.profile = req.file.filename;
    const userModel = new User(req.body);
    const user = await userModel.save()
    res.status(201).json({message: "User created successfully", user})
})

export {
    signup,
}