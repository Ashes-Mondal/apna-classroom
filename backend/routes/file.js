const express = require('express');
const router = express.Router();
const { upload } = require('../model/uploads/uploads');
// const gfs =  require('../mongoDBConnection');

router.post('/upload',upload.single('file'), (req, res) => {
    try {
        console.log(req.file.id,global.gfs)
        global.gfs.exist({ _id: req.file.id }, (err, found) => {
            if (err) {
                res.status(400).json({ data: null, error: err.message ? err.message : err })
                return
            }
            found ?
                res.status(200).json({ data: req.file, error: null })
                :
                res.status(400).json({ data: null, error: 'Failed to upload!' })
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({ data: null, error: error.message ? error.message : error })
    }
});

// Exporting routes
module.exports.router = router;