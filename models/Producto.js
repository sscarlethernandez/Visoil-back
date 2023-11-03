const mongoose = require('mongoose');

// Define el esquema del producto
const productoSchema = new mongoose.Schema({
  codigo: {
    type: String,
    required: true,
    unique: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  categoria:{
    type: String,
    required: true,
  },
  referencia: {
    type: String,
    required: true,
  },
  imagen: String, // Puedes almacenar la ruta de la imagen o los datos de la imagen en base64
  tela: String,
  talla: String,
  medida: String,
  disenio: String
});

// Crea el modelo de Producto
const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;