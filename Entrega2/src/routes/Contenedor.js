const express = require('express');
const router = express.Router()
const Contenedor = require('../Managers/Contenedor')
const uploader = require('../services/Uploader')


const userService = new Contenedor('../files/productos.json');

router.get('/',(req,res)=>{
    userService.get().then(result=>res.send(result))
})

router.post('/',uploader.single('file'),(req,res)=>{
    let product = req.body;
    let file =req.file;
    if(!file) return res.status(500).send({error:"no se pudo cargar el archivo"})
    product.thumbnail = req.protocol+"://"+req.hostname+":8080/img/"+file.filename;
    userService.save(product).then(result=>res.send(result))
})

module.exports = Contenedor;
