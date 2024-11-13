import Doctor from "../../../database/models/doctors.model.js";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import AppError from "../../../utils/AppErrorClass.js";

const updateExaminationDate = errorAsyncHandler(async (req, res, next) => {   
    const {docId, timeId} = req.params
    const doctor = await Doctor.findOne({_id: docId});
    if (!doctor)
        return next(new AppError("Can not find doctor with this id", 404));

    const examinationDate = doctor.examination_dates.findIndex((time) => time._id.toString() === timeId.toString());
    if (examinationDate === -1)
        return next(new AppError("Can not find examination date with this id", 404));

    doctor.examination_dates[examinationDate].time = req.body.newTime.time;
    doctor.examination_dates[examinationDate].modifier = req.body.newTime.modifier;
    await doctor.save()
    res.status(202).json({message: "Examination date created successfully", doctor})
});

const removeExaminationDate = errorAsyncHandler(async (req, res, next) => {   
    const {docId, timeId} = req.params
    const doctorExist = await Doctor.findOne({_id: docId});
    if (!doctorExist)
        return next(new AppError("Can not find doctor with this id", 404));

    const examinationDate = doctorExist.examination_dates.find((time) => time._id.toString() === timeId.toString());
    if (!examinationDate)
        return next(new AppError("Can not find examination date with this id", 404));

    const doctor = await Doctor.findOneAndUpdate(
        {_id: docId},
        {
            $pull: { examination_dates: {_id: timeId} },
        },
        { new: true }
    )
    res.status(202).json({message: "Examination date removed successfully", doctor})
})

export {
    updateExaminationDate,
    removeExaminationDate

}