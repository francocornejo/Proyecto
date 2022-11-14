import { Server } from "socket.io"
import { Server as IOServer} from 'socket.io'
//NORMALIZR
import { normalize, schema, denormalize } from "normalizr"
const messagesNormalizar= []
const {escribir} = require ('./write.js')
const logger = require('../utils/logger.js')

// LADO SERVIDOR
export function configChat(expressServer){
    const io = new Server(expressServer)

    io.on('connection', async socket=>{
        console.log('se conecto un usuario')
       
        try {
            // PARTE CHAT _ LADO SERVIDOR
            const authorSchema = new schema.Entity('authors',{},{idAttribute:'mail'})
            const commentSchema = new schema.Entity(
                'comments',
                {author: authorSchema},
                { idAttribute: "id" })
            
            const chatSchema = new schema.Entity(
                'chats', 
                { comments: [commentSchema]},
                { idAttribute: "id" }
            );
            let normalizedChat = normalize({id:"chat1",comments: messagesNormalizar}, chatSchema); 
            
            // print('capacidad normalizedChat',JSON.stringify(normalizedChat).length) 
            io.emit('serverSend:message', normalizedChat) //envio CHATS a todos los usuarios
            //archivo a Normalizar - recibido desde el Front
            socket.on('client:messageNormalizar', messageInfo=>{
                messageInfo.id=(messagesNormalizar.length)+1
                messagesNormalizar.push(messageInfo) //RECIBO mensaje y lo anido
                escribir(messagesNormalizar)
                normalizedChat = normalize({id:"chat1",comments: messagesNormalizar}, chatSchema); 
            
                io.emit('serverSend:message', normalizedChat)
            })
        } catch (error) {
            logger.error('problema chat lado server', error)
        }
    })
}