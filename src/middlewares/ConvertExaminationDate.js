const ConvertExaminationDate = async (req, res, next) => {
    req.body.examination_dates = req.body.examination_dates.map((time) => JSON.parse(time))
    next()
}

export default ConvertExaminationDate;