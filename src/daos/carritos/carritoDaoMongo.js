import ContenedorMongo from '../../contenedores/contenedorMongo.js'
import { Carrito } from '../../models/models.js';
import MongoClient from "../../classes/MongoClient.class.js"
import DAO from "../../classes/Dao.class.js";


export default class CarritoDaoMongo extends DAO{
    constructor(){
        super();
        this.collection = Carrito
        this.db = new MongoClient();
    }

    async newCart(user, address){
        console.log("USER: ",user)
        if(! await this.collection.findOne({ username: user})){
            const userNew = new this.collection({ username: user, address: address ,timestamp: Date.now(), products: ''})
            console.log("dentro del if", userNew)
            await userNew.save();
            /* return userNew */
        }else{
            console.log("carrito ya creado")
        }
    }

    async cartByUsername(user){
        const doc = await this.collection.findOne({ username: user});
        return doc;
    }

    async deleteById(id){
        try {
            await this.collection.deleteOne({_id:id});
        } catch (error) {
            throw new CustomError(500, error); 
        }
    }

    async update(id,productos){
        await this.collection.updateOne({_id:id}, {productos})   
        const elemento = await this.getById(id)  
        return elemento
    }
}