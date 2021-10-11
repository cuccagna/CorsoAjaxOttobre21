let operazione = false;

// istanziamo l'oggetto Promise che funge da proxy (una sorta di passa carte)
// const promise = new Promise(
//     // nel costruttore passiamo una funzione di callback
//     // che accetta come argomenti a sua volta due funzioni (gli handlers resolve e reject)
//     (resolve, reject) => {
//         if (operazione) {
//             resolve("l'operazione è andata a buon fine");
//         } else {
//             reject("l'operazione è fallita");
//         }
//     }
// )

// promise.then(
//     (messagge) => {
//         console.log(messagge)
//     }, 
//     (errorMessage) => {
//         console.log(errorMessage)
//     }
// )


function test() {
    let risultato;
    setTimeout(() => {
        risultato = 'ciao';
    }, 3000)

    return risultato;
}

console.log(test())


function testPromise() {
    let risultato;

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            risultato = 'ciao';
            resolve(risultato);
        }, 3000)
    }) 
}

testPromise().then((res) => {
    console.log(res);
})




