// ----    initialise schéma    ----

var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

// ----    initialise modèle    ----

var userModel = mongoose.model("users", userSchema);

// ----    exporter les données    ----

module.exports = userModel;
