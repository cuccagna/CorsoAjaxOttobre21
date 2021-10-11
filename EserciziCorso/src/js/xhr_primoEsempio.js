
window.addEventListener('load',function(){
   let requestButton = document.getElementById('richiesta');
   requestButton.addEventListener('click' , caricaPost);
});

/* L'interazione tra client e server avviene tramite request/response http 
http è un protocollo di comunicazione che fa da ponte tra frontend 
e backend */

function caricaPost(){
   //Per potere effettuare una request http , verso una risorsa esterna
   //(server web) utilizziamo l'istanza di un oggetto XMLHttpRequest
   const xhr = new XMLHttpRequest();

   //alla proprietà di xhr onreadystatechange assegniamo la callback che viene
   //eseguita quando cambia lo stato (proprietà readyState) della richiesta
   xhr.onreadystatechange = function(){
      if(xhr.readyState === 0){
         console.log(xhr.readyState ,' = Richiesta non inizializzata')
      }
      if(xhr.readyState === 1){
         console.log(xhr.readyState , ' = Richiesta http inizializzata. Hai chiamato open() ma non send()')
      }
      if(xhr.readyState === 2){
         console.log(xhr.readyState , ' = Richiesta inviata. Hai chiamato send() ma non hai ancora ricevuto una risposta')
      }
      if(xhr.readyState === 3){
         console.log(xhr.readyState , ' = Hai ricevuto parte della risposta ma non tutta')
      }

      //Quando readyState assume valore 4 l'operazione è conclusa cioè
      //abbiamo tutta la risposta.
      //Inoltre anche se ho ricevuto la risposta può essere avvenuto un errore
      //status serve a verificare l'esito della richiesta. Se è 200 o tra 200
      //e 299 (estremi inclusi) o è 304 (risorsa richiesta in cache) ha avuto
      //esito positivo
      if(xhr.readyState === 4)
         if(xhr.status >= 200 && xhr.status <300 || xhr.status === 304){ //304 è in cache
            const response = xhr.responseText; //responseText torna la risposta, cioè la risorsa richiesta (nel body della risposta), sotto forma di stringa
            const responseNode = document.createTextNode(response);
            document.getElementById('response-container').appendChild(responseNode); //Metti il contenuto testuale della risposta dentro un div come nodo testuale. Puoi anche usare innerHTML ma ha più problemi di sicurezza.
         }
         else{
            alert('Errore nella xmlHttpRequest '+xhr.status);
         }
   }

   /* JSONplaceholder è un servizio fake per fare una richiesta xmlhttp e farsi tornare dei dati .
   Ne esistono 6 di DEFAULT_MIN_VERSION, qui si usa post. Cerca jsonplaceholder su google
   */
  /* Vuole come parametri:
  - Metodo http da usare per fare la request
  - URL della risorsa richiesta
  - true per richiesta asincrona. false per richiesta sincrona */
   xhr.open('get', 'https://jsonplaceholder.typicode.com/posts',true);
   
   //Con questo metodo invio una request
   xhr.send(null); //mettere sempre null per una richiesta get. Per una post qui vanno i dati inviati. Con una POST nel body della request invio i dati al backend/server
}