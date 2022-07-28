import { promises as fs } from 'fs';
import config from '../config.js';
import mongoose from 'mongoose';

await mongoose.connect(config.mongodb.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  console.log('Conexion establecida con la DBMongo')

export default class ContenedorMongo {
    constructor(nameCollection, schema) {

        this.collection = mongoose.model(nameCollection, schema);
    }

    async deleteById(id){
        await this.collection.deleteOne({_id:id});
    }
    async getById(id)  {
        const doc = await this.collection.find({ _id: id }, { __V: 0 });
        return doc;
    }
    async getAll(){
        const doc = await this.collection.find({ });
        return doc;
    }
}  