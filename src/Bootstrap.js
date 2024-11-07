import doctorRouter from "./modules/doctors/doctors.routes.js";

const Bootstrap = (app) => {
    app.use("/api/v1/doctors", doctorRouter);
}

export default Bootstrap;