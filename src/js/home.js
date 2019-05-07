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

  //formulario de busqueda
  const $form = document.getElementById('form');
  const $home = document.getElementById('home');
  const $featuringContainer = document.getElementById('featuring');

  //funcion para crear los atributos de un html creado con js
  function setAttributes($element, attributes) {
    for(const attribute in attributes) {
        //setAttribute permite asignar el valor
        $element.setAttribute(attribute, attributes[attribute]);
    }
  }
  //BASE_API esta en mayusculas porque es una constante nunca va a variar
  const BASE_API = 'https://yts.am/api/v2/'
  //creando un template
  function featuringTemplate(peli) {
    return(  
    `
      <div class="featuring">
        <div class="featuring-image">
          <img src="${peli.medium_cover_image}" width="70" height="100" alt="">
        </div>
        <div class="featuring-content">
          <p class="featuring-title">Pelicula encontrada</p>
          <p class="featuring-album">${peli.title}</p>
        </div>
      `
    )
  }

  $form.addEventListener('submit',async (event) => {
    //preventDefault evita que cada vez que se haga una busqueda no recargue la pagina  
    //quitar la acción por defecto
    event.preventDefault();
    //agrega la clase search-active después de hacer una busqueda
    $home.classList.add('search-active');

    //creando el elemento HTML con document.createElement : louder
    const $loader = document.createElement('img');
    //llamando a la función para a gregar los atributos
    setAttributes($loader, {
        src: 'src/images/loader.gif',
        height: 50,
        width: 50,
    })
    $featuringContainer.append($loader);

    //obtener el texto de la pelicula que estoy buscando en el formulario para luego hacer una petición
    const data = new FormData($form);
    //funcion asincrona para traer nuevos datos
    //limit limit de busqueda con ? se enlazan condiciones 
    //asiganción de una variable por destructuración
    const {
        data: {
            movies: pelis
        }
    } = await getData(`${BASE_API}list_movies.json?limit=1&query_term={${data.get('name')}`);
    const HTMLString = featuringTemplate(pelis);
    //remplazar por nuevo html
    $featuringContainer.innerHTML = HTMLString;

               
  })

  //Listas
  //const actionList = await getData('https://yts.am/api/v2/list_movies.json?genre=action');
  //la modificamos con ${BASE_API}
  //const actionList = await getData(`${BASE_API}list_movies.json?genre=action`);
  //destructurando
  const { data: {movies: actionList} } = await getData(`${BASE_API}list_movies.json?genre=action`);
  const { data: {movies: dramaList} } = await getData(`${BASE_API}list_movies.json?genre=drama` );
  const { data: {movies: animationList} } = await getData(`${BASE_API}list_movies.json?genre=animation`);


  console.log("actionList", actionList);
  console.log("dramaList", dramaList);
  console.log("animationList", animationList);
   // debugger
  function videoItemTemplate(movie, category) {
    return (
        `<div class="primaryPlaylistItem" data-id="${movie.id}" data-category="${category}">
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


/*    //definiendo las variables para llamar a los selectores
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
*/

    //Creando funciones

    const $actionContainer = document.querySelector("#action");
    const $dramaContainer = document.getElementById("drama");
    const $animationContainer = document.getElementById("animation");
    //creamos una función que nos cree el HTML


    function createTemplate(HTMLString){
        const html = document.implementation.createHTMLDocument();        
        html.body.innerHTML = HTMLString;
        return html.body.children[0];
    }    
    //evento click sobre la imagen
    function addEventClick($element){
        $element.addEventListener('click', (event) => {
            //llamo a la funcion para  mostrar el modal y le envió el elemento html
            showModal($element)
        })
    }

    function renderMovieList(list, $container, category){
        $container.children[0].remove();
        list.forEach( (movie) => {
           const HTMLString =  videoItemTemplate(movie, category);
           const movieElement = createTemplate(HTMLString);
           $container.append(movieElement);
           //llamamos la función que captura el click de sobre la imagen
           addEventClick(movieElement);
        })
    }

    renderMovieList(actionList, $actionContainer, 'action');
    renderMovieList(dramaList, $dramaContainer, 'drama');
    renderMovieList(animationList, $animationContainer), 'animation';


  //definiendo las variables para llamar a los selectores
  
 
  
  

  const $modal = document.getElementById("modal");
  const $overlay = document.getElementById("overlay");
  const $hideModal = document.getElementById("hide-modal");

  //document.querySelector('#modal img')
  const $modalImage = $modal.querySelector("img");
  const $modalTitle = $modal.querySelector("h1");
  const $modalDescription = $modal.querySelector("p");

  function findById(list, id) {
    return list.find(movie => movie.id === parseInt(id, 10))
  }
 
  function findMovie(id, category) {
      //otra forma de mostrar un arrow function
   // actionList.find(movie => movie.id === parseInt(id, 10))
   switch(category) {
       case 'action' : {
        return findById(actionList, id)
       }
       case 'drama' : {
        return findById(dramaList, id)
       }
       default : {
        return findById(animationList, id)
       }
   }
  }

   //funcion para mostrar el modal y su información
   //la funcion recibe el elemento html
  function showModal($element) {
      //agregar una clase
      $overlay.classList.add('active');
      //agregando un estilo 
      $modal.style.animation = 'modalIn .8s forwards';
      //recibo el dataser id
      const id = $element.dataset.id;
      const category = $element.dataset.category;
      //funcion para buscar los elementos segun el id y la categoria
      const data = findMovie(id, category)
      debugger
      
      $modalTitle.textContent =  data.title;
      $modalImage.setAttribute('src', data.medium_cover_image);
      $modalDescription.textContent = data.description_full;


  }

  $hideModal.addEventListener('click', hideModal);

  function hideModal() {
      $overlay.classList.remove('active');
      $modal.style.animation = 'modalOut .8s forwards';
  }


  
})();
