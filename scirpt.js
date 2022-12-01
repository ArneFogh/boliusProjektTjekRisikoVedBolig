dawaAutocomplete.dawaAutocomplete(document.getElementById('dawa-autocomplete-input'), {
    select: function(selected) {
        console.log('Valgt adresse: ' + selected.tekst);
    }
});