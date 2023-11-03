// Cliente.js

const mongoose = require('mongoose');

// Define el esquema del Cliente
const clienteSchema = new mongoose.Schema({
    cedula: {
        type: String,
        unique: true,
        required: true,
    },
    tipoDocumento: {
        type: String,
        enum: ['TI', 'CC', 'PS', 'EX'],
        required: true,
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    genero: {
        type: String,
        enum: ['Masculino', 'Femenino', 'Otro', 'No especificado'],
        required: true,
    },
    fechaNacimiento: {
        type: Date,
        required: true,
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    telefono: String,
    direccion: String,
    estadoCliente: {
        type: Boolean,
        default: true, 
    },
    fotoPerfil: String,
    ciudad: String,
    barrio: String,
    pass: {
        type: String,
        required: true,
    }
});


// Crea el modelo de Cliente
const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;