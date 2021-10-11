

// console.log(json)



window.addEventListener('load', function() {
    document.querySelector('button').addEventListener('click', getStudenti);
    document.querySelector('#invia').addEventListener('click', aggiungiStudente)
})

function aggiungiStudente () {

    const persona = {
        nome: 'Ryan',
        cognome: 'Burgos',
        eta: 24,
        email: 'test@test.it'
    }
    
    const json = JSON.stringify(persona);


    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        
    }

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
            console.log(JSON.parse(xhr.responseText))
        }
    }


    xhr.open('GET', 'http://localhost:3000/studenti');
    xhr.send();
}