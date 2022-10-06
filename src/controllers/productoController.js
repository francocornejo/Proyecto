import ProductoDaoFactory from '../classes/ProductoDaoFactory.class.js'
const getDaos = ProductoDaoFactory.getDao()

export const getProductos = async (req, res) => {
    const verProductos = await getDaos.getAll()
    res.render('post-product', {verProductos})
}

export const postProductos = async (req, res) => {
    const {title, description, code, price, thumbnail, stock} = req.body 
    const elemento = await getDaos.newProduct(title, description, code, price, thumbnail, stock)
    const verProductos = await getDaos.getAll()
    console.log("AAAAAAAAAA", elemento)
    res.render("catalogo", {verProductos})
}

export const getProductoId = async (req, res) => {
    const id = req.params.id
    console.log('id', id)
    const elemento = await getDaos.getById(id)
    console.log('elemento', elemento)
    if(!elemento){return res.status(404).json({error: "Producto no encontrado"})}
    res.json(elemento)
}

export const putProduct = async (req, res) => {
    const {title, description, code, price, thumbnail, stock} = req.body
    const id = req.params.id
    const elemento = await getDaos.getById(id)
    if(!elemento){return res.status(404).json({error: "Producto no encontrado"})}
    const elementChanged = await getDaos.update(id,title, description, code, price, thumbnail, stock)
    res.json(elementChanged)
    
}

export const deleteProduct = async (req, res) => {
    const id = req.params.id
    if(!id){return res.json({ error: "El parámetro no es un número o el id no existe" })}
    await getDaos.deleteById(id)
    res.json(await getDaos.getAll())
}

export const loadProduct = async (req, res) => {
    const body = req.body
    res.render("loadProduct", {body} )
}