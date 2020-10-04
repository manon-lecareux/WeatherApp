// ----    initialise bdd    ----

var mongoose = require("mongoose");

var user = "manon";
var password = "mongopsw";
var bddname = "weatherapp";

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(`mongodb+srv://${user}:${password}@cluster0.ldbfj.mongodb.net/${bddname}?retryWrites=true&w=majority`, options, function (err) {
    console.log(err);
});
