import User from "../../database/models/users.model.js"
import AppError from "../../utils/AppErrorClass.js"

const protectSuperManager = async (req, res, next) => {
    const user = await User.findById(req.params.userId)
    if (user.role === "super-manager")
        return next(new AppError("Can not update or delete super manager", 400))
    next()
}

export default protectSuperManager;