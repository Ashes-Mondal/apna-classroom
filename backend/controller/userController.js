const userModel = require("../model/user/userSchema");

exports.getUserInfo = async (req, res) => {
    try {
        const result = await userModel.find(
            { uuid: req.body.uuid },
            { password: false }
        );
        result.length
            ? res.status(200).json({ data: result, error: null })
            : res.status(404).json({ data: null, error: "No record found" });
    } catch (error) {
        res.status(400).json({ data: null, error: e.message });
    }
};

exports.getClassrooms = async (req, res) => {
    try {
        const result = await userModel
            .find({ uuid: req.body.uuid }, { password: false })
            .populate("classroomIDs");
        result.length
            ? res.status(200).json({ data: result, error: null })
            : res.status(404).json({ data: null, error: "No record found" });
    } catch (error) {
        res.status(400).json({ data: null, error: e.message });
    }
};
