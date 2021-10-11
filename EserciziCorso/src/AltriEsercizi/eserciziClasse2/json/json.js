// interazione con una response in formato json
const xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {

        // l'oggetto JSON che ci mette a disposizione javascript
        // ha il metodo parse, che ci permette di convertire la stringa
        // proveniente dalla proprietà responseText, in un oggetto javascript
        // facilmente manipolabile
        const listaDipendenti = JSON.parse(xhr.responseText);
        console.log(listaDipendenti.employees);

        for (let dip of listaDipendenti.employees) {
            let container = document.createElement('div');
            let labels = `
                <label>Nome: </label> ${dip.firstname}
                <label>Cognome: </label> ${dip.lastname}
            `

            container.innerHTML = labels;
            document.querySelector('body').appendChild(container)
        }
    }
}


xhr.open('GET', './employees.json', true);
xhr.send();