const express = require('express');
const Contenedor = require('./Contenedor.js')
const userService = new Contenedor('./src/files/productos.json');


const app = express();

const connectedServer = app.listen(8080,()=>{
    console.log("Listening on port 8080")  ;  
})

app.get('/',(request, response)=>{
    response.send("hola")
})

app.get('/productos',(req,res)=>{
    userService.getAll().then(result=>res.send(result.payload))
                        .catch(error =>console.log(error))
})

let random = Math.floor(Math.random() * (4 - 1 ) + 1)

app.get('/productoRandom',(req,res)=>{
    userService.getById(random).then(result=>res.send(result))
                                .catch(error => console.log(error))
})





// const server = http.createServer((request, response)=>{
//     response.end("hola rey")
// }) 

// const connectedServer = server.listen(8080,()=>{
 
// })