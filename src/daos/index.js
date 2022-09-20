let ProductoDao;
let CarritoDao;

    const { default: ProductoDaoMongo } = await import("./productos/productoDaoMongo.js");
    const { default: CarritoDaoMongo } = await import("./carritos/carritoDaoMongo.js");

    ProductoDao = new ProductoDaoMongo;
    CarritoDao = new CarritoDaoMongo;

export { ProductoDao, CarritoDao}