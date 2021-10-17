const userModel = require("../model/user/userSchema");

exports.isUserInClass = async (uuid, classroomID) => {
    try {
        const user = await userModel.find({ uuid: uuid });
        return user.classroomIDs.includes(classroomID);
    } catch (e) {
        throw e;
    }
};
