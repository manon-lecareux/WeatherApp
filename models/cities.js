// ----    initialise schéma    ----

var mongoose = require ("mongoose");

var citySchema = mongoose.Schema({
    name: String,
    url : String,
    mini : Number,
    max : Number,
    desc : String,
    long: Number,
    lat: Number
})


// ----    initialise modèle    ----

var cityModel = mongoose.model('cities', citySchema);


// ----    exporter les données    ----

module.exports = cityModel;