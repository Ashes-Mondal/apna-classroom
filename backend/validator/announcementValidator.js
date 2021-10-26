const Joi = require("joi");
const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
    convert: true,
};

module.exports.validateAnnoucement= (req, res, next) => {
    const validateAnnoucementBody = Joi.object({
        uuid: Joi.string().required(),
    });
    const validateAnnoucementQuery = Joi.object({
        classID: Joi.string().required(),
        annouceID: Joi.string().required(),
    });
    //
    const { bodyError, bodyValue } = validateAnnoucementBody.validate(
        req.body,
        options
    );
    const { queryError, queryValue } = validateAnnoucementQuery.validate(
        req.query,
        options
    );
    //
    if (bodyError || queryError) {
        res.status(400).json({
            data: null,
            error: "Invalid request parameters",
        });
        return;
    } else {
        req.body = bodyValue;
        req.query = queryValue;
        next();
    }
};
