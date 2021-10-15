const express = require('express');
const router = express.Router();
const fileController = require('../controller/fileController');

router.post('/singleUpload', fileController.singleFileUpload);
router.post('/multipleUpload', fileController.multipleFileUpload);
router.get('/file/:fileID', fileController.downloadFile);

// Exporting routes
module.exports.router = router;