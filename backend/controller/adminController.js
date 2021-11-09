const userModel = require("../model/user/userSchema");

exports.registerUserController = async (req, res, next) => {
    try {
        let userList = [];
        for (let i = 0; i < req.body.list.length; i++) {
            let userDetail = userList[i];

            //check if user exists
            if (await userModel.findOne({ email: userDetail.email })) continue;

            //new user
            const uuid = await UID.createUniqueID();
            let hashPassword = await brcypt.createPasswordHash(uuid);
            userDetail.password = hashPassword;
            userDetail.uuid = uuid;
            userList.push(userDetail);
        }

        await userModel.insertMany(userList);
        res.status(200).json({
            data: `${userList.length}/${req.body.list.length} users successfully added`,
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
        const userList = batchCode
            ? await userModel.find({ batchCode })
            : await userModel.find({ role });

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
