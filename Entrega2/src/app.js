const express = require('express');
const userRouter = require('./routes/Contenedor')

const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use('/Contenedor',userRouter);

app.use(express.static(__dirname+'public'))

const connectedServer = app.listen(8080,()=>{
    console.log("Listening on port 8080")  ;  
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



