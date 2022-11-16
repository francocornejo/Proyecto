import {Users} from '../../models/models.js'
import DAO from "../../classes/Dao.class.js";
import MongoClient from "../../classes/MongoClient.class.js"

export default class UsuarioDaoMongo extends DAO {
  constructor() {
    super();
      this.collection = Users
      this.db = new MongoClient();
  }

  async newUser(username, password, nombre, apellido, direccion, edad, telefono, avatar){
    const doc = new this.collection({username, password, nombre, apellido, direccion, edad, telefono, avatar})
    await doc.save();     
  }

  async update(id, username, password, nombre, apellido, direccion, edad, telefono, avatar){
    await this.collection.updateOne({_id:id}, {username, password, nombre, apellido, direccion, edad, telefono, avatar})        
  }

  async getByUsername(username){
    const doc = await this.collection.findOne({ username: username});
    return doc;
  }

}
