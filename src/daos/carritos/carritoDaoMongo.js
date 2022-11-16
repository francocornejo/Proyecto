import { Carrito } from '../../models/models.js';
import MongoClient from "../../classes/MongoClient.class.js"
import DAO from "../../classes/Dao.class.js";
import { CustomError } from '../../classes/CustomError.class.js';


export default class CarritoDaoMongo extends DAO{
    constructor(){
        super();
        this.collection = Carrito
        this.db = new MongoClient();
    }

    async newCart(user, address){
        if(! await this.collection.findOne({ username: user})){
            const userNew = new this.collection({ username: user, address: address ,timestamp: Date.now(), products: ''})
            await userNew.save();
            /* return userNew */
        }else{
            throw new CustomError(500, error); 
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