import {CarritoDao} from '../daos/index.js';
import { ProductoDao } from '../daos/index.js';
import {getUserCartService} from '../services/cartService.js'
/* const {addProductService, getUserCartService,cartCheckoutService,
    deleteProductFromCartService } = require ('../service/cart.service.js') */

export const postCarrito = async (req, res)=>{
    const username = req.user.username
    console.log(username)
    const elemento = await CarritoDao.newCart(username)
    res.json(elemento)
}

//Esta funcion devuelve lo que hay en carrito,
//completar hbs
export const getUserCart = async (req, res)=>{ 
    const username = req.user.username
    let carrito = await getUserCartService(username)
    if(!carrito){
        res.render('cart.hbs', false)
    }else{
        const productos = carrito.productos 
        res.render('cart.hbs',{productos})
    }
}

export const postProdInCart = async (req, res) => {
    const id_cart=req.params.id_cart
    const id_prod= req.params.id_prod
    let cart = await CarritoDao.getById(id_cart)
    const elementoProd = await ProductoDao.getById(id_prod)

    console.log("cart: ", id_cart)
    console.log("elementoProd: ", id_prod)
    console.log("QUE VIENE EN CART", cart)
    console.log("aca el prod", elementoProd)
    if(cart && elementoProd){
        console.log("Antes del push",cart[0].productos)
        cart[0].productos.push(elementoProd[0])
        console.log("Despues del push",cart[0])
    }
    cart = await CarritoDao.update(cart[0]._id, cart[0].productos)
    res.json(cart)
}

export const verCarrito = async (req, res) => {
    const id = req.params.id
    const elemento = await CarritoDao.getById(id)
    if(!elemento){return res.status(404).json({error: "Carrito no encontrado"})}
    res.json(elemento)
}
export const deleteCarrito = async (req, res) => {
    const id = req.params.id
    const elemento = await CarritoDao.getById(id)
    if(!elemento){return res.status(404).json({error: "Carrito no encontrado"})}
    await CarritoDao.deleteById(id)
    res.json(await CarritoDao.getAll())
}
export const listarCarritos =  async (req, res) => {
    const verCarritos = await CarritoDao.getAll()
    res.json(verCarritos)
}