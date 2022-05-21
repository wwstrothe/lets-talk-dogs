const router = require("express").Router();
const sequelize = require('../config/connection');
const { User, Dog, Trainer, Appointment } = require('../models')

router.get('/', (req, res) => {
  console.log('======================');
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



// router.get("/", (req, res) => {
//   res.render("homepage", {
//     id: 1,
//     name: "Happy",
//     age: 4,
//     gender: "male",
//     bio: "I'm a crazy boy",
//     breed: "pittbull mix",
//     trainer_feedback: 12,
//     created_at: new Date(),
//     user: {
//       username: "wwstrothe",
//     },
//   });
// });

module.exports = router;
