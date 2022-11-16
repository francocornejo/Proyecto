import { Router }from 'express';
import { postProductos, getProductoId, putProduct,deleteProduct} from '../controllers/productoController.js';
import { postCarrito,cartCheckout, deleteCarrito, getUserCart, verCarrito, addProduct, deleteProductFromCart} from '../controllers/carritoController.js';
import { getLogin, getSignup, postRegister, postLogin, getFailsignup, getFaillogin, getCatalogo, getLogout, checkAuth, rutaProtegida, info, getHome, getUserInfo, getHomeAdmin } from '../controllers/usersController.js'
const router = Router();
import upload from '../multer/loadFile.js'
import passport from 'passport'

//Rutas Productos
router.get('/productos',checkAuth, getCatalogo)
router.get('/productos/:id',checkAuth, getProductoId)
router.post('/productos',checkAuth, postProductos)
router.put('/productos/:id',checkAuth, putProduct)
router.get('/productoDelete/:id',checkAuth, deleteProduct)

//Rutas Carrito
router.post('/carrito',checkAuth, postCarrito)
router.get('/carrito',checkAuth, getUserCart)
router.get('/carrito/deleteproducto/:id',checkAuth, deleteProductFromCart)
router.get('/carrito/:id/productos',checkAuth, verCarrito)
router.post('/carrito/productos/:id',checkAuth, addProduct)
router.get('/carrito/checkout',checkAuth, cartCheckout)

//Rutas de Login y Registro
router.get("/",checkAuth, getHome) //noAdmin
router.get("/home",checkAuth, getHomeAdmin)
router.get("/catalogo",checkAuth, getCatalogo)
router.get("/login", getLogin)
router.post("/login", passport.authenticate("login", {failureRedirect: "/api/faillogin"}), postLogin)
router.get("/register", getSignup)
router.post("/register", upload.single('avatar'), passport.authenticate("register", { failureRedirect: "/api/failsignup"}), postRegister)
router.get('/faillogin', getFaillogin)
router.get("/failsignup", getFailsignup)
router.get('/logout',checkAuth, getLogout)
router.get('/infoUser',checkAuth, getUserInfo)

//Rutas de funciones
router.get('/ruta-protegida', checkAuth, rutaProtegida)
router.get('/info', info)

export default router