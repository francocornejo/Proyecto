import mongoose from 'mongoose';

//Users
const userSchema = mongoose.Schema({
    username: { type: String, require: true},
    password: { type: String, require: true},
    email: { type: String, require: true},
    firstName: { type: String, require: true},
    lastName: { type: String, require: true},
    address: { type: String, require: true},
    edad: { type: Number, require: true},
    phone: { type: Number, require: true},
    avatar: { type: String, require: true}
})
export const Users = mongoose.model('Usuario', userSchema)

//Productos
const productoSchema= mongoose.Schema({
    title: { type: String, require: true, max: 200 },
    description: { type: String, require: true, max: 200 },
    code:{ type: Number, require: true},
    price:{ type: Number, require: true},
    thumbnail:{ type: String, require: true },
    timestamp:{ type: Date, require: true },
    stock:{ type: Number, require: true}
})

export const Productos = mongoose.model("productos", productoSchema)

const carritoSchema = mongoose.Schema({
  username: { type: String, require: true, max: 200},
  address: { type: String, require: true, max: 100},
  timestamp: {type: String, required: true},
  productos: {type: Array, required: true}
})
export const Carrito = mongoose.model("carrito", carritoSchema)

const chatSchema = new mongoose.Schema({
  mail: { type: String, require: true, max: 200 },
  type: { type: String, require: true, max: 200 },
  tiempochat:{ type: Date, required: true },
  message:{ type: String, require: true},
})

export const Chats = mongoose.model("chats", chatSchema)

const ordenSchema = new mongoose.Schema({
  orderNumber:{ type: Number, require: true},
  timestamp: { type: Date, required: true },
  status:{ type: String, require: true},
  username: { type: String, require: true, max: 200, unique:true},
  address:{ type: String, require: true},
  productos: {type: Array, required: true },
})

export const Ordenes = mongoose.model ("ordenes", ordenSchema)
