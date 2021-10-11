const appid = '3494cecd48e4e87f52da9ec1411950e0';




window.addEventListener('load', function() {


    //Qua per velocizzare non gestiamo l'errore
    //ma andrebbe fatto come fatto vedere nella cartella app-cinema
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=roma,it&appid=${appid}&units=metric&lang=it`)
        .then(
            (response) => {
                console.log(response)
                if (response.ok) {
                    return response.json();
                }
            }
        ).then(
            (data) => {
                creaCardMeteo(data);
            }
        )

})


function creaCardMeteo(infoMeteo) {
    console.log(infoMeteo)
    let iconURL =  `http://openweathermap.org/img/w/${infoMeteo.weather[0].icon}.png`
    let card = `
    <div>
        <img src="${iconURL}">
        <h2>${infoMeteo.name}</h2>
        <p>Temperatura: ${infoMeteo.main.temp}</p>
        <p>Temperatura Massima: ${infoMeteo.main.temp_max}</p>
        <p>Temperatura Minima: ${infoMeteo.main.temp_min}</p>
        <p>Condizioni:${infoMeteo.weather[0].description}</p>
    </div>
    `

    document.querySelector('#container').innerHTML = card;
}