const express = require('express');
const { Server } = require ('socket.io')
const userRouter = require('./routes/Contenedor')
const Contenedor = require ('./Managers/Contenedor.js');
const req = require('express/lib/request');

const app = express();

const PORT =process.env.PORT||8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/Contenedor',userRouter);


const server = app.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`)  ;  
})

const productService = new Contenedor();

const io = new Server(server);
app.use(express.static(__dirname+'/public'))


io.on('connection',async socket=>{
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
 
let sentence = "hola que tal"

app.get('/api/sentence', (req , res)=>{
    res.send({sentence:sentence})
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.post('/api/words',(req,res)=>{
	let clientWord = req.body.word;
    sentence = sentence.concat(` ${clientWord}`)
	res.send({sentence:sentence})
})

app.put('/api/words/:pos',(req,res)=>{
    let param = req.params.pos;
    let clientWord = req.body.word
    if(isNaN(param)) return res.status(400).send({error:"not a number"})
    let number = parseInt(param);
    let array = sentence.split(` `);
    if(number<1||number>array.length) return res.status(400).send({error:"out of bonds"})
    array[number - 1] = clientWord;
    sentence = array.join(' ');
    res.send({newSentence: sentence})
})

app.delete('/api/words/:pos',(req,res)=>{
    let param = req.params.pos
    if (isNaN(param)) return res.status(400).send({error:"not  number"})
    let number = parseInt(param);
    let array = sentence.split(' ');
    if (number<1||number>array.length) return res.status(400).send({error:"out of b"})
    array.splice(number-1,1)
    sentence = array.join(' ');
    res.send({newSentence:sentence})
})

