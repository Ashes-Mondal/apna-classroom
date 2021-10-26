const express = require("express");
const router = express.Router();
//Assignment endpoints
const announcementController = require("../controller/announcementController");
const { multipleFileUpload } = require("../controller/fileController");
const announcementValidator = require("../validator/announcementValidator");

router.get(
    "/getAnnoucementDetails",
    announcementValidator.validateAnnoucement,
    announcementController.getAnnoucementDetails
);
router.post(
    "/postAnnoucement",
    multipleFileUpload,
    announcementController.postAnnoucement
);
// Exporting routes
module.exports.router = router;