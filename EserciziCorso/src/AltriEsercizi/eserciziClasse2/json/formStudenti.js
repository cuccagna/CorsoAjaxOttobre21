import { Studente } from './class/Studente.js'


window.addEventListener('load', function() {
    // getStudenti carica la tabella degli studenti al caricamento della pagina
    getStudenti();
    // gestione dell'evento submit della form
    document.querySelector('#studenti').addEventListener('submit', function(event) {
        event.preventDefault();
        // assegniamo alle costanti i valori immessi nei campi di input della form
        const nome = document.querySelector('#nome').value;
        const cognome = document.querySelector('#cognome').value;
        const eta = document.querySelector('#eta').value;
        const email = document.querySelector('#email').value;


        // eseguiamo una semplice validazione
        if (nome == '' || nome == undefined) {
            alert('non hai inserito il nome')
        }
        if (cognome == '' || cognome == undefined) {
            alert('non hai inserito il cognome')
        }
        if (eta == '' || eta == undefined) {
            alert("non hai inserito l'eta")
        }
        if (email == '' || email == undefined) {
            alert("non hai inserito l'email")
        }

        // istanziamo un oggetto di tipo Studente, che abbiamo importato da un file esterno
        const studente = new Studente(nome, cognome, parseInt(eta), email);

        // convertiamo l'oggetto studente in una string Json con JSON.stringify
        const json = JSON.stringify(studente);

        console.log(json)

        // passiamo il json alla funzione che si occuperà di inviare il dato al backend
        aggiungiStudente(json)
    })

    document.querySelector('#carica').addEventListener('click', getStudenti);
})

// questa funzione si occupa di inviare i dati verso il backend
function aggiungiStudente(json) {
    // istanza dell'oggetto XMLHttpRequest
    const xhr = new XMLHttpRequest();

    // apriamo la connessione specificando che l'operazione sarà una POST
    // e cioè l'invio di dati
    xhr.open('POST', 'http://localhost:3000/studenti');

    // settiamo il content type, cioè specifichiamo il formato di dati di scambio
    xhr.setRequestHeader('Content-type', 'application/json');

    // inviamo il json con il metodo send
    xhr.send(json)
    getStudenti(); //MIO COMMENTO. QUESTO SAREBBE MEGLIO METTERLO QUANDO ARRIVA LA RISPOSTA
                   //DELLA RICHIESTA POST IN MODO DI ESSERE SICURI CHE AVVENGA DOPO
}


function getStudenti() {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status === 200) {
            // console.log(JSON.parse(xhr.responseText))
            // la funzione creaTabella accetta come argomento l'array di studenti
            // che ci arriva dal backend
            let studenti = JSON.parse(xhr.responseText);
            creaTabella(studenti);

        }
    }


    xhr.open('GET', 'http://localhost:3000/studenti');
    xhr.send();
}


function creaTabella(listaStudenti) {
    // abbiamo assegnato alla variabile tbody, il nodo html tbody della tabella
    let tbody = document.querySelector('#listaStudenti');

    // righeStudenti è una variabile di appoggio che alla fine del ciclo for 
    // conterrà la stringa con tutte le nostre righe contenenti i
    // dati degli studenti
    let righeStudenti = '';
    for (let studente of listaStudenti) {
        // console.log(studente)
        // concateniamo a righeStudenti le varie righe della tabella
        // contenenti i dati degli studenti
        righeStudenti += `
            <tr>
                <td>${studente.nome}</td>
                <td>${studente.cognome}</td>
                <td>${studente.eta}</td>
                <td>${studente.email}</td>
            </tr>
        `
    }

    // facciamo l'innerHTML sul tbody, con la stringa righeStudenti popolata dinamicamente
    tbody.innerHTML = righeStudenti;

}