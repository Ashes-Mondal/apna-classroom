const express = require('express');
const router = express.Router();
const { singleFileUpload,multipleFileUpload } = require('../utils/gridfs');

router.post('/singleUpload',singleFileUpload,(req, res) => {
    try {
        res.status(200).json({data:req.file,error:null})
    } catch (error) {
        console.log(error)
        res.status(400).json({ data: null, error: error.message || error })
    }
});

router.post('/multipleUpload',multipleFileUpload,(req, res) => {
    try {
        res.status(200).json({data:req.files,error:null})
    } catch (error) {
        console.log(error)
        res.status(400).json({ data: null, error: error.message || error })
    }
});

// Exporting routes
module.exports.router = router;