const fs =require('fs')

// const ProductManager = require('./ProductManager');
// const productService = new ProductManager;

const pathToProducts = __dirname+"/../files/carritos.json"
const pathToItems = __dirname+"/../files/productos.json"


class CartManager {

    fetch=async()=>{
        let data = await fs.promises.readFile(pathToProducts,'utf-8')
        let carritos = JSON.parse(data)
        return carritos;
    }

    add = async () =>{
        const carrito = {};
        if(fs.existsSync(pathToProducts)){
            try{
                let carritos = await this.fetch();
                if(carritos.length===0){
                    carrito.id=1;
                    carrito.timestamp=Date.now()
                    carrito.productos=[];
                    console.log(carrito)
                    await fs.promises.writeFile(pathToProducts,JSON.stringify([carrito],null,2))
                    return {status:"succes",message:"carrito creado"}
                }
                carrito.id = carritos[carritos.length-1].id+1;
                carrito.timestamp=Date.now()
                carrito[carritos.length-1].productos=[];b
                carritos.push(carrito)
                await fs.promises.writeFile(pathToProducts,JSON.stringify(carritos,null,2))
                return {status:"success", message:"carrito agregado"}
            }catch(error){
                return {status:"error",error:error}
            }
        }
        carrito.id=1;
        carrito.productos=[];
        carrito.timestamp=Date.now()
        await fs.promises.writeFile(pathToProducts,JSON.stringify([carrito],null,2))
        return {status:"succes",message:"Carrito agregado"}
    }

    addProduct = async (product,id)=>{
        if(fs.existsSync(pathToProducts)){
            try {
                let carritos = await this.fetch();
                let data = await fs.promises.readFile(pathToItems,'utf-8')
                let productos = JSON.parse(data)
                if(id <= productos.length   ){
                    carritos[0].productos.push(product);
                    await fs.promises.writeFile(pathToProducts,JSON.stringify(carritos,null,2));
                    return {status:"succes",message:"producto agregado"}
                }else{
                    return {error:"error", message:"out of bund"}
                }
            }catch(err){return {status:"error",error:err}}
        }
        return {error:"error",message:"error de rutas"}
    }

    deleteById= async(id)=>{
        if(!id) return {status:"error",error:"id needed"}
        if (fs.existsSync(pathToProducts)){
            let carritos = await this.fetch();
            if(carritos.length <= id -1 ){
                return {status:"error",message:"out of bounds"}
            }else{
                let newCarritos = carritos.filter(carrito=>carrito.id!==id)
                for (let i = id-1 ; i<= newCarritos.length - 1 ; i++){
                    newCarritos[i].id--;
                }
                await fs.promises.writeFile(pathToProducts,JSON.stringify(newCarritos,null,2))
                return {status:"success",message:"carrito eliminado"}
            }
        }
    }

    getAll = async(id)=>{
        if(fs.existsSync(pathToProducts)){
            try{
                let carritos = await this.fetch()
                if (carritos.length < id - 1) {
                    return {status:"error",message:"out of bounds"}
                }
                carritos[id-1].productos= {}
                return carritos[id-1].productos
            }catch(error){
                return {status:"error",error:error}
            }
        }
        return {status:"error",message:"no hay carrito disponible"}
    }
    deleteProductInCart = async(id,id_prod)=>{
        if(fs.existsSync(pathToProducts)){
            try{
                let carritos = await this.fetch();
            if(carritos.length <= id -1 ){
                return {status:"error",message:"out of bounds"}
            }else{
                if (id_prod - 1 < carritos[id-1].productos.length){
                let newProductos = carritos[id-1].productos.filter(producto=>producto.id!==id_prod)                    
                    for (let i = id_prod - 1 ; i<= newProductos.length -1  ; i++){
                        newProductos[i].id--;
                    }
                    carritos[id-1].productos=newProductos;
                    await fs.promises.writeFile(pathToProducts,JSON.stringify(carritos,null,2))
                    return {status:"success",message:"produto eliminado del carrito"}
                }else return {error:"error",message:"out of bounds"}
            }
                
            }catch(error){
                return {status:"error",error:error}
             } 

        }
    }
}


module.exports = CartManager;