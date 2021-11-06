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
    const body = validateClassroomBody.validate(req.body, options);

    const query = validateClassroomQuery.validate(req.query, options);

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

module.exports.getUserClassAssignments = (req, res, next) => {
    const validateBody = Joi.object({
        uuid: Joi.string().required(),
    });
    const validateQuery = Joi.object({
        classID: Joi.string().required(),
    });

    //
    const body = validateBody.validate(req.body, options);

    const query = validateQuery.validate(req.query, options);

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

module.exports.addStudentToClassroom = (req, res, next) => {
    const validateBody = Joi.object({
        uuid: Joi.string().required(),
        classID: Joi.string().required(),
        email: Joi.string().email().required(),
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
module.exports.unrollStudentFromClassroom = (req, res, next) => {
    const validateBody = Joi.object({
        uuid: Joi.string().required(),
        classID: Joi.string().required(),
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