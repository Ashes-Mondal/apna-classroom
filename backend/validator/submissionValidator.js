const Joi = require("joi");
const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
    convert: true,
};

module.exports.postSubmissionValidator = (req, res, next) => {
    const validateBody = Joi.object({
        uuid: Joi.string().required(),
        classroomID: Joi.string().required(),
        assignmentID: Joi.string().required(),
    });
    const body = validateBody.validate(req.body, options);
    if (body.error) {
        res.status(400).json({
            data: null,
            error: "Invalid request parameters",
        });
        return;
    } else {
        req.body = body.value;
        next();
    }
};
module.exports.getSubmissionValidator = (req, res, next) => {
    const validateBody = Joi.object({
        uuid: Joi.string().required(),
    });
    const validateQuery = Joi.object({
        classID: Joi.string().required(),
        asgID: Joi.string().required(),
    });
    const body = validateBody.validate(req.body, options);
    const query = validateQuery.validate(req.query, options);
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
module.exports.saveMarksValidator = (req, res, next) => {
    const validateBody = Joi.object({
        uuid: Joi.string().required(),
        classroomID: Joi.string().required(),
        assignmentID: Joi.string().required(),
        marks: Joi.number().required(),
        studentID: Joi.string().required(),
    });
    const body = validateBody.validate(req.body, options);
    if (body.error) {
        res.status(400).json({
            data: null,
            error: "Invalid request parameters",
        });
        return;
    } else {
        req.body = body.value;
        next();
    }
};
