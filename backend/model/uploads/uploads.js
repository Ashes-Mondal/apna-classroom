const crypto = require('crypto');
const path = require('path');
const { GridFsStorage } = require('multer-gridfs-storage');
const config = require('../../config/mongoDBConfig.json'); 
const multer = require('multer');

const storage = new GridFsStorage({
    url: config.mongoURL.replace('<password>', global.mongoDbPassword),
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    metadata:{originalname:file.originalname,},
                    bucketName: 'Uploads',
                    uploadDate:Date.now()
                };
                resolve(fileInfo);
            });
        });
    }
});
module.exports.upload = multer({ storage });
