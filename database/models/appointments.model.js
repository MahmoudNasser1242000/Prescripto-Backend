import mongoose from 'mongoose';

const { Schema } = mongoose;

const appointmentSchema = new Schema({
    date: {
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

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;