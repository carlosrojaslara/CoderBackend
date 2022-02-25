const express = require('express');
const { Server } = require ('socket.io')
const userRouter = require('./routes/Contenedor')
const Contenedor = require ('./Managers/Contenedor.js')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/Contenedor',userRouter);


const server = app.listen(8080,()=>{
    console.log("Listening on port 8080")  ;  
})

const productService = new Contenedor();

const io = new Server(server);
app.use(express.static(__dirname+'/public'))


io.on('connection',socket=>{
    console.log('cliente conectado')
    socket.on('sendProduct', async data=>{
        await productService.add(data)
        let products = await productService.getAll();
        io.emit('productLog',products)
    })
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



