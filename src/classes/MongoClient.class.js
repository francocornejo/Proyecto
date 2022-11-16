import dotenv from 'dotenv'
dotenv.config()
import mongoose from "mongoose" 
import {CustomError} from "./CustomError.class.js" 
import DBClient from "./DBClient.class.js"
let instance

export default class MongoClient extends DBClient {
  constructor() {
    super();
    this.client = mongoose;
  }

  async connect() {
    try {
        
      await this.client.connect(process.env.URL_MONGO);

      console.log("Database connected");
    } catch (err) {
      throw new CustomError(500, err);
    }
  }

  async disconnect() {
    try {
      await this.client.connection.close();

      console.log("Database disconnected");
    } catch (err) {
      throw new CustomError(500, err);
    }
  }

  static getInstance() {
    if (!instance) {
      instance = new MongoClient();
      instance.connect()
    }
    return instance;
  }
}