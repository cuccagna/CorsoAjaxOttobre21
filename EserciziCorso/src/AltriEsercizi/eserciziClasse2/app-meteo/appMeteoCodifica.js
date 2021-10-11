import {addURLParam} from './utility/codificaRequestURL.js';

// appid necessario per effettuare le richieste http verso openWeatherMap (https://openweathermap.org)
// fondamentale iscriversi al sito per ottenere l'app_id
const appid = '3494cecd48e4e87f52da9ec1411950e0';

window.addEventListener('load', function() {
    // gestione evento submit della form con id meteo
    document.querySelector('#meteo').addEventListener('submit', function(event) {
        event.preventDefault();
        // assegniamo a due variabili i valori dei campi in input della form
        let citta = document.querySelector('#citta').value;
        let stateCode = document.querySelector('#stateCode').value;

        caricaMeteo(citta, stateCode);
    })
})


function caricaMeteo(nomeCitta, stateCode) {
    // istanzia l'oggetto XMLHttpRequest
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            //assegniamo a infoMeteo il valore della response del servizio di openweathermap
            // convertito in oggetto javascript con JSON.parse
            let infoMeteo = JSON.parse(xhr.responseText);
            // passiamo l'oggetto convertito, come argomento alla funzione creaCardMeteo
            creaCardMeteo(infoMeteo);
        }
    }
    /* 
    utilizziamo open e passiamo come primo argomento il metodo http "GET"
    come secondo argomento passiamo la request URL
    la request URL contiene una querystring, che non è altro che una sequenza di informazioni
    preceduta dal carattere (?)
    - ogni informazione è composta da chiave e valore divisi dal carattere (=) (esempio: ?paese=italia)
    - i vari parametri sono invece suddivisi dal carattere (&) (esempio: ?citta=roma&paese=italia)
    - tutti questi elementi formano la querystring
    */
    let url = 'http://api.openweathermap.org/data/2.5/weather';
    url = addURLParam(url , "q" , `${nomeCitta},${stateCode}`) ;
    url = addURLParam(url , "appid" , appid) ;
    url = addURLParam(url , "units" , "metric") ;
    url = addURLParam(url , "lang" , "it") ;
    console.log(url);

    //Sintassi del parametro senza codifica `http://api.openweathermap.org/data/2.5/weather?q=${nomeCitta},${stateCode}&appid=${appid}&units=metric&lang=it`
    xhr.open('GET',url)
    // effettuiamo la richiesta con send
    xhr.send(null);
}





function creaCardMeteo(infoMeteo) {

    let iconURL =  `http://openweathermap.org/img/w/${infoMeteo.weather[0].icon}.png`

    console.log(infoMeteo);
    let card = `
    <div>
        <img src="${iconURL}">
        <h2>${infoMeteo.name}</h2>
        <p> Temperatura: ${infoMeteo.main.temp}</p>
        <p> Temperatura Max: ${infoMeteo.main.temp_max}</p>
        <p> Temperatura Min: ${infoMeteo.main.temp_min}</p>
        <p> Condizioni: ${infoMeteo.weather[0].description}</p>
    </div>
    `

    document.querySelector('#container').innerHTML = card
}


