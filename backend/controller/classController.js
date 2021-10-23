const mongoose = require("mongoose");
const ObjectID = mongoose.Types.ObjectId;
const assignmentModel = require("../model/post/assignmentSchema");
const classroomModel = require("../model/classroom/classroom");
const isUserInClass = require("../utils/controllerUtils");

exports.getUpcomingAssignments = async (req, res) => {
    try {
        const classroomID = req.query.class;
        const uuid = req.body.uuid;
        if (isUserInClass(uuid, classroomID)) {
            const result = await assignmentModel.find({
                classroomID: ObjectID(classroomID),
                dueDate: { $gte: Date.now() },
            });
            res.status(200).json({ data: result, error: null });
        } else {
            res.status(403).json({ data: result, error: "Access Denied" });
        }
    } catch (error) {
        res.status(500).json({ data: null, error: error.message });
    }
};

exports.getClassroomDetails = async (req, res) => {
    try {
        const classroomID = req.query.classID;
        const uuid = req.body.uuid;
        if (isUserInClass(uuid, classroomID)) {
            const result = await classroomModel.findById(ObjectID(classroomID));
            res.status(200).json({ data: result, error: null });
        } else {
            res.status(403).json({ data: result, error: "Access Denied" });
        }
    } catch (error) {
        res.status(500).json({ data: null, error: error.message });
    }
};
