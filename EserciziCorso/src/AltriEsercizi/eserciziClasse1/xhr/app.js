window.addEventListener('load', function() {
    document.getElementById('clicca').addEventListener('click', caricaPost);
})


//l'interazione tra client e server, avviene tramite request e response http
/*
http è un protocollo di comunicazione
è il ponte che collega il frontend e il backend
*/

function caricaPost(){
    // per poter effettuare una richiesta/request http, verso una risorsa esterna (es. un server web)
    // utilizziamo l'istanza di un oggetto XMLHttpRequest;
    const xhr = new XMLHttpRequest();

    // alla proprietà onreadystatechange assegniamo una funzione per gestire i vari stati della request http
    xhr.onreadystatechange = function() {
        // i vari stati della request li possiamo controllare attraverso la proprietà readyState

        if (xhr.readyState == 0) {
            console.log('sono allo stato 0')
        }
        if (xhr.readyState == 1) {
            console.log('sono allo stato 1')
        }
        if (xhr.readyState == 2) {
            console.log('sono allo stato 2')
        }
        if (xhr.readyState == 3) {
            console.log('sono allo stato 3')
        }

        // quando la proprietà readyState assume il valore 4 
        // l'operazione è conclusa
        /* 
        la proprietà status, racchiude il valore dello stato della chiamata
        - assume valori numerici
        - le richieste andate a buon fine generalmente ritornano con stato 200
        */ 
        if (xhr.readyState == 4 && xhr.status == 200) { // in questo if sto controllando che lo stato di avanzamento della richiesta sia arrivata a 4
            // JSON.parse ci converte il json in un oggetto javascript
            const posts = JSON.parse(xhr.responseText);
            
            for (let post of posts) {
                console.log(post)

                let container = document.createElement('div');
                let content = `
                <h2>${post.title}</h2>
                <p>${post.body}</p>
                `

                container.innerHTML = content;
                document.querySelector('body').appendChild(container);
            }
            
            // e che lo stato della richiesta sia 200, cioè richiesta andata a buon fine
            //document.querySelector('div').innerHTML = xhr.responseText; // nella proprietà responseText, è racchiusa la risposta del server sotto forma di stringa
        
        }
    }

    /* con il metodo open 
    - apriamo la connessione verso il server web
    - come primo argomento accetta come stringa, il nome del metodo HTTP che vogliamo utilizzare
    - come secondo argomento accetta la request URL verso cui effettuare la richiesta HTTP
    - come terzo argomento accetta un boolean, che settato a true ci permette di effettuare la chiamata asincrona altrimenti è sincrona
    */ 
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts', true);

    // con il metodo send dell'oggetto XMLHttpRequest, inviamo la request
    xhr.send();
}