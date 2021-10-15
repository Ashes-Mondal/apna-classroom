//Upload Controllers
const singleUpload = require('../model/uploads/uploads').upload.single('file')
exports.singleFileUpload = (req, res) => {
    singleUpload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            res.status(400).json({ data: null, error: 'File too large' });
            return
        }
        else if (err) {
            console.log('File upload error:', err)
            res.status(500).json({ data: null, error: err })
            return;
        }
        res.status(200).json({ data: req.file, error: null });
    })
}

const multipleUpload = require('../model/uploads/uploads').upload.array('file')
exports.multipleFileUpload = (req, res) => {
    multipleUpload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            res.status(400).json({ data: null, error: 'File too large' });
            return
        }
        else if (err) {
            console.log('File upload error:', err)
            res.status(500).json({ data: null, error: err })
            return;
        }
        res.status(200).json({ data: req.files, error: null });
    })
}

//GridFSBucket
const mongoose = require('mongoose');
let gfs;
try {
    var conn = mongoose.createConnection(global.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 1000
    });
    conn.once('open', () => {
        gfs = new mongoose.mongo.GridFSBucket(conn.db, {
            bucketName: 'Uploads',
        });
        console.log(global.color.green, 'Successfully created connection for GridFS ', global.color.reset);
    });
} catch (error) {
    console.error(global.color.red, "Failed to created connection for GridFS ", global.color.reset);
    throw (error);
}