import ContenedorMongo from '../../contenedores/contenedorMongo.js';
import ProductoDTO from '../../classes/DTO.class.js'
import {Productos} from '../../models/models.js'
import {CustomError} from '../../classes/CustomError.class.js'
import MongoClient from "../../classes/MongoClient.class.js"
import DAO from '../../classes/Dao.class.js'

export default class ProductoDaoMongo extends DAO{
    constructor(){
        super();
            this.collection = Productos
            this.db = new MongoClient();
    }

    async newProduct(title, description, code, price, thumbnail, stock){
        try {
            const doc = new this.collection({title, description, code, price, thumbnail, stock,timestamp:Date.now()})
            await doc.save()   
            console.log(`Se agrego un nuevo producto : ${doc}`)
            return new ProductoDTO(doc)
        } catch (error) {
            throw new CustomError(500, error);
        }
      }

    async productById(id){
        try{
            const doc = this.collection.doc(id)
            console.log(doc)
            return new ProductoDTO(doc);
        }catch(err){
            throw new CustomError(500, err);
        }
        //res.json(doc)
    }
    
    async update(id, title, description, code, price, thumbnail, stock){
        await this.collection.updateOne({_id:id}, {title, description, code, price, thumbnail, stock})
        console.log(this.collection)  
        try{
            const producto = await this.getById(id) 
       
            return new ProductoDTO(producto)
        } catch (error) {
            throw new CustomError(500, error);
        }      
    }

    async getAll(){
        try {
          // await this.db.connect();
          const productos = await this.collection.find({ });
          const result = productos.map((producto)=>(new ProductoDTO(producto)))
          
          return result;
        } catch (error) {
          throw new CustomError(500, error);
        }      
      }

      static getInstance() {
        let instance
        if (!instance) instance = new ProductoDaoMongo();
    
        return instance;
      }
}