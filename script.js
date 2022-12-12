let xDataglobal
let yDataglobal
// Dawaautocomplete api, all addresses in Denmark
dawaAutocomplete.dawaAutocomplete(document.querySelector('#dawa-autocomplete-input'), {
    select: function(selected) {

        console.log('Valgt adresse: ' + selected.tekst +" "+ selected.data.x +" "+ selected.data.y);
        locationsOnMap(selected);
        politicChart();
        tabelNearBy();
        xDataglobal = selected.data.x * 1000000
        yDataglobal = selected.data.y * 1000000
        testapi();
        crimechart();
        renderDatablad();


    }
});

// Standard view setting of map
const map = L.map("map")
const tiles = L.tileLayer("https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=89TnfA8v1mRlkatNruN7", {
    maxZoom: 19,
    attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
map.setView([55.87, 10.64], 6.5);

// Shoppingcart icon
let shoppingCart = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/4297/4297127.png',

    iconSize:     [25, 25], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

// drugstore icon

let drugstoreIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/4286/4286462.png',

    iconSize:     [25, 25], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

// Hospital icon
let hospitalIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3307/3307107.png',

    iconSize:     [25, 25], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

// Kindergarden icon
let kindergardenIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/8469/8469812.png',

    iconSize:     [25, 25], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

// Resturant icon
let resturantIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/638/638523.png',

    iconSize:     [25, 25], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

// School icon
let schoolIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/991/991922.png',

    iconSize:     [25, 25], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


// Information on map and map settings
function locationsOnMap(selected){
    //Inserts the address to the map to center the address on the map
    map.setView([selected.data.y, selected.data.x], 14.5);

    //Creates text on map
    L.marker([selected.data.y, selected.data.x]).addTo(map).bindPopup('Adresse:' +" "+ selected.tekst)

    //Puts circles on all stations on map
    for (let i = 0; i < stations.length; i++) {
        L.circle([stations[i].Latitude, stations[i].Longitude]).addTo(map).bindPopup(stations[i].Column2);
    }

// Puts information about grocery on map
    for (let i = 0; i < grocery.length; i++) {
        const navn = grocery[i].Navn;
        const address = grocery[i].Adresse;
        const distance = grocery[i].Afstand
        L.marker([grocery[i].Latitude, grocery[i].Longitude], {icon: shoppingCart}).addTo(map).bindPopup(`<h3>${navn}</h3>
        <hr>
        <p>Adresse: ${address}</p>
        <p>Afstand i meter: ${distance}</p>`);
    }
// Puts information about drugstore on map
    for (let i = 0; i < drugstore.length; i++) {
        const navn = drugstore[i].Navn;
        const address = drugstore[i].Adresse;
        const distance = drugstore[i].Afstand
        L.marker([drugstore[i].Latitude, drugstore[i].Longitude], {icon: drugstoreIcon}).addTo(map).bindPopup(`<h3>${navn}</h3>
        <hr>
        <p>Adresse: ${address}</p>
        <p>Afstand i meter: ${distance}</p>`);
    }

    // Puts information about hospital on map
    for (let i = 0; i < hospital.length; i++) {
        const navn = hospital[i].Navn;
        const address = hospital[i].Adresse;
        const distance = hospital[i].Afstand
        L.marker([hospital[i].Latitude, hospital[i].Longitude], {icon: hospitalIcon}).addTo(map).bindPopup(`<h3>${navn}</h3>
        <hr>
        <p>Adresse: ${address}</p>
        <p>Afstand i meter: ${distance}</p>`);
    }

    // Puts information about kindergarden on map
    for (let i = 0; i < kindergarden.length; i++) {
        const navn = kindergarden[i].Navn;
        const address = kindergarden[i].Adresse;
        const distance = kindergarden[i].Afstand
        L.marker([kindergarden[i].Latitude, kindergarden[i].Longitude], {icon: kindergardenIcon}).addTo(map).bindPopup(`<h3>${navn}</h3>
        <hr>
        <p>Adresse: ${address}</p>
        <p>Afstand i meter: ${distance}</p>`);
    }

    // Puts information about resturants on map
    for (let i = 0; i < resturants.length; i++) {
        const navn = resturants[i].Navn;
        const address = resturants[i].Adresse;
        const distance = resturants[i].Afstand
        L.marker([resturants[i].Latitude, resturants[i].Longitude], {icon: resturantIcon}).addTo(map).bindPopup(`<h3>${navn}</h3>
        <hr>
        <p>Adresse: ${address}</p>
        <p>Afstand i meter: ${distance}</p>`);
    }

    // Puts information about schools on map
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

// Chart over what the majority votes
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


//Dropdown burgermenu
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

// What is near by tabel
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

// APi from rejseplan to get all nearby stations
function testapi(data){
    fetch(`http://xmlopen.rejseplanen.dk/bin/rest.exe/stopsNearby?format=json&coordX=${xDataglobal.toFixed(0)}&coordY=${yDataglobal.toFixed(0)}`)
        .then(response => response.json())
        .then((data) => { //console.log(data.LocationList.StopLocation))
            rejseplanenOverskrift = document.getElementById("rejseplanenOverskrift").innerHTML = 'Hvilke stoppesteder ligger nær adressen?'
            let stopName = data.LocationList.StopLocation
            console.log(data)
            for (let i = 0; i < stopName.length; i++) {
                let print = document.createElement("span")
                console.log(stopName[i].name)
                document.getElementById("stationer").appendChild(print)
                print.innerHTML = `
                <p>${stopName[i].name} - ${stopName[i].distance} Meter</p>
                `
            }
        })
}

// Chart over the crime stats of a specific area
function crimechart() {
    const ctx2 = document.querySelector('#forbrydelserchart').getContext('2d');
    crimeOverskrift = document.getElementById("crimeOverskrift")
    crimeBread = document.getElementById("crimeBread")
    crimeOverskrift.innerHTML = "Se hvor mange lovovertrædelser der har fundet sted i Ringsted kommune fra 1. Kvartal 2021 til og med 3. Kvartal 2022."
    crimeBread.innerHTML = "Der er i Ringsted kommune fra 1. kvartal 2021 til og med 3. kvartal i 2022 registreret i alt 3459 lovovertrædelser. Vi kan se at lovovertrædelserne i 3. kvartal 2022, er faldet i forhold til samme tidspunkt året før."
    const chart = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: ['2021/1', '2021/2', '2021/3', '2021/4', '2022/1', '2022/2', '2022/3'],
            datasets: [{
                label: 'Antal lovovertrædelser',
                data: [327, 558, 614, 467, 467, 552, 474],
                borderColor: ["red"]
            },
            ]

        },
        options: {
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
                    text: 'Lovovertrædelser i Ringsted kommune pr kvartal fra 2021Q1 til 2022Q3'
                }
            }
        },
    })
}

// Links to where we got the information
function renderDatablad() {
    databladOverskrift = document.getElementById("databladOverskrift")
    datalinks = document.getElementById("datalinks")
    databladOverskrift.innerHTML = "Datablad"
    datalinks.innerHTML = "<br>" + "Info på apoteker er hentet på: https://www.apoteket.dk/alle-apoteker" + "<br>" + "<br>" +
        "Info på supermarkeder er hentet på: https://www.netto.dk/find-butik/ og https://superbrugsen.coop.dk/find-butik/ " + "<br>" + "<br>" +
        "Info på skoler og børnehaver er fundet via google søgning i nærområdet"
        + "<br>" + "<br>" + "Data fra folketingsvalg grafen er hentet fra: https://www.statistikbanken.dk/statbank5a/selectvarval/define.asp?PLanguage=0&subword=tabsel&MainTable=FVKOM&PXSId=206363&tablestyle=&ST=SD&buttons=0"
        + "<br>" + "<br>" + "Data fra lovovertrædelser grafen er hentet fra: https://www.statistikbanken.dk/2414"
        + "<br>" + "<br>" + "Data fra stoppesteder er hentet fra Rejseplanens API: https://help.rejseplanen.dk/hc/article_attachments/115002672369/ReST_documentation_Rejseplanen_Latest.pdf"
}