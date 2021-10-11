import { Nota } from './classes/Nota.js' // import della classe Nota

// gestione evento load
window.addEventListener('load', function() {
    // chiamiamo la funzione getNote per caricare e creare la tabella note
    getNote();


    // gestione della form per l'inserimento della nuova nota
    document.getElementById('inserisciNota').addEventListener('submit', function(event) {
        event.preventDefault();

        // assegnazione dei valori dei vari input alle variabili
        let titolo = document.getElementById('titolo').value;
        let nota = document.getElementById('nota').value;
        let dettaglio = document.getElementById('dettaglio').value;

        // aggiungete la validazione dei campi di input

        // istanza dell'oggetto nota, passandogli nel costruttore i vari valori raccolti nei campi di input
        let nuovaNota = new Nota(titolo, nota, dettaglio);

        // passiamo la nuova nota alla funzione aggiungiNota che si occuperà di effettuare
        // la richiesta http POST 
        aggiungiNota(nuovaNota);
    })



    // gestione della form che cancellla la singola nota tramite l'id
    document.getElementById('cancellaNota').addEventListener('submit', function(event) {
        event.preventDefault();

        // idNota prenderà il valore passato nell'input con id="idNota"
        let idNota = document.getElementById('idNota').value;

        // passando l'id alla funzione cancellaNota, cancelleremo la nota
        // con una richiesta http DELETE
        cancellaNota(idNota);
    })

    // la form con recuperaDettaglio recupera le informazioni della singola nota tramite id passato in input
    document.getElementById('recuperaDettaglio').addEventListener('submit', function(event) {
        event.preventDefault();

        let idNota = document.getElementById('idNotaDettaglio').value;

        // getDettaglioNotaById effettua una richiesta http GET che recupera
        // la singola nota passando l'id nella Request URL
        getDettaglioNotaById(idNota);
    })


    // la form gestisce l'aggiornamento della singola nota
    document.getElementById('aggiornaNota').addEventListener('submit', function(event) {
        event.preventDefault();

        // immagazziniamo nelle variabili i valori aggiornati 
        let id = document.getElementById('idNotaAgg').value;
        let titolo = document.getElementById('titoloAgg').value;
        let nota = document.getElementById('notaAgg').value;
        let dettaglio = document.getElementById('dettaglioAgg').value;


        // creiamo l'oggetto nota aggiornato
        let notaObj = {
            id: id,
            titolo: titolo,
            nota: nota,
            dettaglio: dettaglio
        }

        // eseguiamo aggiornaNota passandogli in input id e nota aggiornata 
        // questo metodo eseguirà una richiesta http PUT
        aggiornaNota(id, notaObj);
    })

})


// aggiornaNota aggiorna la singola nota, passando nella request URL l'id
// e nel body la nota aggiornata 
function aggiornaNota(id, notaAgg) {
    fetch(`http://localhost:3000/note/${id}`, {
        method: 'PUT',
        headers: new Headers({
            "Content-type": 'application/json'
        }),
        body: JSON.stringify(notaAgg)
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
    }).then(data => {
        console.log(data);
        getNote();
    })
}


// getDettaglioNotaById effettua una richiesta http GET che recupera
// la singola nota tramite l'id passato nell'url
function getDettaglioNotaById(id) {
    fetch(`http://localhost:3000/note/${id}`)
        .then(response => {
            if (response.ok) {
                return response.json(); //Qui dovrei controllare che l'oggetto tornato non è vuoto (se tipo id non esiste)
            }
        }).then(nota => { //Qui dovrei controllare che l'oggetto tornato non è vuoto (se tipo id non esiste)
            document.getElementById('idNotaAgg').value = nota.id
            document.getElementById('titoloAgg').value = nota.titolo
            document.getElementById('notaAgg').value = nota.nota
            document.getElementById('dettaglioAgg').value = nota.dettaglio
        }).catch(err => {
            console.log(err)
        })
}


// cancellaNota elimina la nota eseguendo un richiesta http con method DELETE
// passando nella Request URL l'id della nota che vogliamo cancellare
function cancellaNota(id) {
    fetch(`http://localhost:3000/note/${id}`, {
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
    }).then(data => {
        console.log(data);
        getNote();
    })
}

// aggiungiNota aggiunge una nuova nota
//effettuando una post con il metodo fetch
function aggiungiNota(nuovaNota) {
    // primo argomento: request URL
    // secondo argomento: un oggetto che contiene le informazione per effettuare la request (method, headers, body)
    fetch('http://localhost:3000/note', {
        method: 'POST',
        headers: new Headers({
            "Content-Type": 'application/json'
        }),
        body: JSON.stringify(nuovaNota)
    }).then(response => {
        // gestiamo oggetto response
        if(response.ok) {
            return response.json();
        }
    }).then(data => {        
        console.log(data)
        // richiamare getNote che riesegue la chiamata GET per ricevere
        // la lista aggiornata e ricostruisce la tabella
        getNote();
    })

}


// recupera la lista intera delle note
function getNote() {
    fetch('http://localhost:3000/note')
        .then(response => {
            if(response.ok) {
                return response.json();
            }
        }).then(note => {
            // costruisce la tabella
            creaTabNote(note)
        })
}


function creaTabNote(note) {
    let righe = '';

    for (let nota of note) {
        righe += `
        <tr>
            <td>${nota.id}</td>
            <td>${nota.titolo}</td>
            <td>${nota.nota}</td>
        </tr> 
        `
    }

    document.getElementById('listaNote').innerHTML = righe;
}