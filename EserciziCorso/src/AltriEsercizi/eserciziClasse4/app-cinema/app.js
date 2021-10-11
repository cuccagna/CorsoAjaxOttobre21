const apikey = "778625c";

window.addEventListener('load', function() {
    // gestiamo l'evento submit della form
    document.querySelector('#cercaFilm').addEventListener('submit', function(event) {
        event.preventDefault();
        // accediamo al valore testuale dell'input
        let nomeFilm = document.querySelector('#filmTitle').value;

        // controlliamo che effettivamente sia stato compilato
        if (nomeFilm == '' || nomeFilm == undefined) {
            alert('inserisci il nome del film');
        } else {
            // eseguiamo getFilms che ritorna una promise
            getFilms(nomeFilm)
                .then(
                    // la prima funzione passata al then della promise
                    // viene eseguita solo se nella promise viene eseguito il resolve
                    (films) => {
                        creaListaFilm(films);
                    },

                    // la seconda funzione passata al then della promise
                    // viene eseguita quando nella promise viene eseguito il reject
                    (error) => {
                        alert(error);
                    }
                )
        }
    })

    
})


// funzione getFilms che si occupa di effettuare la richiesta http verso l'API
// viene inoltre gestita con una promise
function getFilms(nomeFilm) {
    // ritorniamo la promise appena istanziata
    // riferimenti alla promise(https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/Promise)
    return new Promise((resolve, reject) => {
        // qui viene gestita la richiesta http con l'oggetto XMLHttpRequest
        const xhr = new XMLHttpRequest();
        // nell'onreadystatechange gestiamo i vari step della richiesta
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                // se lo status della richiesta è 200 OK, eseguiamo il resolve della promise
                if (xhr.status == 200) {
                    let response = JSON.parse(xhr.responseText);
                    resolve(response.Search);
                } else {
                    // altrimenti se qualcosa è andato male e lo status non è 200
                    // eseguiamo il reject
                    reject('qualcosa è andato male')
                }
            }
        }
    
        xhr.open('GET', `http://www.omdbapi.com/?apikey=${apikey}&s=${nomeFilm}`);
    
        xhr.send();
    });
    
}




// creaListaFilm crea le righe che verrano inserite nella tabella
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