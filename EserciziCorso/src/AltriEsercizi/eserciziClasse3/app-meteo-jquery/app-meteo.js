const appid = '3494cecd48e4e87f52da9ec1411950e0';


$(function() {


    $('#meteo').on('submit', function(event) {
        event.preventDefault();

        let citta = $('#citta').val();
        let codiceStato = $('#codiceStato').val();


        requestWithAjax(citta, codiceStato);
        // requestWithGet(citta, codiceStato);
       

    })


    function requestWithAjax(citta, codiceStato) {
        $.ajax({
            url: `http://api.openweathermap.org/data/2.5/weather?q=${citta},${codiceStato}&appid=${appid}&units=metric&lang=it`,
            method: 'GET',
            dataType: 'json'
        }).done(
            function(data) {
                let iconURL =  `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
                console.log(data)
                $(`
                <div>
                    <img src="${iconURL}">
                    <h2>${data.name}</h2>
                    <p>Temperatura: ${data.main.temp}</p>
                    <p>Temperatura Massima: ${data.main.temp_max}</p>
                    <p>Temperatura Minima: ${data.main.temp_min}</p>
                    <p>Condizioni:${data.weather[0].description}</p>
                </div>
                `).appendTo('#container')
            }
        ).fail(
            function(error) {
                console.log(error)
            }
        ).always(
            function() {
                alert('richiesta completata')
            }
        )
    }





    function requestWithGet(citta, codiceStato) {
        $.get(`http://api.openweathermap.org/data/2.5/weather?q=${citta},${codiceStato}&appid=${appid}&units=metric&lang=it`)
        .done(
            function(data) {
                let iconURL =  `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
                console.log(data)
                $(`
                <div>
                    <img src="${iconURL}">
                    <h2>${data.name}</h2>
                    <p>Temperatura: ${data.main.temp}</p>
                    <p>Temperatura Massima: ${data.main.temp_max}</p>
                    <p>Temperatura Minima: ${data.main.temp_min}</p>
                    <p>Condizioni:${data.weather[0].description}</p>
                </div>
                `).appendTo('#container')
            }
        ).fail(
            function(error) {
                console.log(error)
            }
        )
    }




})