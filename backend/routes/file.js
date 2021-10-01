const express = require('express');
const router = express.Router();
const upload = require('../model/uploads/uploads');


router.post('/upload',upload.single('file'),(req,res)=>{

});

// Exporting routes
module.exports.router = router;