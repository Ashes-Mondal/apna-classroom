const mongoose = require("mongoose");
const submissionModel = require("../model/post/submissionSchema");
const {
    isUserInClass,
    isPostInClass,
    uuidToUserDetails,
} = require("../utils/controllerUtils");

exports.postSubmission = async (req, res) => {
    const getFileIDList = () => {
        const files = req.files;
        let fileIDs = [];
        for (let i = 0; i < files.length; i++) {
            fileIDs.push(files[i].id);
        }
        return fileIDs;
    };

    try {
        const classroomID = req.body.classroomID;
        const { userID } = await uuidToUserDetails(req.body.uuid);
        const assignmentID = req.body.assignmentID;
        if (
            isUserInClass(req.body.uuid, classroomID) &&
            isPostInClass(assignmentID, "asg", classroomID)
        ) {
            //Getting fileIDs

            const fileIDs = await getFileIDList();

            const submission = await submissionModel.findOne({
                assignmentID,
                studentID: userID,
            });
            const submissionDetails = await submissionModel.findByIdAndUpdate(
                { _id: submission._id },
                { submissionDate: Date.now(), fileIDs },
                { lean: true }
            );
            res.status(200).json({ data: submissionDetails, error: null });
        } else {
            res.status(403).json({ data: null, error: "Access Denied" });
        }
    } catch (error) {
        res.status(500).json({ data: null, error: error.message });
    }
};

exports.getSubmission = async (req, res) => {
    try {
        const classroomID = req.query.classID;
        const { userID } = await uuidToUserDetails(req.body.uuid);
        const assignmentID = req.query.asgID;
        if (
            isUserInClass(req.body.uuid, classroomID) &&
            isPostInClass(assignmentID, "asg", classroomID)
        ) {
            const submission = await submissionModel
                .findOne({
                    assignmentID,
                    studentID: userID,
                })
                .populate("fileIDs");

            res.status(200).json({ data: submission, error: null });
        } else {
            res.status(403).json({ data: null, error: "Access Denied" });
        }
    } catch (error) {
        res.status(500).json({ data: null, error: error.message });
    }
};

exports.getSubmissions = async (req, res) => {
    try {
        const classroomID = req.query.classID;
        const assignmentID = req.query.asgID;
        if (
            isUserInClass(req.body.uuid, classroomID) &&
            isPostInClass(assignmentID, "asg", classroomID)
        ) {
            const submissions = await submissionModel
                .find({
                    assignmentID,
                })
                .populate("fileIDs")
                .populate({
                    path: "studentID",
                    select: "name email",
                })
                .populate("assignmentID");

            res.status(200).json({ data: submissions, error: null });
        } else {
            res.status(403).json({ data: null, error: "Access Denied" });
        }
    } catch (error) {
        res.status(500).json({ data: null, error: error.message });
    }
};
