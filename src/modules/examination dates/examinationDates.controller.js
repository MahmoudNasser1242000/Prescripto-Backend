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

    doctor.examination_dates[examinationDate] = req.body.newTime;
    await doctor.save()
    res.status(202).json({message: "Examination date created successfully", examination_datesr: doctor.examination_dates})
})

export {
    updateExaminationDate,
}