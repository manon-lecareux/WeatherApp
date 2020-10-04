var express = require('express');
var router = express.Router();

// ----    importer données BDD    ----
var userModel = require("../models/users");

/* POST Inscription. */
router.post("/sign-up", async function (req, res, next) {
  var searchEmail = await userModel.findOne({ email: req.body.emailFromFront });

  if (searchEmail === null) {
      var newUser = new userModel({
          name: req.body.usernameFromFront,
          email: req.body.emailFromFront,
          password: req.body.passwordFromFront,
      });

      var newUserSave = await newUser.save();

      req.session.user = { name: newUserSave.name, id: newUserSave._id };

      res.redirect("/weather");
  } else {
      res.redirect("/");
  }
});

/* POST Connexion. */
router.post("/sign-in", async function (req, res, next) {
  var searchUser = await userModel.findOne({ email: req.body.emailconnect, password: req.body.passwordconnect });

  if (searchUser != null) {
      req.session.user = { name: searchUser.name, id: searchUser._id };
      res.redirect("/weather");
  } else {
      res.render("login");
  }
});

/* GET Déconnexion. */
router.get("/sign-out", function (req, res, next) {
  req.session.user = null;

  res.redirect("/");
});

module.exports = router;
