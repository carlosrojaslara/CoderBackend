const fs = require('fs');
const cartPath = __dirname+"/../files/carts.js"


let cart = {
        id : "",
        timestamp:"",
        products:[]
    }

const fetch = async () =>{
    let data = await fs.promises.readFile(cartPath, "utf-8",);
    let cart = JSON.parse(data)
    return cart;
}
class CartManager {



    createCart = async () => {
        if(fs.existsSync(cartPath)){
            try{
                await fs.promises.writeFile(cartPath, JSON.stringify(cart),null,2)
            }catch(error){
                return {status:error, error:error}
            }
        }
    }

    getCart = async (id) =>{
        if(fs.existsSync(cartPath)){
            try {
                let cart = await fetch();
                return {status : "success", payload : cart}

            }catch(error){
                return {status:"error", error:error}
            }
        }
    }
    add = async(cart)=>{
        if(fs.existsSync(cartPath)){
            try{
                let cart = await fetch();
                if(cart.length===0){
                    cart.id = 1 ;
                    await fs.promises.writeFile(cartPath,JSON.stringify([cart],null,2))
                    return {status:"success", message:"cart added"}
                }

            }catch(error){
                return {status:"error", error:error}
            }
        }
    }
} 

module.exports = CartManager