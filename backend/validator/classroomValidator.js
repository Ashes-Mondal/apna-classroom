const Joi = require("joi");
const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
    convert: true,
};

module.exports.validateClassroom = (req, res, next) => {
    const validateClassroomBody = Joi.object({
        uuid: Joi.string().required(),
    });
    const validateClassroomQuery = Joi.object({
        classID: Joi.string().required(),
    });
    //
    const { bodyError, bodyValue } = validateClassroomBody.validate(
        req.body,
        options
    );
    const { queryError, queryValue } = validateClassroomQuery.validate(
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

module.exports.createClassroom = (req, res, next) => {
    const validateClassroomBody = Joi.object({
        facultyID: Joi.string().required(),
        subjectName: Joi.string().required(),
        batchCode: Joi.string().required(),
        description: Joi.string(),
        semester: Joi.number().required(),
    });
    //
    const { error, value } = validateClassroomBody.validate(req.body, options);
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
