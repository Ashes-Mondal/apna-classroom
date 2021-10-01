const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const SubmissionSchema = new mongoose.Schema
    (
        {
            AssignmentID: { type: Schema.Types.ObjectId, ref: 'Assignments' },
            studentID: { type: Schema.Types.ObjectId, ref: 'Users' },
            marks: {
                type: Number,
                default:-1
            },
            fileIDs: [{ type: Schema.Types.ObjectId, ref: 'Uploads' }],
        },
        {
            timestamps: true
        }
    )
module.exports = mongoose.model('Submissions', SubmissionSchema);