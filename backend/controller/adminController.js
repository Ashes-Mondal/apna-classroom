const userModel = require("../model/user/userSchema");
const classroomModel = require("../model/classroom/classroom");
const UID = require("../utils/uid");
const bcrypt = require("../utils/userPassword");

exports.registerUserController = async (req, res, next) => {
    try {
        let classrooms = await classroomModel.find();
        let lookup = {};
        classrooms.forEach(
            (classroom) =>
                (lookup[classroom.batchCode] = [
                    ...lookup[classroom.batchCode],
                    classroom._id,
                ])
        );

        let userList = [];
        for (let i = 0; i < req.body.length; i++) {
            let userDetail = req.body[i];
            console.log("req body", req.body);
            console.log("userdetail", userDetail);
            //check if user exists
            if (await userModel.findOne({ email: userDetail.email })) continue;

            //new user
            const uuid = await UID.createUniqueID();
            let hashPassword = await bcrypt.createPasswordHash(uuid);
            userDetail.password = hashPassword;
            userDetail.uuid = uuid;

            userDetail.classroomIDs = lookup[userDetail.batchCode] || [];
            userList.push(userDetail);
        }

        await userModel.insertMany(userList);

        res.status(200).json({
            data: `${userList.length}/${req.body.length} users successfully added`,
            error: null,
        });
    } catch (e) {
        res.status(400).json({ data: null, error: e.message });
    }
};

exports.disableUserController = async (req, res, next) => {
    try {
        const { nModified } = await userModel.updateMany(
            { email: { $in: req.body.emailList } },
            { $set: { status: "inactive" } }
        );
        res.status(200).json({
            data: `${nModified}/${req.body.emailList.length} users disabled successfully`,
            error: null,
        });
    } catch (e) {
        res.status(500).json({ data: null, error: e.message });
    }
};

exports.getUserListController = async (req, res, next) => {
    try {
        const { role, batchCode } = req.query;
        if (role !== "student" || role !== "teacher" || role !== "admin") {
            res.status(400).json({
                data: null,
                error: "Invalid role specified!",
            });
            return;
        }
        const userList =
            role === "student" && batchCode
                ? await userModel.find(
                      { batchCode },
                      { name: 1, email: 1, role: 1, batchCode: 1, status: 1 }
                  )
                : await userModel.find(
                      { role },
                      { name: 1, email: 1, role: 1, status: 1 }
                  );

        res.status(200).json({
            data: userList,
            error: null,
        });
    } catch (e) {
        res.status(500).json({ data: null, error: e.message });
    }
};

exports.updateUserDetailsController = async (req, res, next) => {
    try {
        const { email } = req.body;
        const { nModified } = await userModel.updateOne(
            { email },
            { $set: req.body }
        );

        res.status(200).json({
            data: `${nModified} documents updated`,
            error: null,
        });
    } catch (e) {
        res.status(500).json({ data: null, error: e.message });
    }
};
