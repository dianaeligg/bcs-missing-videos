const router = require("express").Router();
const bcsController = require("../../controllers/bcsController");
const genericController = require("../../controllers/genericController");
const axios = require("axios");

router.route("/")
  .get(genericController.landing);

router.route("/login")
  .post(bcsController.login);

router.route("/getSessions/:enrollmentID")
  .get(bcsController.getSessionsGet);

router.route("/getEnrollments/")
  .get(bcsController.getEnrollments);

router.route("/getAttendance/:enrollmentID")
  .get(bcsController.getAttendance);

router.route("/getAttendance/:enrollmentID/filter")
  .get(bcsController.getAttendanceFilter);

router.route("/getAssignments/:enrollmentID/")
  .get(bcsController.getAssignments);

module.exports = router;
