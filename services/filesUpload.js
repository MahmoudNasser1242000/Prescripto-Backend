import mongoose from "mongoose"
import multer from "multer"
import AppError from "../utils/AppErrorClass.js"

const filesUpload = (folderName) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads/${folderName}`)
        },
        filename: function (req, file, cb) {
            console.log(req.file);
            
            const uniqueSuffix = new mongoose.Types.ObjectId + '_' + file.originalname
            cb(null, uniqueSuffix)
        }
    })

    function fileFilter(req, file, cb) {
        if (file.mimetype.startsWith("image")) {
            cb(null, true)
        } else {
            cb(new AppError("Inavlid image type", 401), false)
        }
    }

    const upload = multer({ storage, fileFilter })
    return upload
}

export default filesUpload;