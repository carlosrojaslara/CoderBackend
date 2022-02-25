const fs = require('fs');

const pathToProducts = __dirname+'/../files/productos.json'

class Contenedor {
    constructor (path) {
        this.path=path;
    }

    save = async (producto) => {
        if(!producto.title||!producto.price||!producto.thumbnail) return {status:"error", error:"missing"}
        try {
            if(fs.existsSync(this.path)){
                let data = await fs.promises.readFile(this.path,'utf-8')
                let productos = JSON.parse(data);
                let id = productos[productos.length-1].id+1
                producto.id = id;
                productos.push(producto);
                await fs.promises.writeFile(this.path,JSON.stringify(productos,null,2))
                return {status:"succes", message:"User created"}
            }else{
                producto.id=1
                await fs.promises.writeFile(this.path,JSON.stringify([producto],null,2))
                return {status:"succes",message:"Producto created"}
            }
        }catch(error){
 
            return {status:"error",message:error}
        }
    }

    fetch= async () =>{

        let data = await fs.promises.readFile(pathToProducts,'utf-8');
        let productos = JSON.parse(data);
        return productos;
    } 

    getAll = async() =>{
        if(fs.existsSync(pathToProducts)){
            try{
                let productos = await this.fetch();
                return {status:"succes",payload:pets}
            }
            catch(error){
                return {status:"error",error:error}

            }
        }
    }

    add = async (producto) =>{
        if(fs.existsSync(pathToProducts)){
            try{
                let productos = await fetch();
                if(productos.length===0){
                    producto.id=1;
                    await fs.promises.writeFile(pathToProducts,JSON.stringify([pet],null,2))
                    return {status:"succes",message:"Producto agregado"}
                }
                producto.id = productos[productos.length-1].id+1;
                productos.push(producto);
                await fs.promises.writeFile(pathToProducts,JSON.stringify(productos),null,2);
                return {status:"succes",message:"Producto agregado"}
            }catch(error) {
                return {status:"error",error:error}
            }
        }
        producto.id=1;
        await fs.promises.writeFile(pathToProducts,JSON.stringify([pet],null,2))
         return {status:"succes",message:"Producto agregado"}
    }

    getById =async (id) =>{
        if(fs.existsSync(this.path)){
            let data = await fs.promises.readFile(this.path,'utf-8')
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

    deleteAll = async () =>{
        let data = await fs.promises.readFile(this.path,'utf-8')
        let productos = JSON.parse(data);
        productos =[]
        await fs.promises.writeFile(this.path,JSON.stringify(productos,null,2))
        return {status:"succes", message:"Productos deleted"}

    }
    deleteById = async(id)=>{
        if(!id) return {status:"error",error:"id needed"}
        if(fs.existsSync(this.path)){
            let data = await fs.promises.readFile(this.path,'utf-8')
            let productos = JSON.parse(data);
            let newProductos = productos.filter(user=>user.id!==id)
            await fs.promises.writeFile(this.path,JSON.stringify(newProductos,null,2))
            return {status:"success",message:"producto eliminado"}
        }


    }
}

module.exports = Contenedor;