const mongoose = require("mongoose");
const ObjectID = mongoose.Types.ObjectId;
const userModel = require("../model/user/userSchema");
const classroomModel = require("../model/classroom/classroom");

exports.isUserInClass = async (uuid, classroomID) => {
    try {
        const user = await userModel.findOne({ uuid: uuid });
        return (
            user && user.classroomIDs && user.classroomIDs.includes(classroomID)
        );
    } catch (e) {
        throw e;
    }
};

exports.getStudentIDs = async (classroomID) => {
    try {
        const result = await classroomModel.findById(ObjectID(classroomID), {
            studentIDs: true,
        });
        return result.studentIDs;
    } catch (e) {
        throw e;
    }
};
