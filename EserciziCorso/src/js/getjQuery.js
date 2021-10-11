$(documentLoaded);

function documentLoaded(){
   $('#carica').on('click',function(){
      // Questo servizio torna i dati direttamente in json
      $.get('https://jsonplaceholder.typicode.com/posts' , 'json') 
         .done(function(data){
            let extrapoledContain='';
            for(let post of data){
               extrapoledContain += `
                  <p>
                  <strong>titolo</strong>: ${post.title}
                  <br>
                  <strong>contenuto</strong>: ${post.body}
                  </p>
               `;
            }

            $('#container').html(extrapoledContain);
         })
         .fail(function(error){
            alert('Errore nel caricamento dei dati');
            console.log('Errore ',error.status);
         })
   });
}