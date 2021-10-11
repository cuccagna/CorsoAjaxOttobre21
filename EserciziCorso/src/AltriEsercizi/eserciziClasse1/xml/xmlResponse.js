const xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        // la proprietà responseXML dell'oggetto XMLHttpRequest ci viene incontro 
        // per gestire le response nel formato XML
        // questa proprietà è un oggetto di tipo Document
        // che perciò ha tutti i metodi che l'oggetto document
        // per manipolare una struttura dati fatta di tag
        const listaDipendenti = xhr.responseXML.getElementsByTagName('employee');
        for (let dip of listaDipendenti) {
            console.log(dip.childNodes[1].textContent);

            let container = document.createElement('div');
            // childNodes è una proprietà che hanno i nodi del nostro XML o HTML
            // contiene una lista degli elementi contenuti nel nodo
            let labels = `
                <label>Nome: </label> ${dip.childNodes[1].textContent}
                <label>Cognome: </label> ${dip.childNodes[3].textContent}
            `

            container.innerHTML = labels;
            document.querySelector('body').appendChild(container)
        }
    }
}

xhr.open('GET', './employees.xml');
xhr.send();