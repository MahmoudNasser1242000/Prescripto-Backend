import mongoose from 'mongoose';
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
        required: false
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
        maxLength: [150, "Doctor name must be at most 150 characters"],
    },
    available: {
        type: Boolean,
        default: true
    },
    fees: {
        type: Number,
        required: true,
    },
    address: {
        type: [String],
        required: true
    },
    birth_date: {
        type: Date,
        required: true
    },
}, {timestamps: true});

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;
