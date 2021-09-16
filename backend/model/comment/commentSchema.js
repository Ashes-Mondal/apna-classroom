const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const CommentSchema = new mongoose.Schema
    (
        {
            userID: { type: Schema.Types.ObjectId, ref: 'Users' },
            comment: {
                type: String,
                required: true
            },
            fileIDs: [{ type: Schema.Types.ObjectId, ref: 'GFS' }],
        },
        {
            timestamps: true
        }
    )
module.exports = mongoose.model('Comments', CommentSchema);
