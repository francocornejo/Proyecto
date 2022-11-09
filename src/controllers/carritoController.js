import {CarritoDao} from '../daos/index.js';
import { ProductoDao } from '../daos/index.js';
import {getUserCartService, addProductService, deleteProductFromCartService} from '../services/cartService.js'

export const postCarrito = async (req, res)=>{
    console.log("POST", req)
    const usuario = req.user.username
    const elemento = await CarritoDao.newCart(usuario)
    console.log("Elemento: ", elemento)
    res.redirect("/api/carrito")
}

export const addProduct = async (req,res)=>{
    const cantidad= req.body.cant || 1
    const id_prod=req.params.id
    const username = req.user.username
    addProductService(cantidad,id_prod,username)
    res.redirect('/api/productos')
    //res.json(carrito)
}

//Esta funcion devuelve lo que hay en carrito,
//completar hbs
export const getUserCart = async (req, res)=>{ 
    console.log("GET", req)
    const usuario = req.user.username
    let carrito = await getUserCartService(usuario)
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

export const deleteProductFromCart = async (req,res)=>{  
    const id_prod=req.params.id
        console.log('id_prod',id_prod);
    const username = req.user.username
        console.log('username',username);
    await   deleteProductFromCartService(id_prod,username)
    res.redirect('/api/cart') 
}