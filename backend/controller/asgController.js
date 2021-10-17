const mongoose = require("mongoose");
const ObjectID = mongoose.Types.ObjectId;

const userModel = require("../model/user/userSchema");
const asgModel = require("../model/post/assignmentSchema");
const classroomModel = require("../model/classroom/classroom");

exports.getAsgDetail = async (req, res) => {
    try {
        const asgID = req.params.asgID;
        const classroomID = req.params.classroomID;
        const uuid = req.body.uuid;
        if (isUserInClass(uuid, classroomID)) {
            const result = await asgModel.findById(ObjectID(asgID));
            res.status(200).json({ data: result, error: null });
        } else {
            res.status(403).json({ data: result, error: "Access Denied" });
        }
    } catch (error) {
        res.status(500).json({ data: null, error: e.message });
    }
};

exports.postAsg = async (req, res) => {
    try {
        const formData = req.body.formData;
        const classroomID = req.params.classroomID;
        const uuid = req.body.uuid;
        if (isUserInClass(uuid, classroomID)) {
            const result = await asgModel.create(formData);
            res.status(200)
                .json({ data: result, error: null })
                .redirect(`/class/${result.ClassroomID}/asg/${result._id}`);
        } else {
            res.status(403).json({ data: result, error: "Access Denied" });
        }
    } catch (error) {
        res.status(500).json({ data: null, error: error.message });
    }
};
