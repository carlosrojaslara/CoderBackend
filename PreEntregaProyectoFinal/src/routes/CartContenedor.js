const express = require('express');
const router = express.Router();

const ProductManager = require('../managers/ProductManager');
const productService = new ProductManager;

const CartManager = require('../managers/CartManager');

const cartService = new CartManager;

router.delete('/:id',(req,res)=>{
    const data = req.params.id;
    if(isNaN(data)) return res.status(400).send({error:"not a number"})
    let number = parseInt(data)
    cartService.deleteById(number).then(result=>res.send(result))
    .catch(err=>console.log(err))
})

router.post('/',(req,res)=>{
    cartService.add().then(result=>res.send(result))
    .catch(error=>console.log(error))
})

router.get('/:id/productos',(req,res)=>{
    const data = req.params.id;
    let parseData = parseInt(data)
    cartService.getAll(parseData).then(result=>res.send(result))
    .catch(err=>console.log(err))
})

router.post('/:id/productos',(req,res)=>{
    const data = req.params.id;
    // const product = req.body;
    let parseData = parseInt(data);
    productService.getById(parseData).then(result=>cartService.addProduct(result.producto,parseData).then(result=>res.send(result))
    .catch(error=>console.log(error)))
})

router.delete('/:id/productos/:id_prod',(req,res)=>{
    const carritoId = req.params.id;
    const productoId = req.params.id_prod;
    const parseCarrito = parseInt(carritoId)
    const parseProducto = parseInt(productoId)
    cartService.deleteProductInCart(parseCarrito,parseProducto).then(resul=>res.send(resul))
    .catch(err=>console.log(err))
})

module.exports = router;