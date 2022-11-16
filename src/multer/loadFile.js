import multer from "multer"
import path from'path'
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

//GUARDAR FILE
let fileStorageEngine = multer.diskStorage({
  destination: (req, file,cb)=>{
    cb(null, path.join(__dirname, "../views/avatar"))
  },
  filename:(req, file ,cb)=>{
    cb(null,file.originalname)
  }
})
let upload = multer({storage:fileStorageEngine})

export default upload