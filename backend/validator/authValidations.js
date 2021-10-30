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
        name: Joi.string().required(),
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

module.exports.resetPassword = (req, res, next) => {
    const resetPasswordValidate = Joi.object({
        newPassword: Joi.string().required(),
        accessToken: Joi.string().required(),
    });
    //
    const { error, value } = resetPasswordValidate.validate(req.body, options);
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
module.exports.sendResetPasswordEmail = (req, res, next) => {
    const sendResetPasswordEmailValidate = Joi.object({
        email: Joi.string().email().required(),
    });
    //
    const { error, value } = sendResetPasswordEmailValidate.validate(
        req.body,
        options
    );
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

module.exports.meetAccessValidator = (req, res, next) => {
    const validateBody = Joi.object({
        uuid: Joi.string().required(),
    });
    const validateQuery = Joi.object({
        classID: Joi.string().required(),
        meetID: Joi.string().required(),
    });
    //
    const body = validateBody.validate(
        req.body,
        options
    );
    const query = validateQuery.validate(
        req.query,
        options
    );
    //
    if (body.error || query.error) {
        res.status(400).json({
            data: null,
            error: "Invalid request parameters",
        });
        return;
    } else {
        req.body = body.value;
        req.query = query.value;
        next();
    }
};