import express from 'express';
const app = express();
import rutas from './rutas/index.js'
const puerto =process.env.PORT||8080 

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api", rutas);

app.listen(puerto, (err) => {
  if(err) {
      console.log(`Se produjo un error al iniciar el servidor: ${err}`)
  } else {
      console.log(`Servidor escuchando puerto: ${puerto}`)
  }
})