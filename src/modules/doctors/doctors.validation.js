import Joi from 'joi';

const addDoctorSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.min": "Doctor name must be at least 3 characters",
            "string.max": "Doctor name must be at most 50 characters"
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.email": "Email must be valid"
        }),

    password: Joi.string()
        .required()
        .min(6)
        .max(50)
        .pattern(/^(?=.*\d{3,})(?=(.*[\W_])+)(?=.*[a-zA-Z]{2,})(?=.*[A-Z]+).{6,20}$/)
        .messages({
            "string.pattern": `Password must contains at least 3 numbers,
            2 characters one of them must be uppercase 
            and one special character`,
            "string.min": "Password must be 6 to 50 characters",
            "string.max": "Password must be 6 to 50 characters"
        }),

    repassword: Joi.string()
        .required()
        .valid(Joi.ref('password'))
        .messages({
            "any.valid": "Password and repassword must be matched",
        }),

    speciality: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.min": "Speciality must be at least 3 characters",
            "string.max": "Speciality must be at most 50 characters"
        }),

    degree: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.min": "degree must be at least 3 characters",
            "string.max": "degree must be at most 50 characters"
        }),

    experience: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.min": "experience must be at least 3 characters",
            "string.max": "experience must be at most 50 characters"
        }),

    about: Joi.string()
        .min(3)
        .max(1000)
        .required()
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

    role: Joi.string()
        .optional()
        .valid("doctor")
        .messages({
            "any.valid": "Role must be doctor only",
        }),

    phone: Joi.string()
        .required()
        .pattern(/^01([0-2]|5)[0-9]{8}$/),

    available: Joi.boolean()
        .optional()
        .default(true),

    fees: Joi.number()
        .required(),

    birth_date: Joi.date()
        .required(),

    image: Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid("image/png", "image/jpeg", "image/jpg", "image/webp").required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5242880).required()
    }).required()
}).options({ allowUnknown: false });

const updateDoctorSchema = Joi.object({
    available: Joi.boolean()
        .optional()
        .default(true),

    active: Joi.boolean()
        .default(true)
        .optional(),

    activeExpire: Joi.date()
        .default("0000-01-01T00:00:00Z")
        .optional(),

    docId: Joi.string().hex().length(24).optional(),
}).options({ allowUnknown: false });

const doctorIdSchema = Joi.object({
    docId: Joi.string().hex().length(24).optional(),
}).options({ allowUnknown: false });

export {
    addDoctorSchema,
    updateDoctorSchema,
    doctorIdSchema
}