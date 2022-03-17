const express = require('express')
const router = express.Router();

const ProductManager = require("../managers/ProductManager")

const productService = new ProductManager();



router.get('/',(req,res)=>{
    // console.log(productService.getAll())
    productService.getAll().then(result=>res.send(result))
    .catch(err=> console.log(err))
})

router.get('/:id',(req,res)=>{
    let data = req.params.id;
    if(isNaN(data)) return res.status(400).send({error:"not a number"})
    if(data){
        let number = parseInt(data);
        productService.getById(number).then(result=>res.send(result))
        .catch(err=>console.log(err))
    }else{
        productService.getAll().then(result=>res.send(result))
        .catch(err=>console.log(err))
    }
})

router.delete('/:id',(req,res)=>{
    let data = req.params.id;
    if(isNaN(data)) return res.status(400).send({error:"not a number"})
    let number = parseInt(data);
    productService.deleteById(number).then(result=>res.send(result))
    .catch(err=>console.log(err))
})

router.put('/:id',(req,res)=>{
    let data = req.params.id;
    let parseData = parseInt(data)
    const nombre = req.body.nombre;
    let updated = {nombre:nombre,id:parseData}
    if(isNaN(data)) return res.status(400).send({error:"not a number"})
    let number = parseInt(data);
    productService.updateProduct(number,updated).then(result=>res.send(result))
    .catch(err=>console.log(err))


})


router.post('/',(req,res)=>{
    const newProduct = req.body;
    productService.add(newProduct).then(result=>res.send(result))
    .catch(err=>console.log(err))
})

module.exports = router;