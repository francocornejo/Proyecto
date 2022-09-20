import { Router }from 'express';
import { getProductos, postProductos, getProductoId, putProduct,deleteProduct} from '../controllers/productoController.js';
import { postCarrito, deleteCarrito, listarCarritos, verCarrito, postProdInCart} from '../controllers/carritoController.js';
import { getLogin, getSignup, postRegister, postLogin, getFailsignup, getFaillogin, getLogout, checkAuth, rutaProtegida, info } from '../controllers/usersController.js'
const router = Router();
import passport from 'passport'

//Rutas Productos
router.get('/productos', getProductos)
router.get('/productos/:id', getProductoId)
router.post('/productos', postProductos)
router.put('/productos/:id', putProduct)
router.delete('/productos/:id', deleteProduct)

//Rutas Carrito
router.post('/carrito', postCarrito) 
router.delete('/carrito/:id', deleteCarrito)
router.get('/carrito', listarCarritos)
router.get('/carrito/:id/productos', verCarrito)
router.post('/carrito/:id_cart/productos/:id_prod', postProdInCart)

//Rutas de Login y Registro
router.get("/login", getLogin)
router.post("/login", passport.authenticate("login", {failureRedirect: "/faillogin"}), postLogin)
router.get("/register", getSignup)
router.post("/register", passport.authenticate("register", { failureRedirect: "/failsignup"}), postRegister)
router.get('/faillogin', getFaillogin)
router.get("/failsignup", getFailsignup)
router.get('/logout', getLogout)

//Rutas de funciones
router.get('/ruta-protegida', checkAuth, rutaProtegida)
router.get('/info', info)

export default router