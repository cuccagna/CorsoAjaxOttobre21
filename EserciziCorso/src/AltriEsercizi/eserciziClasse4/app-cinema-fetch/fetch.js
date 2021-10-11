const apikey = "732fa9bb";


window.addEventListener('load', function() {

    document.getElementById('cercaFilm').addEventListener('submit', function(event) {
        event.preventDefault();

        let nomeFilm = document.getElementById('filmTitle').value;

        if (nomeFilm == '' || nomeFilm == undefined) {
            alert('inserisci il nome del film')
        } else {
            getFilms(nomeFilm)
        }
    })
    

})




function getFilms(nomeFilm) {
    // fetch è un metodo di javascript, introdotto dalla versione ES6
    // utilizzato per effettuare richieste http ansincrone
    // accetta come primo argomento la request URL e di default se non specificato
    // effettua un request GET
    fetch(`http://www.omdbapi.com/?apikey=${apikey}&s=${nomeFilm}`) // ritorna una promise
        .then(
            // viene gestita la response
            (response) => {
                // la proprietà ok è un booleano che ha valore true quando lo status code
                // è compreso tra 200 e 299, quindi request andata a buon fine
                if (response.ok || response.status === 304) {
                    // text ritorna una promise a cui verrà passata
                    // la response sotto forma di testo(stringa)
                    // return response.text();

                    // json() ritorna una promise a cui verrà passata
                    // la response a cui verrà già effettuato il JSON.parse
                    // quindi nel secondo then, potremo gestire direttamente
                    // l'oggetto javascript
                    return response.json();
                } else {
                    throw new Error(response.statusText);
                }
                // console.log(response)
            }
        ).then(
            // gestiamo la risposta effettiva proveniente dalla richiesta http che abbiamo effettuato
            (data) => {
                creaListaFilm(data.Search); //Search è un campo della specifica API dei film
            }
        ).catch(
            (err) => {
                console.log(err)
            }
        )
}

/* Catch innescato sia quando direttamente il fetch ritorna una Promise in stato
rejected ad esempio perchè non è stata ricevuta una risposta entro un timeouts, 
oppure è innescato dall'eccezione lanciata nel  .then che in questo caso viene
automaticamente convertita a una Promise rejected */






function creaListaFilm(films) {
    let righe = '';

    for (let film of films) {
        // con questa istruzione condizionale, controlliamo che il singolo oggetto
        // che rappresenta il film abbia nella proprietà Poster un valore diverso da 'N/A' (cioè non ha l'immagine)
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
    // inseriamo le righe appena concatenate nel ciclo for nel tbody della nostra tabella
    document.querySelector('#listaFilm').innerHTML = righe;
}