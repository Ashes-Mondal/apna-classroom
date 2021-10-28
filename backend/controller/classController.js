const mongoose = require("mongoose");
const ObjectID = mongoose.Types.ObjectId;
const assignmentModel = require("../model/post/assignmentSchema");
const announcementModel = require("../model/post/announcementSchema");
const classroomModel = require("../model/classroom/classroom");
const commentsModel = require("../model/comment/commentSchema");
const { uploadMetaModel } = require("../model/uploads/uploads");
const { isUserInClass } = require("../utils/controllerUtils");
const userModel = require("../model/user/userSchema");

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

exports.getPostFeed = async (req, res) => {
    try {
        const classroomID = req.query.classID;
        const uuid = req.body.uuid;
        if (isUserInClass(uuid, classroomID)) {
            const asgFeed = await assignmentModel
                .find({
                    classroomID: classroomID,
                })
                .populate("commentIDs")
                .populate({
                    path: "facultyID",
                    select: "name email",
                })
                .populate("fileIDs");

            const annFeed = await announcementModel
                .find({
                    classroomID: classroomID,
                })
                .populate("commentIDs")
                .populate({
                    path: "userID",
                    select: "name email",
                })
                .populate("fileIDs");
            let feed = [...asgFeed, ...annFeed];
            feed.sort((a, b) => a.createdAt - b.createdAt);
            res.status(200).json({ data: feed, error: null });
        } else {
            res.status(403).json({ data: result, error: "Access Denied" });
        }
    } catch (error) {
        res.status(500).json({ data: null, error: error.message });
    }
};

exports.createClassroom = async (req, res) => {
    try {
        const themes = [
            "orange",
            "purple",
            "blue",
            "red",
            "green",
            "yellow",
            "orange",
        ];
        const theme = themes[Math.floor(Math.random() * 6)];
        const studentIDs = await userModel.find(
            { batchCode: req.body.batchCode },
            { _id: true }
        );
        const result = await classroomModel.create({
            ...req.body,
            theme,
            studentIDs,
        });
        const classID = result._id;
        //enroll students to the classroom
        await userModel.updateMany(
            {
                $or: [
                    { batchCode: req.body.batchCode },
                    { _id: req.body.facultyID },
                ],
            },
            { $push: { classroomIDs: classID } }
        );
        if (classID) {
            res.status(200).json({ data: classID, error: null });
        } else {
            res.status(500).json({
                data: null,
                error: "Internal Server Error!",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ data: null, error: error.message });
    }
};
