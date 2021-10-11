window.addEventListener('load', function() {
    // gestione evento submit della form
    document.querySelector('#cercaCanzoni').addEventListener('submit', function(event) {
        event.preventDefault();

        let nomeArtista = document.getElementById('nomeArtista').value;
        caricaCanzoni(nomeArtista)
            .then((songs)=>creaListaCanzoni(songs))
            .catch((error) => console.log(error));
    })   
})



//Possiamo usare await solo dentro un metodo async
//Torna sempre una Promise se non esplicitamente lo fa automaticamente
//L'esecuzione di questa funzione è sincrono ma non appena incontra un'istruzione
//await diventa asincrono. L'esecuzione continua quando l'operazione asincrona
//termina con successo, cessa se c'è un errore e torna una Promise rejected
async function caricaCanzoni(artista) {

    // fetch metodo di javascript ES6 per effettuare richieste http asincrone, ritorna una promise
    //Se la promise è in stato resolved viene unwrapped e presa la sua response
    const response = await fetch(`https://itunes.apple.com/search?term=${artista}&country=IT&media=music&limit=25`)
    //Per le funzioni async le eccezioni sono wrappate in una Promise rejected
    //che quindi può essere catturata in un catch attaccato al chiamante        
    if (!response.ok && (response.status != 304)) {
        throw new Error(`Errore nella risposta. Codice errore: ${response.status}`); 
    }
    //Se sei qui no errori
        const songs = await response.json() ;
        return songs.results; //In modo da elaborare le canzoni tornate nel chiamante;
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