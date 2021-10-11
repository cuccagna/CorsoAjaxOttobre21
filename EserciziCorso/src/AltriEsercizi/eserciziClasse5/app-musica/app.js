window.addEventListener('load', function() {
    // gestione evento submit della form
    document.querySelector('#cercaCanzoni').addEventListener('submit', function(event) {
        event.preventDefault();

        let nomeArtista = document.getElementById('nomeArtista').value;


        caricaCanzoni(nomeArtista);
    })   
})




function caricaCanzoni(artista) {

    // fetch metodo di javascript ES6 per effettuare richieste http asincrone, ritorna una promise
    fetch(`https://itunes.apple.com/search?term=${artista}&country=IT&media=music&limit=25`)
        .then(response => { // nel primo then viene passato l'oggetto response
            if (response.ok) {
                // metodo json che ritorna un'altra promise con l'oggetto già parsato in oggetto javascript
                return response.json(); 
            }
        }).then(obj => {
            // gestiamo la risposta effettiva delle API che abbiamo chiamato
            //console.log(obj);
            creaListaCanzoni(obj.results);
        })
}



function creaListaCanzoni(songs) {
    let righe = '';
    console.log(songs)

    for (let song of songs) {
        righe += `
        
        <tr>
            <td><img src="${song.artworkUrl100}"></td>
            <td>${song.trackName}</td>
            <td> 
                <audio src="${song.previewUrl}" controls>
            </td>
        </tr>
        `
    }

    document.querySelector('#listaCanzoni').innerHTML = righe;
}