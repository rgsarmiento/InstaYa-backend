const express = require('express')
const authRoutes = require('./routes/auth.js')
const mongoose = require('mongoose')
const paqueteRoutes = require('./routes/paquete')
const verifyToken = require('./routes/validate-token')
const cors = require('cors')
require('dotenv').config()

const uri = `mongodb+srv://admin:admin@cluster0.5m8kugd.mongodb.net/?retryWrites=true&w=majority`
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a la base de datos')
  })
  .catch((e) => {
    console.log('Database error', e)
  })

var corsOptions = {
  origin: '*', // Aqui debemos reemplazar el * por el dominio del cliente
  optionsSuccessStatus: 200
}

const app = express()

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/user', authRoutes)
app.use('/api/paquetes', verifyToken, paqueteRoutes)


app.get('/', (req, res) => {
  res.json({ mensaje: 'RUTA NO SEGURA' })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`servidor activo en el puerto: ${PORT}`)
})
