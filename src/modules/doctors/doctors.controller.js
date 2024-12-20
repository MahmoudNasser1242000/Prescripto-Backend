import Doctor from "../../../database/models/doctors.model.js";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import ApiFeatures from "../../../utils/apiFeatures.js";

// @desc      add doctor
// @method    POST
// @route     /api/v1/doctors
// @access    (manager, super-manger)
const addDoctor = errorAsyncHandler(async (req, res, next) => {    
    if (req.file) req.body.profile = req.file.filename;
    const doctorModel = new Doctor(req.body);
    const doctor = await doctorModel.save()
    res.status(201).json({message: "Doctor created successfully", doctor})
})

// @desc      get all doctors
// @method    GET
// @route     /api/v1/doctors
// @access    public
const getAllDoctors = errorAsyncHandler(async (req, res, next) => {    
    const collectionLength = (await Doctor.find()).length;
    const apiFeatures = new ApiFeatures(Doctor.find(), req.query)
        .pagination(collectionLength)
        .filter()
        .sort()
        .search()
        .fields();
    const doctors = await apiFeatures.mongooseQuery;
    res.status(200).json({results: doctors.length, metadata: apiFeatures.metadata, doctors})
})

// @desc      get one doctor
// @method    GET
// @route     /api/v1/doctors/:docId
// @access    public
const getSpecificDoctor = errorAsyncHandler(async (req, res, next) => {
    const doctor = await Doctor.findOne({_id: req.params.docId});
    res.status(200).json({doctor})
})

// @desc      update doctor
// @method    PATCH
// @route     /api/v1/doctors/:docId
// @access    (manager, super-manger)
const updateDoctor = errorAsyncHandler(async (req, res, next) => {
    const doctor = await Doctor.findOneAndUpdate({_id: req.params.docId}, req.body, {new: true});
    res.status(202).json({message: "Doctor updated successfully", doctor})
})
// @desc      update doctor dates
// @method    PATCH
// @route     /api/v1/doctors/updateDates/:docId
// @access    (manager, super-manger)
const updateDoctorExamination_dates = errorAsyncHandler(async (req, res, next) => {
    if (req.body.times)
        req.body.times = JSON.parse(req.body.times)    
    const doctor = await Doctor.findOneAndUpdate({_id: req.params.docId}, {examination_dates: req.body.times}, {new: true});
    res.status(202).json({message: "Doctor Dates updated successfully", doctor})
})

// @desc      delete doctor
// @method    DELETE
// @route     /api/v1/doctors/:docId
// @access    (manager, super-manger)
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