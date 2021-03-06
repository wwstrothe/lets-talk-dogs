const router = require("express").Router();
const passport = require("passport");
const genPassword = require("../../lib/passwordUtils").genPassword;
const connection = require("../../config/connection");
const { User, Dog, Appointment, Trainer } = require("../../models");
const isAuth = require("../../utils/auth").isAuth;
const isAdmin = require("../../utils/auth").isAdmin;

// GET /api/users
router.get("/", (req, res) => {
  console.log("======================");
  User.findAll({
    // attributes: { exclude: ['password'] }
  })
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// POST /api/users/login
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/",
  }),
  function (req, res) {
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json(dbUserData);
    });
  }
);

router.get("/logout", isAuth, (req, res, next) => {
  req.logout();
  res.redirect("/");
});

// GET /api/users/:id
router.get("/:id", (req, res) => {
  console.log("======================");
  User.findOne({
    // attributes: { exclude: ['password'] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Dog,
        attributes: ["id", "name", "age"],
      },

      {
        model: Dog,
        attributes: ["name"],
        through: Appointment,
        as: "appointment_time",
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST /api/users
router.post("/", (req, res) => {
  console.log("======================");
  const saltHash = genPassword(req.body.password);
  const salt = saltHash.salt;
  const hash = saltHash.hash;
  User.create({
    username: req.body.username,
    email: req.body.email,
    hash: hash,
    salt: salt,
    admin: true,
  })
    .then((dbUserData) => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// PUT /api/users/:id
router.put("/:id", isAuth, (req, res) => {
  console.log("======================");
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE /api/users/:id
router.delete("/:id", isAdmin, (req, res) => {
  console.log("======================");
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
