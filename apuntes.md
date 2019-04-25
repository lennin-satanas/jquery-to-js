De jQuery a JavaScript

Procesos asíncronos
Un proceso asíncrono es un código que se está ejecutando, pero no ha terminado de ejecutarse antes de que se ejecute un código que está después de él.

Esto permite que la aplicación no se cuelque mientras está ejecutando un proceso muy largo.

Variables
var es la forma de crear variables hasta ES5.
const es para declarar constantes.
let es para crear variables que cambian.

Funciones
function cambiarNombre(nuevoNombre) {
  cambia = nuevoNombre;
}

//Desde EC6, las funciones se pueden declarar como arrow functions.

cambiarNombre = (nuevoNombre) => {
  cambia = nuevoNombre;
}

Promesas
Una promesa es un objeto que representa la terminación o el fracaso eventual de una operación asíncrona.

Las promesas sirven para manejar nuestro código asíncrono.

“Una Promesa es un objeto que representa la terminación o el fracaso eventual de una operación asíncrona”, o dicho de forma más cotidiana, se va a mandar una función para ver si falla o se ejecuta con éxito.

Al crear una Promesa debemos pasarle por argumento la función que vamos a ejecutar de forma asíncrona, dicha función va a recibir dos parámetros para evaluar si se ejecuto bien la función o si fallo.

Nuestra promesa va a tener dos métodos para saber si todo salió bien o fallo. El método then se encarga cuando la promesa se cumplió exitosamente, mientras que el método catch se encarga cuando la promesa falla.

Dentro de JavaScript tenemos dos funciones para ejecutar una función después de algún tiempo, estas funciones son:

• setInterval: ejecutara una función cada x tiempo.
• setTimeout: ejecutara una función después de x tiempo.

Si queremos resolver varias promesas a la misma vez, Promise cuenta con un método llamado all que recibe un array de promesas como parámetro. Este método se termina cuando todas las promesas del array se terminan de ejecutar. Si una de las promesas falla entonces el método all saltara un error mandándote al método catch.

Promise también cuenta con el método race que te regresa los resultados de la promesa que termine primero.

Promise.all se ejecutan todas la promesas, si una falla todo falla

promise.race carrera de promesas, se ejcuta la primera que termine, solo entra al then de la que primera termine

Tutorial de Ajax en jQuery y Javascript
Una característica muy solicitada en cualquier sitio dinámico es solicitar datos a un servidor, denominado API. Para esto normalmente se utiliza Ajax.

Ajax recibe dos parámetros los cuales son la url de la API y un objeto donde pondrás la configuración que se usara para realizar la petición. En la configuración se añaden dos funciones para manejar cuando la petición se realizo correctamente y cuando falla.

JavaScript internamente cuenta con una función llamada fetch que también realiza peticiones a una API. Al igual que Ajax necesita dos parámetros, una url y una configuración, pero si solo le mandas la url fetch usará una configuración por defecto donde el método HTTP será GET.
fetch te regresa una promesa, esa promesa al resolverse te da los datos de respuesta y tiene un método llamado json que te regresa otra promesa con los datos en formato JSON.

Las promesas resuelven el problema del Callback Hell haciendo que una promesa pueda devolver otra promesa y en lugar de ser anidadas como los callback, estas promesas son encadenadas.

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
    })



Funciones asíncronas.
Una función asíncrona va a ser como una función normal, pero poniendo código asíncrono de forma que sea más fácil de leer de forma síncrona.

Para declarar una función asíncrona se usa la palabra reservada async, luego de eso declaras tu función de forma normal. Dentro de una función asíncrona cuentas con otra palabra reservada llamada await, lo que hará esta palabra es indicar que se debe esperar a que termine de ejecutarse ese fragmento de código antes de continuar.

Vamos a realizar peticiones con fetch a la API de yts para pedirle películas según su categoría y mostrarlas dentro de PlatziVideo. Sin el uso de funciones asíncronas para cada fetch tendríamos que usar los métodos then y catch, en cambio gracias a async/await solo debemos escribir la palabra await antes de cada promesa.

http://www.enrique7mc.com/2016/05/lista-apis-publicas/

Selectores
Un selector nos sirve para poder manipular un objeto del DOM, puedes buscar dicho objeto ya sea por su id, clase, atributo, etc.

Para PlatziVideo necesitamos un selector de un contenedor para ponerle dentro la lista de películas.

En jQuery hacemos un selector de la siguiente forma:

const $home = $(‘ .home ’);

Por convención una variable que este represente un objeto del DOM lleva el signo $, esto es para tener claro que estamos manipulando un objeto del DOM y no algún tipo de información o dato.

Dentro de JavaScript existen distintas funciones para hacer selectores, entre ellas se encuentra:

• getElementById: recibe como parámetro el id del objeto del DOM que estás buscando. Te regresa un solo objeto.
• getElementByTagName: recibe como parámetro el tag que estas buscando y te regresa una colección html de los elementos que tengan ese tag.
• getElementByClassName: recibe como parámetro la clase y te regresa una colección html de los elementos que tengan esa clase.
• querySelector: va a buscar el primer elemento que coincida con el selector que le pases como parámetro.
• querySelectorAll: va a buscar todos los elementos que coincidan con el selector que le pases como parámetro.

//Retorna un elemento con el id home
document.getElementById("home")

//Retorna una lista de elementos con la clase home
document.getElementsByClassname("home")

//Retorna una lista de elementos con el tag div
document.getElementsByTagName("div")

//Devuelve el primer elemento que coincida con el query de búsqueda.
document.querySelector("div .home #modal")

//Devuelve todos los elementos que coincidan con el query de búsqueda.
document.querySelectorAll("div .home #modal")