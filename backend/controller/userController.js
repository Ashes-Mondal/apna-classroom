const userModel = require("../model/user/userSchema");

exports.getUserInfo = async (req, res) => {
    try {
        const result = await userModel.find(
            { uuid: req.body.uuid },
            { name: true, email: true }
        );
        res.status(200).json({ data: result, error: null });
    } catch (error) {
        res.status(500).json({ data: null, error: e.message });
    }
};

exports.getUserClassrooms = async (req, res) => {
    try {
        const result = await userModel
            .find({ uuid: req.body.uuid }, { classroomIDs: true })
            .populate("classroomIDs");
        res.status(200).json({ data: result, error: null });
    } catch (error) {
        res.status(500).json({ data: null, error: error.message });
    }
};
