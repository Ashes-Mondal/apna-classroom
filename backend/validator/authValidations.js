const Joi = require("joi");
const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
    convert: true,
};

module.exports.registerValidator = (req, res, next) => {
    const registerRequestValidate = Joi.object({
        password: Joi.string().required(),
        email: Joi.string().email().required(),
    });
    //
    const { error, value } = registerRequestValidate.validate(
        req.body,
        options
    );
    //
    if (error) {
        res.status(400).json({
            data: null,
            error: "Invalid request parameters",
        });
        return;
    } else {
        value.email = value.email.toLowerCase();
        req.body = value;
        next();
    }
};

module.exports.loginValidator = (req, res, next) => {
    const loginRequestValidate = Joi.object({
        password: Joi.string().required(),
        email: Joi.string().email().required(),
    });
    //
    const { error, value } = loginRequestValidate.validate(req.body, options);
    if (error) {
        res.status(400).json({
            data: null,
            error: "Invalid request parameters",
        });
        return;
    } else {
        value.email = value.email.toLowerCase();
        req.body = value;
        next();
    }
};

module.exports.logoutValidator = (req, res, next) => {
    const logoutValidate = Joi.object({
        uuid: Joi.string().required(),
        sessionID: Joi.string().required(),
    });
    //
    const { error, value } = logoutValidate.validate(req.body, options);
    if (error) {
        res.status(400).json({
            data: null,
            error: "Invalid request parameters",
        });
        return;
    } else {
        req.body = value;
        next();
    }
};
