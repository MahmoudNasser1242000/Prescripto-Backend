import Joi from 'joi';

const updateUserORMmanagerProfileSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50)
        .optional()
        .messages({
            "string.min": "user name must be at least 3 characters",
            "string.max": "user name must be at most 50 characters"
        }),

    email: Joi.string()
        .email()
        .optional()
        .messages({
            "string.email": "Email must be valid"
        }),

    bio: Joi.string()
        .min(3)
        .max(1000)
        .optional()
        .messages({
            "string.min": "about field must be at least 3 characters",
            "string.max": "about field must be at most 1000 characters"
        }),

    gender: Joi.string()
        .optional()
        .valid("male", "female")
        .messages({
            "any.valid": "Gender must be one of male or female",
        }),

    phone: Joi.string()
        .optional()
        .pattern(/^01([0-2]|5)[0-9]{8}$/),

    birth_date: Joi.date()
        .optional(),

    job: Joi.string()
        .min(3)
        .max(100)
        .optional()
        .messages({
            "string.min": "Job field must be at least 3 characters",
            "string.max": "Job field must be at most 100 characters"
        }),

    image: Joi.object({
        fieldname: Joi.string().optional(),
        originalname: Joi.string().optional(),
        encoding: Joi.string().optional(),
        mimetype: Joi.string().valid("image/png", "image/jpeg", "image/jpg", "image/webp").optional(),
        destination: Joi.string().optional(),
        filename: Joi.string().optional(),
        path: Joi.string().optional(),
        size: Joi.number().max(5242880).optional()
    }).optional()
})

const updateDoctorProfileSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50)
        .optional()
        .messages({
            "string.min": "Doctor name must be at least 3 characters",
            "string.max": "Doctor name must be at most 50 characters"
        }),

    email: Joi.string()
        .email()
        .optional()
        .messages({
            "string.email": "Email must be valid"
        }),

    speciality: Joi.string()
        .min(3)
        .max(50)
        .optional()
        .messages({
            "string.min": "Speciality must be at least 3 characters",
            "string.max": "Speciality must be at most 50 characters"
        }),

    degree: Joi.string()
        .min(3)
        .max(50)
        .optional()
        .messages({
            "string.min": "degree must be at least 3 characters",
            "string.max": "degree must be at most 50 characters"
        }),

    experience: Joi.string()
        .min(3)
        .max(50)
        .optional()
        .messages({
            "string.min": "experience must be at least 3 characters",
            "string.max": "experience must be at most 50 characters"
        }),

    about: Joi.string()
        .min(3)
        .max(1000)
        .optional()
        .messages({
            "string.min": "about field must be at least 3 characters",
            "string.max": "about field must be at most 1000 characters"
        }),

    gender: Joi.string()
        .optional()
        .valid("male", "female")
        .messages({
            "any.valid": "Gender must be one of male or female",
        }),

    phone: Joi.string()
        .optional()
        .pattern(/^01([0-2]|5)[0-9]{8}$/),

    fees: Joi.number()
        .optional(),

    birth_date: Joi.date()
        .optional(),

    image: Joi.object({
        fieldname: Joi.string().optional(),
        originalname: Joi.string().optional(),
        encoding: Joi.string().optional(),
        mimetype: Joi.string().valid("image/png", "image/jpeg", "image/jpg", "image/webp").optional(),
        destination: Joi.string().optional(),
        filename: Joi.string().optional(),
        path: Joi.string().optional(),
        size: Joi.number().max(5242880).optional()
    }).optional()
}).options({ allowUnknown: false });

export {
    updateUserORMmanagerProfileSchema,
    updateDoctorProfileSchema
}