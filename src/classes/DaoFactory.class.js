import ProductoDaoMongo from "../daos/productos/productoDaoMongo.js" ;
export default class ProductoDaoFactory {
  static getDao() {
    if (process.argv[2] === "mongo" || "mongo" == "mongo") return ProductoDaoMongo.getInstance();
  }
}

import CarritoDaoMongo from "../daos/carritos/carritoDaoMongo.js"
export class CarritoDaoFactory {
  static getDao() {
    if (process.argv[2] === "mongo") return CarritoDaoMongo.getInstance();
  }
}

import OrdenesDaoMongo from "../services/orderService.js"
export class OrdenesDaoFactory {
  static getDao() {
    if (process.argv[2] === "mongo" || "mongo" == "mongo") return OrdenesDaoMongo.getInstance();
    
  }
}