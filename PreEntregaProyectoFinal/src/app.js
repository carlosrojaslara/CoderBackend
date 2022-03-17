const express = require('express');
const productRouter = require('./routes/ProductContenedor')
const cartRouter = require('./routes/CartContenedor')
const ProductManager = require('./managers/ProductManager')
const CartManager = require('./managers/CartManager')


const app = express();

const PORT = process.env.PORT||8080;

const server = app.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`)
})

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/productos',productRouter);
app.use('/api/carritos',cartRouter)




