const Joi = require("joi");
const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
    convert: true,
};

module.exports.validateAssignment = (req, res, next) => {
    const validateAssignmentBody = Joi.object({
        uuid: Joi.string().required(),
    });
    const validateAssignmentQuery = Joi.object({
        classID: Joi.string().required(),
        asgID: Joi.string().required(),
    });
    //
    const body = validateAssignmentBody.validate(req.body, options);
    const query = validateAssignmentQuery.validate(req.query, options);
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
