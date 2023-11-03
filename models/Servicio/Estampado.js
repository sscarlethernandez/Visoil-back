const mongoose = require('mongoose');

// Define el esquema para la entidad servicioEstampadoSchema
const servicioEstampadoSchema = new mongoose.Schema({
  id: { type: String, default: mongoose.Types.ObjectId },
  imagen: String,
  descripcion: String,
  tipo: String
});

// Crea un modelo a partir del esquema
const ServicioEstampado = mongoose.model('ServicioEstampado', servicioEstampadoSchema);

// Exporta el modelo para poder utilizarlo en otras partes de tu aplicación
module.exports = ServicioEstampado;

