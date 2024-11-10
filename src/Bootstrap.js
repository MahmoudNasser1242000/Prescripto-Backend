import doctorRouter from "./modules/doctors/doctors.routes.js";
import authRouter from "./modules/auth/auth.routes.js";
import userRouter from "./modules/users/users.routes.js";

const Bootstrap = (app) => {
    app.use("/api/v1/doctors", doctorRouter);
    app.use("/api/v1/auth", authRouter);
    app.use("/api/v1/users", userRouter);
}

export default Bootstrap;