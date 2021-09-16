const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const AssignmentSchema = new mongoose.Schema
    (
        {
            ClassroomID: { type: Schema.Types.ObjectId, ref: 'Classrooms' },
            title: {
                type: String,
                required: true
            },
            body: {
                type: String,
                required: true
            },
            dueDate: {
                type: Date,
                required: true,
            },
            totalMarks: {
                type: Number,
                required: true,
            },
            commentIDs: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],
            submissionIDs: [{ type: Schema.Types.ObjectId, ref: 'Submissions' }],
            fileIDs: [{ type: Schema.Types.ObjectId, ref: 'Uploads' }],
        },
        {
            timestamps: true
        }
    )
module.exports = mongoose.model('Assignments', AssignmentSchema);
/*
    3.Attach files
*/