$(function() {
    // con jQuery possiamo effettuare delle richieste http GET con il metodo $.get
    // accetta come argomento la Request URL
    // $.get(<server url>) ci mette a disposizione i metodi done e fail
    $.get('https://jsonplaceholder.typicode.com/posts')
    // done viene eseguito quando la richiesta http va a buon fine
    // accetta come argomento la funzione di callback che gestirà la response del servizio chiamato
        .done(
            function(data) {
                console.log(data)
                for (let post of data) {
                    $(`
                    <div>
                        <h2>${post.title}</h2>
                        <p>${post.body}</p>
                    </div>
                    `).appendTo('#container')
                }
                
            }
        )
        // fail viene eseguito quando la richiesta non va a buon fine
        // accetta anch'esso una funzione di callback per gestire l'errore
        .fail(
            function(error) {
                console.log(`la richiesta è andata in errore lo stato della richiesta http è ${error.status}`, )
            }
        )
})


