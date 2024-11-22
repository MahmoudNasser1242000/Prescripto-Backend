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
        .allow(null, "")
        .messages({
            "string.min": "about field must be at least 3 characters",
            "string.max": "about field must be at most 1000 characters"
        }),

    gender: Joi.string()
        .optional()
        .valid("male", "female")
        .default("male")
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

    profile: Joi.string()
        .allow(null, " ")
        .optional(),

    image: Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid("image/png", "image/jpeg", "image/jpg", "image/webp").required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5242880).required()
    }).optional()
}).options({ allowUnknown: false });

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
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid("image/png", "image/jpeg", "image/jpg", "image/webp").required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5242880).required()
    }).optional()
}).options({ allowUnknown: false });

const chanagePasswordSchema = Joi.object({
    password: Joi.string()
        .required()
        .min(6)
        .max(50)
        .pattern(/^(?=.*\d{3,})(?=(.*[\W_])+)(?=.*[a-zA-Z]{2,})(?=.*[A-Z]+).{6,20}$/)
        .messages({
            "string.pattern.base": `Password must contains at least 3 numbers,
            2 characters one of them must be uppercase 
            and one special character`,
            "string.min": "Password must be 6 to 50 characters",
            "string.max": "Password must be 6 to 50 characters"
        }),

    newPassword: Joi.string()
        .required()
        .min(6)
        .max(50)
        .pattern(/^(?=.*\d{3,})(?=(.*[\W_])+)(?=.*[a-zA-Z]{2,})(?=.*[A-Z]+).{6,20}$/)
        .messages({
            "string.pattern.base": `Password must contains at least 3 numbers,
            2 characters one of them must be uppercase 
            and one special character`,
            "string.min": "Password must be 6 to 50 characters",
            "string.max": "Password must be 6 to 50 characters"
        }),

    repassword: Joi.string()
        .required()
        .valid(Joi.ref('newPassword'))
        .messages({
            "any.valid": "Password and repassword must be matched",
        }),
}).options({ allowUnknown: false });
export {
    updateUserORMmanagerProfileSchema,
    updateDoctorProfileSchema,
    chanagePasswordSchema
}