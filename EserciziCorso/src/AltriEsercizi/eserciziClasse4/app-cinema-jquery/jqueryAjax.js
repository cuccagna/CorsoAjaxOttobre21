const apikey = "732fa9bb";

$(function() {

    // $.ajax è un metodo di jQuery per effettuare richieste http asincrone
    // accetta come argomento un oggetto che contiene le informazioni per effettuare la request
    // fondamentali le proprietà url e method
    $.ajax({
        url: `http://www.omdbapi.com/?apikey=${apikey}&s=spiderman`,
        method: 'GET',
        dataType: 'json',
    })
    .done(
        function(data) {
            console.log(data);
        }
    )
    .fail(
        function(error) {
            console.log(error)
        }
    )
    .always(
        function() {
            console.log('operazione completata')
        }
    )





})