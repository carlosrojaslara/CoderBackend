const Contenedor = require('./Contenedor.js')

const userService = new Contenedor('./src/files/productos.json');


let producto1 = {
    title : "Escuadra",
    price: 23 ,
    thumbnail : 'sdasa'

}

let producto2 = {
    title : "Lapiz",
    price: 24,
    thumbnail : 'sada'
} 

let producto3 = {
    title : "lapicera",
    price : 34,
    thumbnail: 'asdas'
}

userService.save(producto3).then(result=>console.log(result))
// userService.getAll().then(result=>console.log(result))
// userService.getById(1).then(result=>console.log(result))
// userService.deleteAll().then(result=>console.log(result))
//userService.deleteById(1).then(result=>console.log(result))