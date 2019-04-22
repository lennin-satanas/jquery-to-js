
console.log('hola mundo 1');
//creando una promesa
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