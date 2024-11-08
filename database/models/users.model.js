import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import fs from "fs";
import AppError from '../../utils/AppErrorClass.js';

const { Schema } = mongoose;

const userSchema = new Schema({
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
    gender: {
        type: String,
        enum: ["male, female"]
    },
    phone: {
        type: String,
        trim: true,
        required: true
    },
    role: {
        type: String,
        enum: ["manager", "user"],
        default: "user"
    },
    birth_date: {
        type: Date,
        required: true
    },
    job: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        minLength: [3, "Job must be at least 3 characters"],
        maxLength: [100, "Job name must be at most 100 characters"],
    },
    bio: {
        type: String,
        trim: true,
        minLength: [3, "Bio must be at least 3 characters"],
        maxLength: [1000, "Bio name must be at most 1000 characters"],
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;