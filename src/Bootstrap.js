import doctorRouter from "./modules/doctors/doctors.routes.js";
import authRouter from "./modules/auth/auth.routes.js";
import userRouter from "./modules/users/users.routes.js";
import myProfileRouter from "./modules/MyProfile/myProfile.routes.js";
import appointmentRouter from "./modules/appointments/appointments.routes.js";
import examinationDatesRouter from "./modules/examination dates/examinationDates.routes.js";

const Bootstrap = (app) => {
    app.use("/api/v1/doctors", doctorRouter);
    app.use("/api/v1/auth", authRouter);
    app.use("/api/v1/users", userRouter);
    app.use("/api/v1/myProfile", myProfileRouter);
    app.use("/api/v1/appointments", appointmentRouter);
    app.use("/api/v1/examinationDates", examinationDatesRouter);
}

export default Bootstrap;