const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const SubmissionSchema = new mongoose.Schema
    (
        {
            AssignmentID: { type: Schema.Types.ObjectId, ref: 'Assignments' },
            studentID: { type: Schema.Types.ObjectId, ref: 'Users' },
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
            marks: {
                type: Number,
                required: true,
            },
            fileIDs: [{ type: Schema.Types.ObjectId, ref: 'Uploads' }],
        },
        {
            timestamps: true
        }
    )
module.exports = mongoose.model('Submissions', SubmissionSchema);