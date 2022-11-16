import {CarritoDao} from'../daos/index.js'
import ProductoDaoFactory from '../classes/DaoFactory.class.js'
const DAO = ProductoDaoFactory.getDao()
import { CustomError } from '../classes/CustomError.class.js'

import { OrdenesDaoFactory } from '../classes/DaoFactory.class.js'
const DAOOrder = OrdenesDaoFactory.getDao();

export const addProductService = async (cantidad,id_prod,username)=>{
    let carrito = await CarritoDao.cartByUsername(username)

    if(!carrito) { carrito= await CarritoDao.newCart(username)}

    carrito.productos.map( (prod)=> console.log('prod.id',prod._id))

    const indice = carrito.productos.findIndex( (prod)=> prod._id === id_prod)

    if(indice >= 0){
        carrito.productos[indice].cantidad += cantidad
    }else{
        let producto = await DAO.getById(id_prod)

        carrito.productos.push({
            _id:producto._id,
            title:producto.title,
            price:producto.price,
            cantidad
        })
    }
    carrito = await CarritoDao.update(carrito._id,carrito.productos)
}

export const getUserCartService = async (username)=>{ 
    let carrito = await CarritoDao.cartByUsername(username)
    return carrito  
}

export const cartCheckoutService = async (user)=>{
    try {
        let carrito = await CarritoDao.cartByUsername(user.username)  
        let order = await DAOOrder.create(carrito)
        // const message= carrito.productos.map(producto=>
        //     `PRODUCTO: ${producto.title} PRECIO UNIT.: ${producto.price} CANTIDAD: ${producto.cantidad}`  
        // )
        const recibido = `El Pedido se encuentra en proceso. Gracias por su compra` ///////////
        await CarritoDao.deleteById(carrito._id)
        return order 
    } catch (error) {
        throw new CustomError(500, error);
    }
}
export const deleteProductFromCartService = async (id_prod,username)=>{
    let carrito = await CarritoDao.cartByUsername(username)
    if(!carrito) { 
        throw 'carrito no existe' 
    }
    carrito.productos = carrito.productos.filter((prod)=>prod._id !== id_prod)
    carrito = await CarritoDao.update(carrito._id,carrito.productos)
}