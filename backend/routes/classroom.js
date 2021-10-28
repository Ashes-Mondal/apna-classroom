const express = require("express");
const router = express.Router();
//Classroom routes
const classController = require("../controller/classController");
const classroomValidator = require("../validator/classroomValidator");

router.get(
    "/getUpcomingAssignments",
    classroomValidator.validateClassroom,
    classController.getUpcomingAssignments
);
router.get(
    "/getClassroomDetails",
    classroomValidator.validateClassroom,
    classController.getClassroomDetails
);
router.post(
    "/createClassroom",
    classroomValidator.createClassroom,
    classController.createClassroom
);
router.get(
    "/getPostFeed",
    classroomValidator.validateClassroom,
    classController.getPostFeed
);
// Exporting routes
module.exports.router = router;
