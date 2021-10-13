const singleUpload = require('../model/uploads/uploads').upload.single('file')
exports.singleFileUpload = (req,res,next) => {
    singleUpload(req,res, (err) => {
        if (err) {
            console.log('File upload error:',err)
            res.status(500).json({data:null,error:err})
            return;
        }
        next();
    })
}

const multipleUpload = require('../model/uploads/uploads').upload.array('file')
exports.multipleFileUpload = (req,res,next) => {
    multipleUpload(req,res, (err) => {
        if (err) {
            console.log('File upload error:',err)
            res.status(500).json({data:null,error:err})
            return;
        }
        next();
    })
}