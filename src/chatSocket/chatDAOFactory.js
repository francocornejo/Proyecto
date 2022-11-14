import ChatDaoMongo from "./chatDAOMongo.js"

export default class ChatDaoFactory {
  static getDao() {
    if (process.argv[2] === "mongo" || "mongo" == "mongo") return ChatDaoMongo.getInstance();
  }
}