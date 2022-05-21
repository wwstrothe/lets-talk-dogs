const router = require("express").Router();

const userRoutes = require("./user-routes.js");
const dogRoutes = require("./dog-routes.js");
const trainerRoutes = require('./trainer-routes.js');

router.use("/users", userRoutes);
router.use("/dogs", dogRoutes);
router.use('/trainers', trainerRoutes);

module.exports = router;
