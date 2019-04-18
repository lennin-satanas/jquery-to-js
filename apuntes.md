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

