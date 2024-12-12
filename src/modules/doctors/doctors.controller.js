import Doctor from "../../../database/models/doctors.model.js";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";

const addDoctor = errorAsyncHandler(async (req, res, next) => {    
    if (req.file) req.body.profile = req.file.filename;
    const doctorModel = new Doctor(req.body);
    const doctor = await doctorModel.save()
    res.status(201).json({message: "Doctor created successfully", doctor})
})

const getAllDoctors = errorAsyncHandler(async (req, res, next) => {    
    const {name} = req.query
    const filterObj = {}
    if (name) {
        filterObj.name = {
            $regex: new RegExp(
                name.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"),
                "i"
            ),
        };
    }
    const doctors = await Doctor.find(filterObj);
    res.status(200).json({results: doctors.length, doctors})
})

const getSpecificDoctor = errorAsyncHandler(async (req, res, next) => {
    const doctor = await Doctor.findOne({_id: req.params.docId});
    res.status(200).json({doctor})
})

const updateDoctor = errorAsyncHandler(async (req, res, next) => {
    const doctor = await Doctor.findOneAndUpdate({_id: req.params.docId}, req.body, {new: true});
    res.status(202).json({message: "Doctor updated successfully", doctor})
})
const updateDoctorExamination_dates = errorAsyncHandler(async (req, res, next) => {
    if (req.body.times)
        req.body.times = JSON.parse(req.body.times)    
    const doctor = await Doctor.findOneAndUpdate({_id: req.params.docId}, {examination_dates: req.body.times}, {new: true});
    res.status(202).json({message: "Doctor Dates updated successfully", doctor})
})

const deleteDoctor = errorAsyncHandler(async (req, res, next) => {
    const doctor = await Doctor.findOneAndDelete({_id: req.params.docId});
    res.status(202).json({message: "Doctor deleted successfully", doctor})
})

export {
    addDoctor,
    getAllDoctors,
    getSpecificDoctor,
    updateDoctor,
    deleteDoctor,
    updateDoctorExamination_dates
}