const xhr = new XMLHttpRequest();

xhr.onreadystatechange = function(){
   if(xhr.readyState === 4)
      if(xhr.status>=200 && xhr.status < 300 || xhr.status === 304){
         console.log(xhr.responseText); //Questo restituisce una stringa
         let xmlDomResponse = xhr.responseXML; //Questo restituisce un XmlDOM (un oggetto non una stringa)
         //Su un XML Dom posso usare tutti i metodi JS del DOM, per navigare l'oggetto
         //ed estrapolarne contenuti specifici
         console.log(xmlDomResponse); //Questo restituisce un xmlDOM
         const listaDipendenti = xmlDomResponse.getElementsByTagName('employee');
         console.log('Estraggo dipendenti: ', listaDipendenti);

         //let labels="";
         let fragment = document.createDocumentFragment();
         for(const dip of listaDipendenti)
         {
            console.log(dip);

         let container = document.createElement('div');
         let label1 = document.createElement('label');
         let label2 = document.createElement('label');
         label1.appendChild(document.createTextNode(`Nome: ${dip.children[0].textContent} `));
         label2.appendChild(document.createTextNode(`Cognome: ${dip.children[1].textContent}`));
         container.appendChild(label1);
         container.appendChild(label2);

         fragment.appendChild(container);

         // Se usi childNodes vengono tornati anche i nodi relativi alle spaziature
         //controlla su MDN il supporto di children
         /* labels+=`
            <div>
               <label>Nome: </label> ${dip.children[0].textContent} 
               <label>Cognome: </label> ${dip.children[1].textContent} 
            </div>
            ` */
            //container.innerHTML = labels; //Per motivi di sicurezza non andrebbe usato innerHTML
            //document.body.appendChild(container); //Qui meglio usare un fragment per efficienza
         }
         //document.body.innerHTML = labels;
         document.body.appendChild(fragment);
      }
}

xhr.open('GET' , '../html/employees.xml' , true);
xhr.overrideMimeType('text/xml');
xhr.send(null);