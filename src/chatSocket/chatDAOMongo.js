import chatDTO from "./chatDTOClass.js"  ;
import {CustomError} from "../classes/CustomError.class.js" ;
import DAO from "../classes/Dao.class.js" ;
import MongoClient from "../classes/MongoClient.class.js"
import {Chats} from "../models/models.js"


export default class ChatDaoMongo extends DAO {
  constructor() {
    super();
    this.collection = Chats;
    this.db = new MongoClient();
  }

  async deleteById(id){
    try {
      // await this.db.connect();
      await this.collection.deleteOne({_id:id});
    } catch (error) {
      throw new CustomError(500, error);
    }//finally {
    //   await this.db.disconnect();
    // }
      
  }
  async getByUsername() {
    throw new CustomError(500, "Falta implementar getByUsername en sub clase");
  }
  async getById(id)  {
    try {
      // await this.db.connect();
      const chat = await this.collection.findOne({ _id: id }, { __V: 0 });
      return new chatDTO(chat);
    } catch (error) {
      throw new CustomError(500, error);
    }//finally {
    //   await this.db.disconnect();
    // }
  
  }
  async getAll(){
    try {
      // await this.db.connect();
      const chats = await this.collection.find({ });
      
      return chats.map((chat)=>new chatDTO(chat));
    } catch (error) {
      throw new CustomError(500, error);
    }//finally {
    //   await this.db.disconnect();
    // }
  
  }
  async create(messagechat){
    try {
      const chat = new this.collection(messagechat)
      await chat.save() 
      
      return new chatDTO(chat)
    } catch (error) {
      throw new CustomError(500, error);
    }               
  }

  async update(id, mail,nombre,apellido,edad,alias,avatar,message){
    try {
      // await this.db.connect();
      await this.collection.updateOne({_id:id}, {mail,nombre,apellido,edad,alias,avatar,message})   
      const chat = await this.getById(id) 
       
      return new chatDTO(chat)
    } catch (error) {
      throw new CustomError(500, error);
    }//finally {
    //   await this.db.disconnect();
    // } 
    
  }

  static getInstance() {
    let instance
    if (!instance) instance = new ChatDaoMongo();

    return instance;
  }
  
}

