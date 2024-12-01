import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import fs from "fs";
import AppError from '../../utils/AppErrorClass.js';

const { Schema } = mongoose;

const doctorSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, "Doctor name must be at least 3 characters"],
        maxLength: [50, "Doctor name must be at most 50 characters"],
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: [true, "Doctor email must be unique"]
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    changePasswordAt: {
        type: Date
    },
    profile: {
        type: String,
        trim: true,
        required: true
    },
    speciality: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, "Speciality must be at least 3 characters"],
        maxLength: [50, "Speciality must be at most 50 characters"],
    },
    degree: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, "Degree must be at least 3 characters"],
        maxLength: [50, "Degree must be at most 50 characters"],
    },
    experience: {
        type: Number,
        required: true,
    },
    about: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, "About must be at least 3 characters"],
        maxLength: [1000, "About must be at most 1000 characters"],
    },
    examination_dates: {
        type: [{
            time: String,
            modifier: {
                type: String,
                enum: ["PM", "AM"]
            },
        }],
    },
    gender: {
        type: String,
        trim: true,
        enum: ["male", "female"],
        default: "male"
    },
    role: {
        type: String,
        trim: true,
        default: "doctor"
    },
    phone: {
        type: String,
        trim: true,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    fees: {
        type: Number,
        required: true,
    },
    active: {
        type: Boolean,
        default: true
    },
    activeExpire: {
        type: Date,
        default: "0000-01-01T00:00:00Z"
    },
    birth_date: {
        type: Date,
        required: true
    },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

doctorSchema.post("init", (doc) => {
    if (doc.profile) {
        doc.profile = `http://localhost:3000/uploads/${doc.profile}`
    }
})

doctorSchema.pre("save", function (next) {
    const hashPassword = bcrypt.hashSync(this.password, 8);
    this.password = hashPassword
    next()
})

doctorSchema.pre("findOneAndUpdate", function (next) {
    if (this._update.password) {
        const hashPassword = bcrypt.hashSync(this._update.password, 8);
        this._update.password = hashPassword
    }
    next()
})

doctorSchema.pre("findOneAndUpdate", async function (next) {
    if (this._update.profile) {
        const docToUpdate = await Doctor.findOne(this.getQuery());
        fs.unlink(`./uploads/doctors/${docToUpdate.profile.split("uploads/")[1]}`, (err) => {
            if (err) {
                return next(new AppError("Can not find this profile image", 404))
            }
        })
    }
    next()
})

doctorSchema.pre("findOneAndDelete", async function (next) {
    const docToDelete = await Doctor.findOne(this.getQuery());
    fs.unlink(`./uploads/doctors/${docToDelete.profile.split("uploads/")[1]}`, (err) => {
        if (err) {
            return next(new AppError("Can not find this profile image", 404))
        }
    })
    next()
})

// doctorSchema.virtual("appointments", { // name of new field in doctor schema
//     ref: "Appointment", // Appointment model
//     localField: "_id", // doctor id
//     foreignField: "doctor", // appointment field ref to doctor
// });

// doctorSchema.pre(/^find/, function (next) {
//     this.populate({
//         path: "appointments",
//         populate: { path: "user" },
//     })
//     next()
// })

doctorSchema
    .virtual('age')
    .get(function () {
        const today = new Date();
        const birth = this.birth_date;

        let age = today.getFullYear() - birth.getFullYear();
        const monthDifference = today.getMonth() - birth.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
            age -= 1;
        }

        return age
    });

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;