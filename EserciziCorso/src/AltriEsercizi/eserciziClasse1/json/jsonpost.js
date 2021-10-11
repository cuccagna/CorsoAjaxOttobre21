


window.addEventListener('load', function() {
    document.querySelector('button').addEventListener('click', getStudenti);
    document.querySelector('#invia').addEventListener('click', aggiungiStudente)
})

function aggiungiStudente () {

    const persona = {
        nome: 'Sigismondo',
        cognome: 'De Michelis',
        eta: 29,
        email: 'sigi@yahoo.it'
    }
    
    const json = JSON.stringify(persona);


    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        //Non mi interessa quello che viene tornato
/*         Invio lo Studente, solo affinchè venga aggiunto
        la post torna una risposta che in questo caso non mi interessa
 */    }

    // passiamo come primo argomento POST che è il metodo http utilizzato per inviare dati 
    // verso il server web
    xhr.open('POST', 'http://localhost:3000/studenti');

    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(json)
}



function getStudenti() {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status === 200) {
            let studenti = JSON.parse(xhr.responseText);
            console.log(studenti)
            visualizzaStudenti(studenti);
        }
    }


    xhr.open('GET', 'http://localhost:3000/studenti');
    xhr.send();
}

function visualizzaStudenti(studenti){
    let contenitoreStudenti = document.getElementById("contenitoreStudenti");
    content ="";
    for(let studente of studenti){
        //console.log(studente)
        content += 
        `
            <h6>Nome   : ${studente.nome}</h6>
            <h6>Cognome:${studente.cognome}</h6>
            <h6>Eta    :${studente.eta}</h6>
            <h6>Email  :${studente.email}</h6>
            <hr>
        `
    }
    contenitoreStudenti.innerHTML = content;
}