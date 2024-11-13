import Joi from 'joi';

const addExaminationDatesIdSchema = Joi.object({
    time: Joi.string()
        .required()
        .pattern(/^(0[1-9]|10|11|12):([0-5][0-9])$/)
        .messages({
            "string.pattern": `Time must be valid, For example: 02:00`
        }),
    modifier: Joi.string()
        .required()
        .valid("PM", "AM")
        .messages({
            "any.valid": "Modifier must be one of PM or AM",
        }),
    docId: Joi.string().hex().length(24).required(),
}).options({ allowUnknown: false });

const updateExaminationDatesIdSchema = Joi.object({
    newTime: Joi.object({
        time: Joi.string()
            .required()
            .pattern(/^(0[1-9]|10|11|12):([0-5][0-9])$/)
            .messages({
                "string.pattern": `Time must be valid, For example: 02:00`,
            }),
        modifier: Joi.string()
            .required()
            .valid("PM", "AM")
            .messages({
                "any.valid": "Modifier must be one of PM or AM",
            }),
    }).required(),
    docId: Joi.string().hex().length(24).required(),
    timeId: Joi.string().hex().length(24).required(),
}).options({ allowUnknown: false });

const deleteExaminationDatesIdSchema = Joi.object({
    docId: Joi.string().hex().length(24).required(),
    timeId: Joi.string().hex().length(24).required(),
}).options({ allowUnknown: false });

export {
    addExaminationDatesIdSchema,
    updateExaminationDatesIdSchema,
    deleteExaminationDatesIdSchema
}