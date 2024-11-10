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
        enum: ["male", "female"],
        default: "male"
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

userSchema.post("init", (doc) => {
    doc.profile = `http://localhost:3000/uploads/${doc.profile}`
})

userSchema.pre("save", function (next) {
    const hashPassword = bcrypt.hashSync(this.password, 8);
    this.password = hashPassword
    next()
})

userSchema.pre("findOneAndUpdate", function (next) {
    if (this._update.password) {
        const hashPassword = bcrypt.hashSync(this._update.password, 8);
        this._update.password = hashPassword
    }
    next()
})

userSchema.pre("findOneAndUpdate", async function (next) {
    if (this._update.profile) {
        const docToUpdate = await User.findOne(this.getQuery());

        let folderPath;
        if (docToUpdate.role === "user") {
            folderPath = `./uploads/users/${docToUpdate.profile.split("uploads/")[1]}`
        } else {
            folderPath = `./uploads/managers/${docToUpdate.profile.split("uploads/")[1]}`
        }
        fs.unlinkSync(folderPath, (err) => {
            if (err) {
                return next(new AppError("Can not find this profile image", 404))
            }
        })
    }
    next()
})

userSchema.pre("findOneAndDelete", async function (next) {
    const docToDelete = await User.findOne(this.getQuery());
console.log(docToDelete);

    let folderPath;
    if (docToDelete.role === "user") {
        folderPath = `./uploads/users/${docToDelete.profile.split("uploads/")[1]}`
    } else {
        folderPath = `./uploads/managers/${docToDelete.profile.split("uploads/")[1]}`
    }
    fs.unlinkSync(folderPath, (err) => {
        if (err) {
            return next(new AppError("Can not find this profile image", 404))
        }
    })
    next()
})

const User = mongoose.model('User', userSchema);
export default User;