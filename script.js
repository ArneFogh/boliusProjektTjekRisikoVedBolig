dawaAutocomplete.dawaAutocomplete(document.querySelector('#dawa-autocomplete-input'), {
    select: function(selected) {

        console.log('Valgt adresse: ' + selected.tekst +" "+ selected.data.x +" "+ selected.data.y);
        locationsOnMap(selected);
    }
});

const map = L.map("map")
const tiles = L.tileLayer("https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=89TnfA8v1mRlkatNruN7", {
    maxZoom: 19,
    attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
map.setView([55.87, 10.64], 6.5);


function locationsOnMap(selected){
    map.setView([selected.data.y, selected.data.x], 14.5);

    L.marker([selected.data.y, selected.data.x]).addTo(map).bindPopup('Adresse:' +" "+ selected.tekst)

    for (let i = 0; i < stations.length; i++) {
        L.circle([stations[i].Latitude, stations[i].Longitude]).addTo(map).bindPopup(stations[i].Column2);
    }


}


function burgerFunction() {
    const x = document.querySelector("#burgerDiv");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}