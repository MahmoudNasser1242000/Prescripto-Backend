import User from "../database/models/users.model.js";
import errorAsyncHandler from "../services/errorAsyncHandler.js";

const UpdateUserActivity = errorAsyncHandler(async (req, res, next) => {
    await User.updateMany(
        {active: false, activeExpire: { $lt: new Date() } },
        { active: true, activeExpire: "0000-01-01T00:00:00Z" }
    );
    next();
});

export default UpdateUserActivity