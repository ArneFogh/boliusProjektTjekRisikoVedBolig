

function locationsOnMap(){
    const map = L.map("map").setView([55.442797, 11.795722], 14.5);

    const tiles = L.tileLayer("https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=89TnfA8v1mRlkatNruN7", {
        maxZoom: 19,
        attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);



        L.marker([55.442797, 11.795722]).addTo(map)

    }
