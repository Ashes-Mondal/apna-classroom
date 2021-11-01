const mongoose = require("mongoose");
const ObjectID = mongoose.Types.ObjectId;
require("../model/comment/commentSchema");
require("../model/uploads/uploads").uploadMetaModel;
const assignmentModel = require("../model/post/assignmentSchema");
const announcementModel = require("../model/post/announcementSchema");
const classroomModel = require("../model/classroom/classroom");
const { isUserInClass } = require("../utils/controllerUtils");
const userModel = require("../model/user/userSchema");
const submissionModel = require("../model/post/submissionSchema");
const studentClassAvgModel = require("../model/results/StudentClassAvgSchema");
const { nanoid } = require("nanoid");

exports.getUpcomingAssignments = async (req, res) => {
    try {
        const classroomID = req.query.classID;
        const studentID = req.query.id;
        const uuid = req.body.uuid;
        if (isUserInClass(uuid, classroomID)) {
            const result = await submissionModel
                .find({
                    studentID: ObjectID(studentID),
                    submissionDate: { $exists: false },
                })
                .populate({
                    path: "assignmentID",
                    match: { classroomID: ObjectID(classroomID) },
                });
            res.status(200).json({
                data: result.filter((item) => item.assignmentID),
                error: null,
            });
        } else {
            res.status(403).json({ data: null, error: "Access Denied" });
        }
    } catch (error) {
        res.status(500).json({ data: null, error: error.message });
    }
};

exports.getUserClassAssignments = async (req, res) => {
    try {
        const classroomID = req.query.classID;
        const studentID = req.query.id;
        const uuid = req.body.uuid;
        if (isUserInClass(uuid, classroomID)) {
            const result = await submissionModel
                .find({
                    studentID: ObjectID(studentID),
                })
                .populate({
                    path: "assignmentID",
                    match: {
                        classroomID: ObjectID(classroomID),
                    },
                });
            let assignmentIDs = [];
            let assignments = result.filter((asg) => {
                if (asg.assignmentID) {
                    assignmentIDs.push(asg.assignmentID._id);
                    return true;
                }
                return false;
            });
            //calculate class Average
            const studentAvg = await studentClassAvgModel.find({
                classroomID,
                studentID,
            });
            if (assignments.length && studentAvg.length) {
                res.status(200).json({
                    data: {
                        assignments,
                        classAverage:
                            studentAvg[0].totalMarks /
                            studentAvg[0].correctedSubmissions,
                    },
                    error: null,
                });
            } else {
                res.status(404).json({
                    data: null,
                    error: "Failed to fetch data!",
                });
            }
        } else {
            res.status(403).json({ data: null, error: "Access Denied" });
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
                .populate({
                    path: "commentIDs",
                    populate: { path: "userID", select: "name" },
                })
                .populate({
                    path: "facultyID",
                    select: "name email",
                })
                .populate("fileIDs");

            const annFeed = await announcementModel
                .find({
                    classroomID: classroomID,
                })
                .populate({
                    path: "commentIDs",
                    populate: { path: "userID", select: "name" },
                })
                .populate({
                    path: "userID",
                    select: "name email",
                })
                .populate("fileIDs");
            let feed = [...asgFeed, ...annFeed];
            feed.sort((a, b) => b.createdAt - a.createdAt);
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
            meetingID: nanoid(10),
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
        //create studentclassavg for all enrolled students
        let insertOption = [];
        for (let i = 0; i < studentIDs.length; i++) {
            insertOption.push({
                classroomID: classID,
                studentID: studentIDs[i],
            });
        }
        await studentClassAvgModel.insertMany(insertOption);
        if (classID) {
            res.status(200).json({ data: result, error: null });
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
