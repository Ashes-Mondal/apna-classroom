const Joi = require("joi");
const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
    convert: true,
};

module.exports.registerUserValidator = (req, res, next) => {
    //
    let userDetailsValidate = Joi.object().keys({
        email: Joi.string().email().required(),
        name: Joi.string().required(),
        batchCode: Joi.string(),
        role: Joi.string().required(),
    });

    let userListValidate = Joi.array().items(userDetailsValidate);

    const { error, value } = userListValidate.validate(req.body, options);
    //
    if (error) {
        console.error(error);
        res.status(400).json({
            data: null,
            error: "Invalid request parameters",
        });
        return;
    } else {
        // value.email = value.email.toLowerCase();
        req.body = value;
        next();
    }
};

module.exports.disableUserValidator = (req, res, next) => {
    //
    let userListValidate = Joi.array().items(Joi.string()).required();

    const { error, value } = userListValidate.validate(req.body, options);
    //
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

module.exports.getUserListValidator = (req, res, next) => {
    const validateQuery = Joi.object({
        role: Joi.string().required(),
        batchCode: Joi.string(),
    });
    //
    const query = validateQuery.validate(req.query, options);
    //
    if (query.error) {
        res.status(400).json({
            data: null,
            error: "Invalid request parameters",
        });
        return;
    } else {
        req.query = query.value;
        next();
    }
};

module.exports.updateUserDetailsValidator = (req, res, next) => {
    //
    let userDetailsValidate = Joi.object({
        email: Joi.string().email().required(),
        name: Joi.string().required(),
        batchCode: Joi.string(),
        role: Joi.string(),
        status: Joi.string().required(),
    });

    const { error, value } = userDetailsValidate.validate(req.body, options);
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
