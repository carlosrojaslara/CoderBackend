const fs = require('fs');

const pathToProducts = __dirname+"/../files/productos.json"

class ProductManager {

fetch= async () =>{

    let data = await fs.promises.readFile(pathToProducts,'utf-8');
    let productos = JSON.parse(data);
    return productos;
} 

getAll = async () => {
    let productos = []
    if(fs.existsSync(pathToProducts)){
        try{
            let productos = await this.fetch();
            return  productos;
        }catch(error){
            return {status:"error",error:error}
        }
    }
    return productos ;

}

getById =async (id) =>{
    if(fs.existsSync(pathToProducts)){
        let data = await fs.promises.readFile(pathToProducts,'utf-8')
        let productos = JSON.parse(data);
        //METODO FILTER
        // let producto = productos.filter(u=>u.id==id);
        // if (producto.length>0) return {status:"sucess",payload:producto}
        // else return {status:"error", error:"User not found"}
        //METODO FIND
        let producto = productos.find(u=>u.id==id);
        if(producto) return {status:"succes",producto:producto}
        else return {status:"error",error:"User not found"}
    }
}

add = async(producto)=>{
    if(fs.existsSync(pathToProducts)){
        try{
            let productos = await this.fetch();
            if(productos.length===0){
                producto.id=1;
                producto.timestamp=Date.now();                
                await fs.promises.writeFile(pathToProducts,JSON.stringify([producto],null,2))
                return ({status:"succes", message:"Producto agregado"})
            }
            producto.id = productos[productos.length-1].id+1;
            producto.timestamp=Date.now();                
            productos.push(producto)
            await fs.promises.writeFile(pathToProducts,JSON.stringify(productos,null,2))
            return {status:"succes",message:"Producto agregado"}
        }catch(error){
            return {status:"error",error:error}
        }
    }
    producto.id=1;
    producto.timestamp=Date.now();                
    await fs.promises.writeFile(pathToProducts,JSON.stringify([producto],null,2))
    return {status:"succes",message:"Producto agregado"}
    }

    deleteById = async (id) =>{
        if(!id) return {status:"error", error:"id needed"}
        if(fs.existsSync(pathToProducts)){
            let data = await fs.promises.readFile(pathToProducts,'utf-8')
            let productos = JSON.parse(data);
            if (productos.length < id - 1 ){
                return {status:"error" , message: "out of bounds"}

            }else{
                
                let newProductos = productos.filter(user=>user.id!==id)
                for (let i = id-1 ; i <= newProductos.length -1  ; i++ ){
                    newProductos[i].id --;
                }
                await fs.promises.writeFile(pathToProducts,JSON.stringify(newProductos,null,2))
                return {status:"success",message:"producto eliminado"}
            }
        }
    }

    updateProduct = async (id,updatedProduct) =>{
        if(!id) return {status:"error", error:"id needed"}
        if(fs.existsSync(pathToProducts)){
            let data = await fs.promises.readFile(pathToProducts,'utf-8')
            let productos = JSON.parse(data);
            if (productos.length < id - 1 ){
                return {status:"error" , message: "out of bounds"}
            } else {
                let newProductos = productos.map((producto)=>{
                    if(producto.id===id){
                        return updatedProduct;
                    }
                    else{
                        return producto;
                    }
                })
                await fs.promises.writeFile(pathToProducts,JSON.stringify(newProductos,null,2))
                return {status:"success",message:"producto upgradeado"}

            }
       }

    }

}


module.exports = ProductManager;