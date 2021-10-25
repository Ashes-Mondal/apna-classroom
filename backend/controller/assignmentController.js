const mongoose = require("mongoose");
const ObjectID = mongoose.Types.ObjectId;
const assignmentModel = require("../model/post/assignmentSchema");
const submissionModel = require("../model/post/submissionSchema");
const resultModel = require("../model/results/resultSchema");
const { isUserInClass, getStudentIDs } = require("../utils/controllerUtils");

exports.getAssignmentDetails = async (req, res) => {
    try {
        const assignmentID = req.query.asgID;
        const classroomID = req.query.classID;
        const uuid = req.body.uuid;
        const result = await assignmentModel
            .findById(ObjectID(assignmentID))
            .populate("commentIDs");
        if (
            result.classroomID === classroomID &&
            isUserInClass(uuid, classroomID)
        ) {
            res.status(200).json({ data: result, error: null });
        } else {
            res.status(403).json({ data: null, error: "Access Denied" });
        }
    } catch (error) {
        res.status(500).json({ data: null, error: e.message });
    }
};

exports.postAssignment = async (req, res) => {
    const getSubmissionList = (studentIDs, assignmentID) => {
        let submissions = [];
        for (let i = 0; i < studentIDs.length; i++) {
            submissions.push({
                assignmentID,
                studentID: studentIDs[i],
            });
        }
        return submissions;
    };

    try {
        const formData = JSON.parse(req.body.formData);
        const classroomID = req.body.classroomID;
        const uuid = req.body.uuid;
        console.log(formData, classroomID, uuid);
        if (isUserInClass(uuid, classroomID)) {
            //Getting studentIDs
            const studentIDs = await getStudentIDs(classroomID);

            //Step1: create assignment
            const asgDetails = await assignmentModel.create(formData);
            const asgID = asgDetails._id;
            if (!asgID) {
                res.status(500).json({
                    data: null,
                    error: "Failed to create the assignment.",
                });
                return;
            }

            //Step2: create empty submissions for batch
            const submissions = getSubmissionList(studentIDs, asgID);
            await submissionModel.insertMany(submissions);

            //Step3: create results for batch
            await resultModel.create({assignmentID:asgID});
            res.status(200).json({ data: {assignmentID:asgID}, error: null });
        } else {
            res.status(403).json({ data: null, error: "Access Denied" });
        }
    } catch (error) {
        res.status(500).json({ data: null, error: error.message });
    }
};