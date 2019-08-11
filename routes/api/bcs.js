const router = require("express").Router();
const bcsController = require("../../controllers/bcsController");
const genericController = require("../../controllers/genericController");
const axios = require("axios");

router.route("/")
  .get(genericController.landing);

router.route("/login")
  .post(bcsController.login);

// router.route("/getSession")
//   .post(bcsController.getSession);

// router.route("/getSessions/")
//   .post(bcsController.getSessions);

router.route("/getSessions/:enrollmentID")
  .get(bcsController.getSessionsGet);

router.route("/getEnrollments/")
  .get(bcsController.getEnrollments);

module.exports = router;
