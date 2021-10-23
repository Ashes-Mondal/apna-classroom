const mongoose = require("mongoose");
const ObjectID = mongoose.Types.ObjectId;
const assignmentModel = require("../model/post/assignmentSchema");
const { isUserInClass } = require("../utils/controllerUtils");

exports.getAssignmentDetails = async (req, res) => {
    try {
        const assignmentID = req.query.asgID;
        const classroomID = req.query.classID;
        const uuid = req.body.uuid;
        const result = await assignmentModel.findById(ObjectID(assignmentID));
        if (
            result.classroomID === classroomID &&
            isUserInClass(uuid, classroomID)
        ) {
            res.status(200).json({ data: result, error: null });
        } else {
            res.status(403).json({ data: result, error: "Access Denied" });
        }
    } catch (error) {
        res.status(500).json({ data: null, error: e.message });
    }
};

exports.postAssignment = async (req, res) => {
    try {
        const formData = req.body.formData;
        const classroomID = req.body.classroomID;
        const uuid = req.body.uuid;
        if (isUserInClass(uuid, classroomID)) {
            const result = await assignmentModel.create(formData);
            res.status(200).redirect(
                `/class/${result.classroomID}/assignment/${result._id}`
            );
        } else {
            res.status(403).json({ data: result, error: "Access Denied" });
        }
    } catch (error) {
        res.status(500).json({ data: null, error: error.message });
    }
};
