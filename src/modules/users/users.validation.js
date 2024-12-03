import Joi from 'joi';

const addUserSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.min": "user name must be at least 3 characters",
            "string.max": "user name must be at most 50 characters"
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
            "string.pattern.base": `Password must contains at least 3 numbers,
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

    bio: Joi.string()
        .min(3)
        .max(1000)
        .optional()
        .messages({
            "string.min": "bio field must be at least 3 characters",
            "string.max": "bio field must be at most 1000 characters"
        }),

    gender: Joi.string()
        .optional()
        .valid("male", "female")
        .default("male")
        .messages({
            "any.valid": "Gender must be one of male or female",
        }),

    role: Joi.string()
        .optional()
        .valid("manager")
        .messages({
            "any.valid": "Role must be manager only",
        }),

    phone: Joi.string()
        .required()
        .pattern(/^01([0-2]|5)[0-9]{8}$/),

    birth_date: Joi.date()
        .required(),

    job: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            "string.min": "Job field must be at least 3 characters",
            "string.max": "Job field must be at most 100 characters"
        }),

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

const updateUserSchema = Joi.object({
    active: Joi.boolean()
        .required(),

    activeExpire: Joi.date()
        .allow(null)
        .optional(),

    userId: Joi.string().hex().length(24).required(),
}).options({ allowUnknown: false });

const userIdSchema = Joi.object({
    userId: Joi.string().hex().length(24).required(),
}).options({ allowUnknown: false });

export {
    addUserSchema,
    userIdSchema,
    updateUserSchema,
}