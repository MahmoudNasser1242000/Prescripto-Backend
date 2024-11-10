import User from "../../database/models/users.model.js"
import AppError from "../../utils/AppErrorClass.js"

const checkUserId = async (req, res, next) => {
    const user = await User.findById(req.params.userId)
    if (!user)
        return next(new AppError("User id is not found", 404))
    next()
}

export default checkUserId;