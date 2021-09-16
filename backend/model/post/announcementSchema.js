const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const AnnouncementSchema = new mongoose.Schema
    (
        {
            ClassroomID: { type: Schema.Types.ObjectId, ref: 'Classrooms' },
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
/*
    3.Attach files
    4.userID:ref->userSchema
*/