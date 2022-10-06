import ProductoDaoMongo from "../daos/productos/productoDaoMongo.js" ;

export default class ProductoDaoFactory {
  static getDao() {
    if (process.argv[2] === "mongo" || "mongo" == "mongo") return ProductoDaoMongo.getInstance();
  }
}