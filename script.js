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
        L.marker([grocery[i].Latitude, grocery[i].Longitude]).addTo(map).bindPopup(`<h3>${navn}</h3>
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