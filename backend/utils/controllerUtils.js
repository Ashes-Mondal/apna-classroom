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
        return await classroomModel.findById(ObjectID(classroomID), {
            studentIDs: true,
        }).studentIDs;
    } catch (e) {
        throw e;
    }
};
