const router = require('express').Router();
const { Dog, User } = require('../../models');
const isAuth = require("../../utils/auth").isAuth;

// GET api/dogs 
router.get('/', (req, res) => {
  console.log('======================');
  Dog.findAll({
    attributes: ["id", "name", "age", "gender", "breed", "bio", "created_at"],
    order: [['created_at', "DESC"]],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbDogData) => res.json(dbDogData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET api/dogs/:id
router.get("/:id", (req, res) => {
  Dog.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "name", "age", "gender", "breed", "bio"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbDogData) => {
      if (!dbDogData) {
        res.status(404).json({ message: "No dog found with this id" });
        return;
      }
      res.json(dbDogData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST api/dogs
router.post("/", (req, res) => {
  Dog.create({
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
    breed: req.body.breed,
    bio: req.body.bio,
    user_id: req.body.user_id
  })
    .then((dbDogData) => res.json(dbDogData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// PUT api/dogs/:id
router.put("/:id", (req, res) => {
  Dog.update(req.body, {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbDogData) => {
      if (!dbDogData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbDogData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE api/dogs/:id
router.delete("/:id", (req, res) => {
  Dog.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbDogData) => {
      if (!dbDogData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbDogData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;