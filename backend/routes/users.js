const router = require("express").Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
let User = require("../models/user.model");

// user registration
router.post("/add", (req, res) => {
  const username = req.body.username;
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    User.create({
      username,
      password: hash,
    })
      .then((user) => res.json(user))
      .catch((err) => res.status(400).json(err));
  });
});

//user login
router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ username: req.body.username })
    .then((user) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) res.json("Login successful");
      });
    })
    .catch((err) => res.status(400).json("Authentication failed.."));
});

module.exports = router;
