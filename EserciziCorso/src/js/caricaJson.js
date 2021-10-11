const xhr = new XMLHttpRequest();

/* L'oggetto JSON che ci mette a disposizione Javascript ha il metodo parse() che 
ci permette di convertire la stringa ritornata dalla proprieta' responseText in
un oggetto JS facilmente manipolabile */

xhr.onreadystatechange = function(){
   if(xhr.readyState === 4)
      if(xhr.status>=200 && xhr.status < 300 || xhr.status === 304){
         let risposta = xhr.responseText;
         console.log(risposta); //converte automaticamente il json in stringa
         let listaDipendenti;

         //parse lancia un'eccezione se la stringa non è nel formato JSON corretto
         try{
            listaDipendenti= JSON.parse(risposta); //converte la stringa (che è in formato JSON) in un oggetto JS
         }
         catch(e){
            let divError = document.createElement('div');
            divError.className = 'erroreJsonFormat';
            divError.appendChild(document.createTextNode('Formato JSON del file employees.json non rispettato'));
            document.body.appendChild(divError);
            return;
         } 
            console.log(listaDipendenti);

         for(let dip of listaDipendenti.employees){
            let n = document.createElement('div');
            let labels=`
            <label>Nome: </label> ${dip.firstname} 
            <label>Cognome: </label> ${dip.lastname} 
            `;
            n.innerHTML = labels;
            document.body.appendChild(n);
         }
      }
   }

xhr.open('get' , '../html/json/employees.json' , true);
xhr.overrideMimeType("application/json");
xhr.send(null);