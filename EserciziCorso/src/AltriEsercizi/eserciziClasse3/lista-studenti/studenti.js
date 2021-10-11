$(function() {
    getStudenti();
    // gestiamo l'evento submit della form con id inserisciStudente
    // con il metodo on
    $('#inserisciStudente').on('submit', function(event) {
        event.preventDefault(); // preveniamo il refresh di default dell'evento submit

        // immagazziniamo all'interno delle seguenti variabili
        // il valore inserito negli input della form
        let nome = $('#nome').val();
        let cognome = $('#cognome').val();
        let eta = $('#eta').val();
        let email = $('#email').val();

        // validazione semplice dei campi di input
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

        // assegniamo alla costante studente
        // l'oggeto con le proprietà nome, cognome, eta ed email
        // che hanno i valori raccolti nei campi di input della form
        const studente = {
            nome: nome,
            cognome: cognome,
            eta: parseInt(eta),
            email: email
        }

        // convertiamo il nostro oggetto in un json con JSON.stringify
        // e lo assegniamo alla costante json
        const json = JSON.stringify(studente);

        // settiamo alcune info per la richiesta HTTP Post
        // in particolare l'headers Content-Type e gli specifichiamo che stiamo inviando un json
        

        // il metodo $.post di jquery ci permette di effettuare la richiesta HTTP Post
        // all'URL passato come primo argomento
        // come secondo argomento passiamo il body della request e cioè il json che vogliamo
        // inviare al backend
        // requestWithPost(json)
        requestWithAjax(json)
    })

})


function requestWithAjax(json) {

    // $.ajax è un metodo di jQuery, che ci permette di effettuare richiesta HTTP di ogni tipo (GET, POST, PUT, DELETE, ecc...)
    // come argomento, accetta un oggetto che ha come proprietà
    // le informazioni che occorrono per effettuare la request
    // esempio { url: '<server url', method: 'GET', dataType: 'json' }
    // come $.get e $.post ci espone i metodi .done() e .fail() per gestire la response della chiamata
    //dataType è il tipo della risposta
    //data sono i dati da inviare al server nel payload. Ma se il metodo non
    //li prevede tipo è una GET request li interpreterà come coppie chiave-valore
    //dei parametri della querystring
    $.ajax({
        url: 'http://localhost:3000/studenti',
        method: 'POST',
        dataType: 'json',
        data: json,
        headers: {
            "Content-type": "application/json"
        }
    })
    .done(
        function() {
            getStudenti()
        }
    )
    .fail(
        function(error) {
            console.log(error)
        }
    ).always(
        function() {
            console.log('operazione completata')
        }
    )
}


function requestWithPost(json) {

    $.ajaxSetup({
        headers: {
            "Content-Type": "application/json"
        }
    })

    $.post('http://localhost:3000/studenti', json)
            .done(
                // il metodo done viene eseguito in caso di successo della request
                function(data) {
                    console.log(data)
                    // riesegue la richiesta http GET per recuperare la lista aggiornata degli studenti
                    // e ricostruisce la tabella degli studenti
                    getStudenti();
                }
            ).fail(
                // il metodo fail viene eseguito in caso di fallimento della request
                function(error) {
                    console.log(error)
                }
            )
}



function getStudenti() {
    $.get('http://localhost:3000/studenti')
        .done(
            function(studenti) {
                console.log(studenti)

                let righe = '';
                for (let studente of studenti) {
                    righe += `
                        <tr> 
                            <td>${studente.nome}</td>
                            <td>${studente.cognome}</td>
                            <td>${studente.eta}</td>
                            <td>${studente.email}</td>
                        </tr>
                    `
                }
                $('#listaStudenti').html(righe)
            }
        ).fail(
            function(error) {
                console.log(error)
            }
        )
}