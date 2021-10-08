const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const AnnouncementSchema = new mongoose.Schema
    (
        {
            ClassroomID: { type: Schema.Types.ObjectId, ref: 'Classrooms' },
            userID:{ type: Schema.Types.ObjectId, ref: 'Users' },
            title: {
                type: String,
                required: true
            },
            content: {
                type: String,
                required: true
            },
            commentIDs: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],
            fileIDs: [{ type: Schema.Types.ObjectId, ref: 'Uploads' }],
        },
        {
            timestamps: true
        }
    )
module.exports = mongoose.model('Announcements', AnnouncementSchema);