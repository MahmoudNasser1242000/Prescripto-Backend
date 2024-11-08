import AppError from "../utils/AppErrorClass.js";

const schemaValidation = (schema) => {
    return (req, res, next) => {
        let inputData;
        if (req.file) {
            inputData = {image: req.file, ...req.body, ...req.params, ...req.query}
        } else {
            inputData = {...req.body, ...req.params, ...req.query}
        }
        
        const {error} = schema.validate(inputData, {abortEarly: false})
        if (error) {
            const errValidation = error.details.map((err) => err.message)
            return next(new AppError(errValidation, 401))
        }
        next()
    }
}

export default schemaValidation