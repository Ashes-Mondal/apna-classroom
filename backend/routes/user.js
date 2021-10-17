const express = require("express");
const router = express.Router();
//User Authentication routes
const authController = require("../controller/authController");
const authValidator = require("../validator/authValidations");
const userController = require("../controller/userController");
const classController = require("../controller/classController");

router.post(
    "/register",
    authValidator.registerValidator,
    authController.registerController
);
router.post(
    "/login",
    authValidator.loginValidator,
    authController.loginController
);
router.post(
    "/logout",
    authValidator.logoutValidator,
    authController.logoutController
);
router.post(
    "/getUserInfo",
    authValidator.logoutValidator,
    userController.getUserInfo
);

router.get(
    "/getUserClassrooms",
    authValidator.logoutValidator,
    classController.getClassrooms
);
router.get(
    "/getUpcomingAsgs/:classroomID",
    authValidator.logoutValidator,
    classController.getUpcomingAsgs
);
router.get(
    "/getClassroomDetail/:classroomID",
    authValidator.logoutValidator,
    classController.getClassroomDetail
);
// Exporting routes
module.exports.router = router;
