const express = require("express");
const router = express.Router();
//Assignment endpoints
const assignmentController = require("../controller/assignmentController");
const assignmentValidator = require("../validator/assignmentValidator");

router.get(
    "/getAssignmentDetails",
    assignmentValidator.validateAssignment,
    assignmentController.getAssignmentDetails
);
router.post(
    "/postAssignment",
    assignmentController.postAssignment
);
// Exporting routes
module.exports.router = router;