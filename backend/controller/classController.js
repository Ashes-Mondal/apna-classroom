const mongoose = require("mongoose");
const ObjectID = mongoose.Types.ObjectId;

const userModel = require("../model/user/userSchema");
const asgModel = require("../model/post/assignmentSchema");
const classroomModel = require("../model/classroom/classroom");

const isUserInClass = require("../utils/controllerUtils");

exports.getClassrooms = async (req, res) => {
    try {
        const result = await userModel
            .find({ uuid: req.body.uuid }, { password: false })
            .populate("classroomIDs");
        res.status(200).json({ data: result, error: null });
    } catch (error) {
        res.status(500).json({ data: null, error: error.message });
    }
};

exports.getUpcomingAsgs = async (req, res) => {
    try {
        const classroomID = req.params.classroomID;
        const uuid = req.body.uuid;
        if (isUserInClass(uuid, classroomID)) {
            const result = await asgModel.find({
                ClassroomID: ObjectID(classroomID),
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

exports.getClassroomDetail = async (req, res) => {
    try {
        const classroomID = req.params.classroomID;
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
