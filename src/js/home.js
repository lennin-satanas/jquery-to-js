//console.log('hola mundo 1');
//creando una promesa

/*
const getUserAll = new Promise(function(todoBien, todoMal){

    //simulando la espera con un setTimeout
    //recibe dos parametros una función y el tiempo de ejecución
    setTimeout(function(){
      //todoMal('fallo se acabo el tiempo 5000');
      todoBien('bien se acabo el tiempo 5000');
    },5000)

})

const getUser = new Promise(function(todoBien, todoMal){

    //simulando la espera con un setTimeout
    //recibe dos parametros una función y el tiempo de ejecución
    setTimeout(function(){
      //todoMal('fallo se acabo el tiempo 3000');
      todoBien('bien se acabo el tiempo 3000');
    },3000)

})
*/
//consumiendo una promesa
/*
getUser
    .then(function(){
        console.log('todo esta bien en este sw')
    })
    .catch(function(mensaje){
        console.log(mensaje)
    })
*/

//espera a que se ejecuten las dos
/*
Promise.all([
    getUser,
    getUserAll,
])
.then(function(mes){
    console.log(mes)
})
.catch(function(message){
    console.log(message)
})
*/
//cuando falla solo envia un mensaje
//cuando es un exito retorna todos los mensajes

//carrera de promesa
/*
Promise.race([
    getUser,
    getUserAll,
])
.then(function(mes){
    console.log(mes)
})
.catch(function(message){
    console.log(message)
})

*/
//tutorial de ajax en jquery y javascript
//haciendo uso de ajax
/*
$.ajax('https://randomuser.me/api/xxx',{
    method: 'GET',
    success: function(data){
        console.log(data)
    },
    error: function(error){
        console.log(error)
    }
})
*/
//ahora con vanilla js
/*
fetch('https://randomuser.me/api/xxx')
    .then(function(response){
        console.log(response)
        return response.json()
    })
    .then(function(user){
        console.log('user', user.results[0].name.first)
    })
    .catch(function(){
        console.log('algo fallo')
    });

*/
//funciones asincronas

//declarando una funcion asincrona

/*
async function cargar(){
    //esperar las peticiones de api  await
}
//llamando al a function
cargar()

//o la puedo envolver para que se auto ejecute
*/
/*
(async function load(){
    //await
    const response = await fetch('https://yts.am/api/v2/list_movies.json?genre=action')
    //pauso la aplicación hasta que se ejecute 
    const data = await response.json()
    //no se ejecuta hasta que se ejecuten las dos promesas anteriores
    console.log(data)
})()
*/
// ejemplo de utilización de aync await y promesas
/*
(async function load(){
    //action
    //terror
    //animation
    async function getData(url){
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    const actionList = await getData('https://yts.am/api/v2/list_movies.json?genre=action');
    let terrorList;
    getData('https://yts.am/api/v2/list_movies.json?genre=terro')
        .then(function(data){
            console.log('terrorList', data);
            terrorList = data;
        })
    console.log('actionList', actionList);
})()
*/

(async function load() {
  //action
  //terror
  //animation
  async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  //Listas
  const actionList = await getData(
    "https://yts.am/api/v2/list_movies.json?genre=action"
  );
  const dramaList = await getData(
    "https://yts.am/api/v2/list_movies.json?genre=drama"
  );
  const animationList = await getData(
    "https://yts.am/api/v2/list_movies.json?genre=animation"
  );
  console.log("actionList", actionList);
  console.log("dramaList", dramaList);
  console.log("animationList", animationList);
   // debugger
  function videoItemTemplate(movie) {
    return (
        `<div class="primaryPlaylistItem">
            <div class="primaryPlaylistItem-image">
            <img src="${movie.medium_cover_image}">
            </div>
            <h4 class="primaryPlaylistItem-title">
                ${movie.title}
            </h4>
        </div>`
    )
  }
  //console.log(videoItemTemplate('src/images/covers/bitcoin.jpg', 'Bitcoin'));


    //definiendo las variables para llamar a los selectores
    const $actionContainer = document.querySelector("#action");
    actionList.data.movies.forEach( (movie) => {
    //debugger
    //se trae la plantilla y se guarda en una variable.
        const HTMLString =  videoItemTemplate(movie);
        //se crea un documento html vacío
        const html = document.implementation.createHTMLDocument();
        //se agrega la plantilla al innerHTML del documento html 
        //esto hace que la plantilla en texto se convierta a elementos DOM
        html.body.innerHTML = HTMLString;
        // debugger
        //se agrega el primer hijo (que es donde se encuentra la plantilla) al contenedor donde se quiere agregar la plantilla
        $actionContainer.append(html.body.children[0]);
    //console.log(HTMLString);
    //console.log(videoItemTemplate('src/images/covers/bitcoin.jpg', 'Bitcoin'));
    })

    const $dramaContainer = document.getElementById("drama");
    dramaList.data.movies.forEach( (movie) => {
        const HTMLString = videoItemTemplate(movie);
        const html = document.implementation.createHTMLDocument();
        html.body.innerHTML = HTMLString;
        $dramaContainer.append(html.body.children[0]);
    })

    const $animationContainer = document.getElementById("animation");
    animationList.data.movies.forEach( (movie) => {
        const HTMLString = videoItemTemplate(movie);
        const html = document.implementation.createHTMLDocument();
        html.body.innerHTML = HTMLString;
        $animationContainer.append(html.body.children[0]);

    })


  //definiendo las variables para llamar a los selectores
  
  
  
  const $featuringContainer = document.getElementById("featuring");
  const $form = document.getElementById("form");
  const $home = document.getElementById("home");

  const $modal = document.getElementById("modal");
  const $overlay = document.getElementById("overlay");
  const $hideModal = document.getElementById("hide-modal");

  //document.querySelector('#modal img')
  const modalImage = $modal.querySelector("img");
  const modalTitle = $modal.querySelector("h1");
  const modalDescription = $modal.querySelector("p");

  
})();
