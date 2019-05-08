(async function load() {
  //action
  //terror
  //animation
  async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    if(data.data.movie_count > 0){
        return data;
    }

    //debugger
    throw new Error('no se encontro ningún resultado');
    
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

    try {
        const {
            data: {
                movies: pelis
            }
        } = await getData(`${BASE_API}list_movies.json?limit=1&query_term={${data.get('name')}`);
        const HTMLString = featuringTemplate(pelis[0]);
        //remplazar por nuevo html
        $featuringContainer.innerHTML = HTMLString;
    }
    catch(error) {
        //debugger
        alert(error.message);
        $loader.remove();
        $home.classList.remove('search-active');
       
    }

    
  })

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
            //Agregando la animación de fadeIn
            const image = movieElement.querySelector('img');
            //asiganndo un evento load al image
            image.addEventListener('load', (event) => {
                event.srcElement.classList.add('fadeIn');
            })
      //llamamos la función que captura el click de sobre la imagen
            addEventClick(movieElement);
        })
}

//Listas
//const actionList = await getData('https://yts.am/api/v2/list_movies.json?genre=action');
//la modificamos con ${BASE_API}
//const actionList = await getData(`${BASE_API}list_movies.json?genre=action`);
//destructurando
const { data: {movies: actionList} } = await getData(`${BASE_API}list_movies.json?genre=action`);
const $actionContainer = document.querySelector("#action");
renderMovieList(actionList, $actionContainer, 'action');

const { data: {movies: dramaList} } = await getData(`${BASE_API}list_movies.json?genre=drama` );
const $dramaContainer = document.getElementById("drama");
renderMovieList(dramaList, $dramaContainer, 'drama');

const { data: {movies: animationList} } = await getData(`${BASE_API}list_movies.json?genre=animation`);
const $animationContainer = document.getElementById("animation");
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