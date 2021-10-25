const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const SubmissionSchema = new mongoose.Schema
    (
        {
            assignmentID: { type: Schema.Types.ObjectId, ref: 'Assignments' },
            studentID: { type: Schema.Types.ObjectId, ref: 'Users' },
            marks: {
                type: Number,
                default:-1,
                required:true
            },
            fileIDs: [{ type: Schema.Types.ObjectId, ref: 'Uploads' }],
        },
        {
            timestamps: true
        }
    )
module.exports = mongoose.model('Submissions', SubmissionSchema);