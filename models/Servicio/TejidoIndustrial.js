const mongoose = require('mongoose');

// Define el esquema para la entidad Elemento
const servicioTejidoIndustrialSchema = new mongoose.Schema({
  id: { type: String, default: mongoose.Types.ObjectId },
  imagen: String,
  color: String,
  texto: String,
  tipo: String
});

// Crea un modelo a partir del esquema
const ServicioTejidoIndustrial = mongoose.model('ServicioTejidoIndustrial', servicioTejidoIndustrialSchema);

// Exporta el modelo para poder utilizarlo en otras partes de tu aplicación
module.exports = ServicioTejidoIndustrial;

