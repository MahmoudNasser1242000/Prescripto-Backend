import mongoose from 'mongoose';
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const doctorSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
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
    profile: {
        type: String,
        trim: true,
        required: true
    },
    speciality: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, "Doctor name must be at least 3 characters"],
        maxLength: [50, "Doctor name must be at most 50 characters"],
    },
    degree: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, "Doctor name must be at least 3 characters"],
        maxLength: [50, "Doctor name must be at most 50 characters"],
    },
    experience: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, "Doctor name must be at least 3 characters"],
        maxLength: [50, "Doctor name must be at most 50 characters"],
    },
    about: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, "Doctor name must be at least 3 characters"],
        maxLength: [1000, "Doctor name must be at most 1000 characters"],
    },
    available: {
        type: Boolean,
        default: true
    },
    fees: {
        type: Number,
        required: true,
    },
    birth_date: {
        type: Date,
        required: true
    },
}, {timestamps: true});

doctorSchema.post("init", (doc) => {
    doc.profile = `http://localhost:3000/uploads/${doc.profile}`
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

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;
