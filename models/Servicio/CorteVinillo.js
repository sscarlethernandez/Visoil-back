const mongoose = require('mongoose');

// Define el esquema para la entidad ServicioCorteVinillo
const servicioCorteVinilloSchema = new mongoose.Schema({
  id: { type: String, default: mongoose.Types.ObjectId },
  imagen: String,
  color: String,
  nombre: String,
  descripcion: String,
  texto: String,
  tamanio: String,
  tipo: String
});

// Crea un modelo a partir del esquema
const ServicioCorteVinillo = mongoose.model('ServicioCorteVinillo', servicioCorteVinilloSchema);

// Exporta el modelo para poder utilizarlo en otras partes de tu aplicación
module.exports = ServicioCorteVinillo;
