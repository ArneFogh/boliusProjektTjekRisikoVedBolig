dawaAutocomplete.dawaAutocomplete(document.querySelector('#dawa-autocomplete-input'), {
    select: function(selected) {
        console.log('Valgt adresse: ' + selected.tekst +" "+ selected.data.x +" "+ selected.data.y);
        locationsOnMap(selected);
    }
});


function locationsOnMap(selected){
    const map = L.map("map").setView([selected.data.y, selected.data.x], 14.5);

    const tiles = L.tileLayer("https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=89TnfA8v1mRlkatNruN7", {
        maxZoom: 19,
        attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    L.marker([selected.data.y, selected.data.x]).addTo(map).bindPopup('Adresse:' +" "+ selected.tekst)
    /*
    L.icon([55.439519, 11.793025]).addTo(map).bindPopup(`<h2>Netto</h2>
        <hr>
            <p>Adresse: Næstvedvej 15, 4100 Ringsted</p>`);

     */

}
