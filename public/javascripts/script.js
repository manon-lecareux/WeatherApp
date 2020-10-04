var mymap = L.map('worldmap',
{
    center:[48.866667, 2.333333],
    zoom:5
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '(c) <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);


var cibler = document.getElementsByClassName("ville");

// var customIcon = L.icon({
//     iconUrl: '/images/leaf-green.png',
//     shadowUrl: '/images/leaf-shadow.png',
//     iconSize:   [13, 32],
//     shadowSize:  [17, 21],
   
//     iconAnchor:  [7, 31],
//     shadowAnchor: [-1, 20],  
   
//     popupAnchor: [-3, -76]
//    });


for (var i=0; i<cibler.length; i++) {

    var longitude = cibler[i].dataset.long;
    var latitude = cibler[i].dataset.lat;
    var cityname = cibler[i].dataset.name;

    L.marker(
        [latitude, longitude]
        // , {icon: customIcon}
        ).addTo(mymap).bindPopup(cityname);

}