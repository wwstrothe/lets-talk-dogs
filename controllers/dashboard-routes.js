const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Dog, Comment, Appointment } = require('../models')

router.get("/", (req, res) => {
    console.log(req.session);
    console.log("======================");
  Dog.findAll({
    where: {
      user_id: req.session.user_id,
    },
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
        model: Comment,
        attributes: ['id', 'comment_text', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
    ],
  })
    .then(dbDogData => {
      const dogs = dbDogData.map(dog => dog.get({ plain: true }))
      res.render("dashboard", { 
        dogs,
        loggedIn: true
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;