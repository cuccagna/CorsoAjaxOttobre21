const apikey = "732fa9bb";

$(function() {

    $('#cercaFilm').on('submit', function(event) {
        event.preventDefault();

        let nomeFilm = $('#filmTitle').val();

        if (nomeFilm == '' || nomeFilm == undefined) {
            alert('ehi non hai inserito il nome del film')
        } else {
            getFilms(nomeFilm);
        }
    })
})


function getFilms(nomeFilm) {
    // $.get accetta come argomento la request URL
    $.get(`http://www.omdbapi.com/?apikey=${apikey}&s=${nomeFilm}`)
        .done(
            // done metodo eseguito quando la nostra richiesta http è andata a buon fine
            // accetta come argomento una funzione
            function(data) {
                creaTabella(data.Search)
            }
        )
        .fail(
            // fail metodo eseguito quando la richiesta http non va a buon fine
            // accetta una funzione come argomento
            function(error) {
                console.log(error)
            }
        ).always(
            // always viene eseguito sempre, a prescindere dal risultato della richiesta http
            function() {
                console.log('completato')
            }
        )
}


function creaTabella(films) {
    let righe = '';
    for (let film of films) {
        if (film.Poster !== 'N/A') {
            righe += `
            <tr>
                <td><img src="${film.Poster}"></td>
                <td>${film.Title}</td>
                <td>${film.Year}</td>
            </tr>
            `
        }
    }
    //document.querySelector('#listaFilm').innerHTML = righe; // javascript
    $('#listaFilm').html(righe); // jQuery
}