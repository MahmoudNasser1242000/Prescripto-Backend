import Joi from 'joi';

const addAppointmentSchema = Joi.object({
    date: Joi.date()
        .required(),

    user: Joi.string().hex().length(24).required(),

    doctor: Joi.string().hex().length(24).required(),

}).options({ allowUnknown: false });

const updateAppointmentSchema = Joi.object({
    date: Joi.date()
        .required(),

    appointmentId: Joi.string().hex().length(24).required(),
}).options({ allowUnknown: false });

const appointmentIdSchema = Joi.object({
    appointmentId: Joi.string().hex().length(24).required(),

}).options({ allowUnknown: false });

export {
    addAppointmentSchema,
    updateAppointmentSchema,
    appointmentIdSchema
}