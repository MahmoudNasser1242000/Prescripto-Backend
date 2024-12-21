import Doctor from "../../../database/models/doctors.model.js";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import AppError from "../../../utils/AppErrorClass.js";

// @desc      add date
// @method    POST
// @route     /api/v1/examinationDates/:docId
// @access    (manager, super-manger)
const addExaminationDate = errorAsyncHandler(async (req, res, next) => {   
    const {docId} = req.params
    const doctorExist = await Doctor.findOne({_id: docId});
    if (!doctorExist)
        return next(new AppError("Can not find doctor with this id", 404));

    const doctor = await Doctor.findOneAndUpdate(
        { _id: doctorExist._id },
        {
            $addToSet: { examination_dates: req.body },
        },
        { new: true }
    )
    res.status(201).json({message: "Date created successfully", doctor})
});

// @desc      update date
// @method    PATCH
// @route     /api/v1/examinationDates/:docId/:timeId
// @access    (manager, super-manger)
const updateExaminationDate = errorAsyncHandler(async (req, res, next) => {   
    const {docId, timeId} = req.params
    let doctor;
    doctor = await Doctor.findOne({_id: docId});
    if (!doctor)
        return next(new AppError("Can not find doctor with this id", 404));

    const examinationDate = doctor.examination_dates.findIndex((time) => time._id.toString() === timeId.toString());
    if (examinationDate === -1)
        return next(new AppError("Can not find Date with this id", 404));

    doctor.examination_dates[examinationDate].time = req.body.newTime.time;
    doctor.examination_dates[examinationDate].modifier = req.body.newTime.modifier;

    doctor.profile = doctor.profile.split("http://localhost:3000/uploads/")[1]    
    await doctor.save()

    doctor = await Doctor.findOne({_id: docId});
    res.status(202).json({message: "Date updated successfully", doctor})
});

// @desc      remove date
// @method    DELETE
// @route     /api/v1/examinationDates/:docId/:timeId
// @access    (manager, super-manger)
const removeExaminationDate = errorAsyncHandler(async (req, res, next) => {   
    const {docId, timeId} = req.params
    const doctorExist = await Doctor.findOne({_id: docId});
    if (!doctorExist)
        return next(new AppError("Can not find doctor with this id", 404));

    const examinationDate = doctorExist.examination_dates.find((time) => time._id.toString() === timeId.toString());
    if (!examinationDate)
        return next(new AppError("Can not find Date with this id", 404));

    const doctor = await Doctor.findOneAndUpdate(
        {_id: docId},
        {
            $pull: { examination_dates: {_id: timeId} },
        },
        { new: true }
    )
    res.status(202).json({message: "Date removed successfully", doctor})
})

export {
    addExaminationDate,
    updateExaminationDate,
    removeExaminationDate

}