import mongoose from 'mongoose';

const { Schema } = mongoose;

const appointmentSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    expireDate: {
        type: Date,
        required: true
    },
    doctor: {
        type: Schema.Types.ObjectId, 
        ref: "Doctor",
        required: true,
        trim: true,
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: "User",
        required: true,
        trim: true,
    }
}, { timestamps: true });

appointmentSchema.pre(/^find/, function (next) {
    this.populate({
        path: "user",
        select: "name email birth_date profile"
    })
    this.populate({
        path: "doctor",
        select: "name speciality profile active available"
    })
    next()
})

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;