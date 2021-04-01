const Joi = require('@hapi/joi');

const registrationValidator = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required().alphanum(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    })
    return schema.validate(data);
}

const loginValidator = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data);
}

module.exports.registrationValidator = registrationValidator;
module.exports.loginValidator = loginValidator;
