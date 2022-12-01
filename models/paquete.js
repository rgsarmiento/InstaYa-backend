const mongoose = require("mongoose");

const paqueteSchema = mongoose.Schema({
    id_user:{
        type: String,
        required: true
    },
    fecha:{
        type: Date,
        required: true
    },
    hora: {
        type: Date,
        required: true
        
    },
    ancho: {
        type: Number,
        required: true
        
    },
    alto: {
        type: Number,
        required: true
        
    },
    largo: {
        type: Number,
        required: true
        
    },
    delicado: {
        type: Boolean,
        required: true
        
    },
    peso: {
        type: Number,
        required: true
        
    },
    direccion: {
        type: String,
        required: true
        
    },
    ciudad: {
        type: String,
        required: true
        
    },
    nameEnvia: {
        type: String,
        required: true
        
    },
    idEnvia: {
        type: Number,
        required: true
        
    },
    direccionDestino: {
        type: String,
        required: true
        
    },
    ciudadDestino: {
        type: String,
        required: true
        
    },
    nameRecibe: {
        type: String,
        required: true
        
    },
    idRecibe: {
        type: Number,
        required: true
        
    },
    estado:{
        type: String,
        required: true,
        default: 'Guardado'
    },
    date: {
        type: Date,
        default: Date.now
    }
  });

module.exports = mongoose.model('Paquete', paqueteSchema)