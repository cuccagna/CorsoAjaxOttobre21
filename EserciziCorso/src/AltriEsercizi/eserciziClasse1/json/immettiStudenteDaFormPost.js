import {Studente} from './class/Studente.js';

document.addEventListener('DOMContentLoaded',()=>{
    const bottoneCaricaStudenti = document.getElementById('caricaStudenti');
    const formStudente = document.forms['studenti']; 
    
    bottoneCaricaStudenti.addEventListener("click",caricaStudenti);
    formStudente.addEventListener('submit' , gestisciSubmit);
})

function caricaStudenti(){
    const bottoneCaricaStudenti = document.getElementById('caricaStudenti');

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status>=200 && xhr.status<300 || xhr.status === 304){
                try{
                    visualizzaListaStudenti(JSON.parse(xhr.responseText) , bottoneCaricaStudenti);
                }
                catch(ex){
                    alert("La lista studenti ritornata dal server non è in un formato JSON valido");
                    return;
                }
            }
            else
                alert("Errore nella richiesta della lista degli studenti. Error Code: "+xhr.status);
        }
    }

    xhr.open('GET','http://localhost:3000/studenti');
    xhr.send(null);
}

function gestisciSubmit(event){
    event.preventDefault();
    const formStudenti = event.target;
    inserisciStudente(formStudenti);
}

function inserisciStudente(formStudenti){
    /* const studente = {
        nome : formStudenti.elements['nome'].value,
        cognome : formStudenti.elements['cognome'].value,
        eta : formStudenti.elements['eta'].value,
        email : formStudenti.elements['email'].value
    } */

    
    //Potresti fare prima una validazione dei valori
    const studente = new Studente(formStudenti.elements['nome'].value,
    formStudenti.elements['cognome'].value,
    parseInt(formStudenti.elements['eta'].value),
    formStudenti.elements['email'].value);

    const studenteJSON = JSON.stringify(studente);

    let xhr = new XMLHttpRequest();
    //Qui non ho bisogna di gestire la risposta. Viene tornato l'id del nuovo
    //studente aggiunto in questo caso che non mi serve. Quindi non mi serve
    //agganciare l'evento onreadystatechange. Però voglio fare in modo che quando
    //aggiungo uno studente viene anche visualizzato l'elenco degli studenti
    //cioè finita la POST faccio una richiesta GET per visualizzare l'elenco
    //degli studenti. Allora  aggiungo la gestione all'evento onreadysatechange
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4)
            if(xhr.status>=200 && xhr.status<300 || xhr.status === 304){
                caricaStudenti();
            }
    }
    xhr.open('POST' , 'http://localhost:3000/studenti');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(studenteJSON);
}

function visualizzaListaStudenti(studenti , bottoneCaricaStudenti){
    let contenitoreStudenti = document.getElementById('contenitoreStudenti');
    
    let contenuto = "";
    for(let studente of studenti){
        //console.log(studente);
        contenuto += 
        `
            <div>
                <h6>Nome: ${studente.nome}</h6>
                <h6>Nome: ${studente.cognome}</h6>
                <h6>Nome: ${studente.eta}</h6>
                <h6>Nome: ${studente.email}</h6>
            </div>
            <hr>
        ` 
    }

    contenitoreStudenti.innerHTML = contenuto;
    aggiungiBottoneCancellareVisualizzazioneStudenti(bottoneCaricaStudenti)
}

function aggiungiBottoneCancellareVisualizzazioneStudenti(bottoneCaricaStudenti){
    if(! document.querySelector("button[id='caricaStudenti'] + button[id='cancellaVisualizzazioneStudenti']") ){
        bottoneCaricaStudenti.insertAdjacentHTML("afterend","<button id='cancellaVisualizzazioneStudenti'>Cancella Visualizzazione Studenti</button>")
        //Attacca un listener al click al bottone appena creato
        let buttonCancellaVisualizzazioneStudenti = bottoneCaricaStudenti.nextElementSibling;
        buttonCancellaVisualizzazioneStudenti.addEventListener("click",function(){
            //Elimina il contenuto dell'elemento che contiene l'elenco
            //degli studenti
            document.getElementById("contenitoreStudenti").textContent = "";
            //this referenzia l'elemento cui ho attaccato l'eventlistener per cui
            //il bottone che permette di cancellare la visualizzazione degli studenti.
            //Elimino il bottone dopo avere cancellato l'elenco degli studenti
            this.parentNode.removeChild(this);
        })
        //let buttonCancellaVisualizzazioneStudenti = document.createElement("button");
        //buttonCancellaVisualizzazioneStudenti.id = 'cancellaVisualizzazioneStudenti';
    
    }
}