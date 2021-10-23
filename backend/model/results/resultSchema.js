const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const ResultSchema = new mongoose.Schema(
    {
        assignmentID: { type: Schema.Types.ObjectId, ref: "Assignments" },
        totalMarks: {
            type: Number,
            default: 0,
            required: true,
        },
        correctedSubmissions: {
            type: Number,
            default: 0,
            required: true,
        },
        averageMarks: {
            type: Number,
            default: 0,
            required: true,
        },
        highestMarks: {
            type: Number,
            default: 0,
            required: true,
        },
        lowestMarks: {
            type: Number,
            default: 0,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("Results", ResultSchema);
