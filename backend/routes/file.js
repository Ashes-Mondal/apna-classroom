const express = require('express');
const router = express.Router();
const { singleFileUpload } = require('../utils/gridfs');
// const {upload} = require('../model/uploads/uploads')

router.post('/upload',singleFileUpload,(req, res) => {
    try {
        res.status(200).json({data:req.file,error:null})
    } catch (error) {
        console.log(error)
        res.status(400).json({ data: null, error: error.message || error })
    }
});

// Exporting routes
module.exports.router = router;