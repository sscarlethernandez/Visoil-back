const mongoose = require('mongoose');

// Define el esquema para la entidad servicioCorteSchema
const servicioCorteSchema = new mongoose.Schema({
  id: { type: String, default: mongoose.Types.ObjectId },
  piezaCorte: String,
  tela: String,
  cantidad: Number,
  descripcion: String,
  imagen: String,
  tipo: String
});

// Crea un modelo a partir del esquema
const ServicioCorte = mongoose.model('ServicioCorte', servicioCorteSchema);

// Exporta el modelo para poder utilizarlo en otras partes de tu aplicación
module.exports = ServicioCorte;

