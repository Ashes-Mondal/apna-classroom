//Upload Controllers
const multer = require("multer");
const singleUpload = require("../model/uploads/uploads").upload.single("file");
exports.singleFileUpload = (req, res) => {
    singleUpload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            res.status(400).json({ data: null, error: "File too large" });
            return;
        } else if (err) {
            console.log("File upload error:", err);
            res.status(500).json({ data: null, error: err });
            return;
        }
        res.status(200).json({ data: req.file, error: null });
    });
};

const multipleUpload = require("../model/uploads/uploads").upload.array("file");
exports.multipleFileUpload = (req, res) => {
    multipleUpload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            res.status(400).json({ data: null, error: "File too large" });
            return;
        } else if (err) {
            console.log("File upload error:", err);
            res.status(500).json({ data: null, error: err });
            return;
        }
        res.status(200).json({ data: req.files, error: null });
    });
};

//GridFSBucket
const mongoose = require("mongoose");
const ObjectID = mongoose.Types.ObjectId;
let gfs;
try {
    var conn = mongoose.createConnection(global.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 1000,
    });
    conn.once("open", () => {
        gfs = new mongoose.mongo.GridFSBucket(conn.db, {
            bucketName: "Uploads",
        });
        console.log(
            global.color.green,
            "Successfully created connection for GridFS ",
            global.color.reset
        );
    });
} catch (error) {
    console.error(
        global.color.red,
        "Failed to created connection for GridFS ",
        global.color.reset
    );
    throw error;
}

exports.deleteFile = (fileID) => {
    try {
        const _id = ObjectID(fileID);
        gfs.delete(_id);
    } catch (error) {
        throw error;
    }
};

exports.downloadFile = ({ query: { id } }, res) => {
    if (!id || id === "undefined") {
        res.status(400).json({ data: null, error: "No file id provided" });
        return;
    }
    gfs.find({ _id: ObjectID(id) }).toArray((err, files) => {
        if (err) {
            res.status(500).json({
                data: null,
                error: "Internal server error!",
            });
            return;
        } else if (!files || files.length === 0)
            return res
                .status(400)
                .json({ data: null, error: "No such file exist!" });
        gfs.openDownloadStream(ObjectID(id)).pipe(res);
    });
};
