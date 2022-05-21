const router = require("express").Router();
const sequelize = require('../config/connection');
const { User, Dog, Trainer, Appointment } = require('../models')

router.get('/', (req, res) => {
  console.log('======================');
  // console.log(req.session)
  Dog.findAll({
    attributes: [
      "id",
      "name",
      "age",
      "gender",
      "breed",
      "bio",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM appointment WHERE dog.id = appointment.dog_id)"
        ),
        "appointment_time",
      ],
    ],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Appointment,
        attributes: ["startDate"],
      },
      {
        model: Trainer,
        attributes: ['id', 'trainer_feedback', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
    ],
  })
    .then(dbDogData => {
      const dogs = dbDogData.map(dog => dog.get({ plain: true }))
      res.render("homepage", { dogs });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
})

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
