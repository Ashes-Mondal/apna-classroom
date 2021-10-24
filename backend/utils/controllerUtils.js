const userModel = require("../model/user/userSchema");

exports.isUserInClass = async (uuid, classroomID) => {
    try {
        const user = await userModel.findOne({ uuid: uuid });
        console.log("uuid ", uuid);
        console.log("user is ", user);
        return user.classroomIDs && user.classroomIDs.includes(classroomID);
    } catch (e) {
        throw e;
    }
};
