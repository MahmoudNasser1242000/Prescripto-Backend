import User from "../../database/models/users.model.js"
import AppError from "../../utils/AppErrorClass.js"

const checkUserEmail = async (req, res, next) => {
    const user = await User.findOne({email: req.body.email})
    if (user)
        return next(new AppError("Email already exist", 400))
    next()
}

export default checkUserEmail;