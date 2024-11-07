import Doctor from "../../../database/models/doctors.model.js";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";

const addDoctor = errorAsyncHandler(async (req, res, next) => {    
    if (req.file) req.body.profile = req.file.filename;
    const doctorModel = new Doctor(req.body);
    const doctor = await doctorModel.save()
    res.status(201).json({message: "Doctor created successfully", doctor})
})

const getAllDoctors = errorAsyncHandler(async (req, res, next) => {    
    const doctors = await Doctor.find();
    res.status(200).json({results: doctors.length, doctors})
})

export {
    addDoctor,
    getAllDoctors
}