const router = require("express").Router();

const userRoutes = require("./user-routes.js");
const dogRoutes = require("./dog-routes.js")

router.use("/users", userRoutes);
router.use("/dogs", dogRoutes);

module.exports = router;
