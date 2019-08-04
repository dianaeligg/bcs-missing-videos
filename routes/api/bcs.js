const router = require("express").Router();
const bcsController = require("../../controllers/bcsController");
const genericController = require("../../controllers/genericController");

router.route("/")
  .get(genericController.landing);

router
  .route("/:id")
  .get(bcsController.findById)
  .put(bcsController.update)
  .delete(bcsController.remove);

module.exports = router;
