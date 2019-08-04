const router = require("express").Router();
const bcsRoutes = require("./bcs");

// Book routes
router.use("/bcs", bcsRoutes);

module.exports = router;
