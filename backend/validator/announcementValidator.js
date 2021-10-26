const Joi = require("joi");
const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
    convert: true,
};

module.exports.validateAnnouncement = (req, res, next) => {
    const validateAnnouncementBody = Joi.object({
        uuid: Joi.string().required(),
    });
    const validateAnnouncementQuery = Joi.object({
        classID: Joi.string().required(),
        annouceID: Joi.string().required(),
    });
    //
    const { bodyError, bodyValue } = validateAnnouncementBody.validate(
        req.body,
        options
    );
    const { queryError, queryValue } = validateAnnouncementQuery.validate(
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
