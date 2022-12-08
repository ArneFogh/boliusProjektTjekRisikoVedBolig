dawaAutocomplete.dawaAutocomplete(document.querySelector('#dawa-autocomplete-input'), {
    select: function(selected) {

        console.log('Valgt adresse: ' + selected.tekst +" "+ selected.data.x +" "+ selected.data.y);
        locationsOnMap(selected);
        politicChart();
        tabelNearBy();

    }
});

const map = L.map("map")
const tiles = L.tileLayer("https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=89TnfA8v1mRlkatNruN7", {
    maxZoom: 19,
    attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
map.setView([55.87, 10.64], 6.5);


let shoppingCart = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/4297/4297127.png',

    iconSize:     [25, 25], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

let drugstoreIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/4286/4286462.png',

    iconSize:     [25, 25], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

let hospitalIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3307/3307107.png',

    iconSize:     [25, 25], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

let kindergardenIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/8469/8469812.png',

    iconSize:     [25, 25], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

let resturantIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/638/638523.png',

    iconSize:     [25, 25], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

let schoolIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/991/991922.png',

    iconSize:     [25, 25], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});



function locationsOnMap(selected){
    map.setView([selected.data.y, selected.data.x], 14.5);

    L.marker([selected.data.y, selected.data.x]).addTo(map).bindPopup('Adresse:' +" "+ selected.tekst)

    for (let i = 0; i < stations.length; i++) {
        L.circle([stations[i].Latitude, stations[i].Longitude]).addTo(map).bindPopup(stations[i].Column2);
    }


    for (let i = 0; i < grocery.length; i++) {
        const navn = grocery[i].Navn;
        const address = grocery[i].Adresse;
        const distance = grocery[i].Afstand
        L.marker([grocery[i].Latitude, grocery[i].Longitude], {icon: shoppingCart}).addTo(map).bindPopup(`<h3>${navn}</h3>
        <hr>
        <p>Adresse: ${address}</p>
        <p>Afstand i meter: ${distance}</p>`);
    }

    for (let i = 0; i < drugstore.length; i++) {
        const navn = drugstore[i].Navn;
        const address = drugstore[i].Adresse;
        const distance = drugstore[i].Afstand
        L.marker([drugstore[i].Latitude, drugstore[i].Longitude], {icon: drugstoreIcon}).addTo(map).bindPopup(`<h3>${navn}</h3>
        <hr>
        <p>Adresse: ${address}</p>
        <p>Afstand i meter: ${distance}</p>`);
    }

    for (let i = 0; i < hospital.length; i++) {
        const navn = hospital[i].Navn;
        const address = hospital[i].Adresse;
        const distance = hospital[i].Afstand
        L.marker([hospital[i].Latitude, hospital[i].Longitude], {icon: hospitalIcon}).addTo(map).bindPopup(`<h3>${navn}</h3>
        <hr>
        <p>Adresse: ${address}</p>
        <p>Afstand i meter: ${distance}</p>`);
    }

    for (let i = 0; i < kindergarden.length; i++) {
        const navn = kindergarden[i].Navn;
        const address = kindergarden[i].Adresse;
        const distance = kindergarden[i].Afstand
        L.marker([kindergarden[i].Latitude, kindergarden[i].Longitude], {icon: kindergardenIcon}).addTo(map).bindPopup(`<h3>${navn}</h3>
        <hr>
        <p>Adresse: ${address}</p>
        <p>Afstand i meter: ${distance}</p>`);
    }

    for (let i = 0; i < resturants.length; i++) {
        const navn = resturants[i].Navn;
        const address = resturants[i].Adresse;
        const distance = resturants[i].Afstand
        L.marker([resturants[i].Latitude, resturants[i].Longitude], {icon: resturantIcon}).addTo(map).bindPopup(`<h3>${navn}</h3>
        <hr>
        <p>Adresse: ${address}</p>
        <p>Afstand i meter: ${distance}</p>`);
    }

    for (let i = 0; i < schools.length; i++) {
        const navn = schools[i].Navn;
        const address = schools[i].Adresse;
        const distance = schools[i].Afstand
        L.marker([schools[i].Latitude, schools[i].Longitude], {icon: schoolIcon}).addTo(map).bindPopup(`<h3>${navn}</h3>
        <hr>
        <p>Adresse: ${address}</p>
        <p>Afstand i meter: ${distance}</p>`);
    }



}

const politic = document.querySelector(".politic");

function politicChart(){
    politic.classList.add("politicClicked")
    politikOverskrift = document.getElementById("politikOverskrift")
    politikBread = document.getElementById("politikBread")
    politikOverskrift.innerHTML = 'Dagmarsgade 42 hører til afstemningsområdet Ringsted Kommune, hvor der i 2022 blev optalt 20.780 gyldige stemmer.'
    politikBread.innerHTML = 'Partiet med flest stemmer til folketingsvalget i 2022 i Ringsted kommune er Socialdemokratiet med 5694 (27,4%) af stemmerne.'
    const ctx = document.querySelector('#valgdatachart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Socialdemokratiet', 'Venstre', 'Moderaterne', 'SF', 'Danmarksdemokraterne', 'De Konservative', 'Liberal Alliance', 'Nye Borgerlige', 'Enhedslisten', 'Dansk Folkeparti', 'Radikale Venstre', 'Alternativet', 'Frie Grønne', 'Kristendemokraterne'],
            datasets: [{
                label: 'Antal stemmer',
                data: [5694, 2645, 2193, 1970, 1737, 1652, 1296, 900, 727, 710, 522, 422, 199, 70],
                backgroundColor: ["red", "blue", "purple", "lightpink", "lightblue", "green", "turquoise", "lightblue", "lightpink", "lightblue", "lightpink", "lightgreen", "lightgreen", "lightbrown"],
            },
            ]

        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    position: "bottom"
                },
                title: {
                    display: true,
                    text: 'Folketingsvalg i Ringsted kommune 2022'
                }
            }
        },
    })

}



function burgerFunction() {
    const x = document.querySelector("#burgerDiv");
    if (x.style.display === "block") {
        console.log("hej")
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

//Tabel

const nearByTabel = document.querySelector(".Nearby");

function tabelNearBy(){
    nearByTabel.classList.add("NearbyClicked")

        document.querySelectorAll(".search-input").forEach((inputField) => {
         const tableRows = inputField
                .closest("table")
                .querySelectorAll("tbody > tr");
            const headerCell = inputField.closest("th");
            const otherHeaderCells = headerCell.closest("tr").children;
            const columnIndex = Array.from(otherHeaderCells).indexOf(headerCell);
            const searchableCells = Array.from(tableRows).map(
                (row) => row.querySelectorAll("td")[columnIndex]
            );

            inputField.addEventListener("input", () => {
                const searchQuery = inputField.value.toLowerCase();

                for (const tableCell of searchableCells) {
                    const row = tableCell.closest("tr");
                    const value = tableCell.textContent.toLowerCase().replace(",", "");

                    row.style.visibility = null;

                    if (value.search(searchQuery) === -1) {
                        row.style.visibility = "collapse";
                    }
                }
            });
        });
}