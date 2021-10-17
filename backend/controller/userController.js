const userModel = require("../model/user/userSchema");
const asgModel = require("../model/post/assignmentSchema");

exports.getUserInfo = async (req, res) => {
    try {
        const result = await userModel.find(
            { uuid: req.body.uuid },
            { password: false }
        );
        res.status(200).json({ data: result, error: null });
    } catch (error) {
        res.status(500).json({ data: null, error: e.message });
    }
};
