const mongoose = require("mongoose");
const express = require('express');
const router = express.Router();
const { singleFileUpload, multipleFileUpload } = require('../controller/fileController');
const ObjectID = mongoose.Types.ObjectId;

router.post('/singleUpload', singleFileUpload);
router.post('/multipleUpload', multipleFileUpload);

router.post('/streamFile', (req, res) => {
    try {
        const gfs = Grid(global.mongoConnection.db,mongoose.mongo).collection('Uploads')
        gfs.findOne({ _id: ObjectID(req.body.fileID)},function(err, found){
            if (err) console.log(err);
            else if (found) {
                console.log('File exists', found)
                res.status(200).json({ data: found, error: null });
            } else {
                console.log('File does not exist',found)
                res.status(200).json({ data: "File does not exist", error: null });
            }
        });
    } catch (error) {
        console.log(error)
        res.sendStatus(404);
    }
});

// Exporting routes
module.exports.router = router;