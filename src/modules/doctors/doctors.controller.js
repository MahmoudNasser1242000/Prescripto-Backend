import Doctor from "../../../database/models/doctors.model.js";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";

const addDoctor = errorAsyncHandler(async (req, res, next) => {    
    if (req.file) req.body.profile = req.file.filename;
    const doctorModel = new Doctor(req.body);
    const doctor = await doctorModel.save()
    res.status(201).json({message: "Doctor created successfully", doctor})
})

export {
    addDoctor
}