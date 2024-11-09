import AppError from "../../utils/AppErrorClass.js";

const roleAccess = (...roles) => {
    return (req, res, next) => {
        const user = roles.find((role) => role === "user")
        const manager = roles.find((role) => role === "manager")
        const doctor = roles.find((role) => role === "doctor");

        if (req.doctor && doctor) {
            next()
        } else if (req.user && user && req.user.role === user) {
            next()
        } else if (req.user && manager && req.user.role === manager) {
            next()
        } else {
            next(new AppError("You can not access this content", 403))
        }
    }
}

export default roleAccess;