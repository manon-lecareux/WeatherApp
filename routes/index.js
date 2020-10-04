var express = require("express");
var router = express.Router();

var request = require("sync-request");

// ----    importer données BDD    ----
var cityModel = require("../models/cities");


var cityList = [];

/* GET login page. */
router.get("/", function (req, res, next) {
    res.render("login");
});

/* GET weather page. */
router.get("/weather", async function (req, res, next) {
    
    if(req.session.user == null){
        res.redirect("/")
    }else{
        // initialise citylist pour que les données apparraissent sur la page accueil
        cityList = await cityModel.find();
        res.render("weather", { cityList });
    }
    
});

/* POST ajouter ville. */
router.post("/addcity", async function (req, res, next) {
    var retweb = request("GET", `https://api.openweathermap.org/data/2.5/weather?q=${req.body.newcity.toLowerCase()}&units=metric&appid=1c78db8ead6218eba4d2ef029fddd451&lang=fr`);
    var finalweb = JSON.parse(retweb.body);

    var dejaPresent = await cityModel.findOne({
        name: req.body.newcity.toLowerCase(),
    });

    if (dejaPresent == null && finalweb.name) {
        var newCity = new cityModel({
            name: req.body.newcity.toLowerCase(),
            url: `http://openweathermap.org/img/wn/${finalweb.weather[0].icon}.png`,
            mini: finalweb.main.temp_min,
            max: finalweb.main.temp_max,
            desc: finalweb.weather[0].description,
            long: finalweb.coord.lon,
            lat: finalweb.coord.lat
        });

        await newCity.save();

        cityList = await cityModel.find();
    }

    res.render("weather", { cityList, finalweb });
});

/* GET supprimer ville. */
router.get("/delete-city", async function (req, res, next) {
    // supprime 1 elmt de la liste en fonction de son nom
    await cityModel.deleteOne({ _id: req.query.id });

    // maj la variable
    cityList = await cityModel.find();

    res.render("weather", { cityList });
});

/* GET maj page. */
router.get("/update", async function (req, res, next) {
    // initialise citylist dans la page
    cityList = await cityModel.find();

    // boucle pour chaque élément présent dans la BDD
    for (var i = 0; i < cityList.length; i++) {
        // rappel les données webservice
        var retweb = await request("GET", `https://api.openweathermap.org/data/2.5/weather?q=${cityList[i].name.toLowerCase()}&units=metric&appid=1c78db8ead6218eba4d2ef029fddd451&lang=fr`);
        var finalweb = JSON.parse(retweb.getBody());

        // maj les infos de la BDD avec les infos retournées
        await cityModel.updateOne(
            { _id: cityList[i].id },
            {
                name: cityList[i].name.toLowerCase(),
                url: `http://openweathermap.org/img/wn/${finalweb.weather[0].icon}.png`,
                mini: finalweb.main.temp_min,
                max: finalweb.main.temp_max,
                desc: finalweb.weather[0].description,
                
                
            }
        );
    }

    // maj la variable
    cityList = await cityModel.find();

    res.render("weather", { cityList });
});



module.exports = router;
