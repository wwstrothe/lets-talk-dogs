const router = require("express").Router();
const { Trainer } = require("../../models");
const sequelize = require("../../config/connection");
// const isAdmin = require("../../utils/auth").isAdmin;

router.get("/", (req, res) => {
  console.log("======================");
  Trainer.findAll()
    .then((dbTrainerData) => res.json(dbTrainerData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  console.log("======================");
  Trainer.create({
    trainer_feedback: req.body.trainer_feedback,
    user_id: req.body.user_id,
    dog_id: req.body.dog_id
  })
    .then(dbTrainerData => res.json(dbTrainerData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:id", (req, res) => {
  console.log("======================");
  Trainer.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbTrainerData) => {
      if (!dbTrainerData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbTrainerData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;