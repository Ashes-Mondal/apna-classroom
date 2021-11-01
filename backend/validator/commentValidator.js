const Joi = require("joi");
const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
    convert: true,
};

module.exports.postCommentValidator = (req, res, next) => {
    const postCommentValidate = Joi.object({
        body: Joi.string().required(),
        classroomID: Joi.string().required(),
        postID: Joi.string().required(),
        postType: Joi.string().required(),
        uuid: Joi.string().required(),
    });
    //
    const { error, value } = postCommentValidate.validate(req.body, options);
    console.log("body", req.body);
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
