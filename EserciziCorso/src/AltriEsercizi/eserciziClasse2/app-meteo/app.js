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

        // passiamo come argomenti i valori della form, alla funzione delegata ad effettuare
        // la richiesta http e creare la scheda contenente i dati
        //Questa funzione gestisce la chiamata asinrona wrappando la richiesta
        //XMLHttpRequest in una Promise che sarà in stato pendente finchè  la risposta
        //della richiesta verrà tornata. E sarà chiamato resolve e la promise diventerà
        //fullfilled se è tutto ok, se lo status non è 200 viene chiamato rejected per 
        //mettere la Promise in stato di errore.
        //In creaCardMeteoPromise ho una chiamata di funzione che torna questa Promise
        //appena descritta e gestisce i due suddetti casi dentro .then()
        creaCardMeteoPromise(citta, stateCode);
        //Chiama caricaMeteo(citta, stateCode) per la gestione classica senza Promise in luogo
        //della chiamata suddetta.


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
    xhr.open('GET',`http://api.openweathermap.org/data/2.5/weather?q=${nomeCitta},${stateCode}&appid=${appid}&units=metric&lang=it`)
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


function caricaMeteoPromise(nomeCitta, stateCode) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    try{
                        let response = JSON.parse(xhr.responseText);
                        resolve(response);
                    }
                    catch(e){
                        reject(e);
                    }
                } else {
                    reject(xhr.status);
                }
            }
        }
        xhr.open('GET',`http://api.openweathermap.org/data/2.5/weather?q=${nomeCitta},${stateCode}&appid=${appid}&units=metric&lang=it`)
        // effettuiamo la richiesta con send
        xhr.send();
    })
}


function creaCardMeteoPromise(nomeCitta, stateCode) {
    caricaMeteoPromise(nomeCitta, stateCode).then(
        (infoMeteo) => {
            console.log(infoMeteo)
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
        },
        (error) => {
            alert(`c'è stato un errore ${error}`)
        }
    )
}
