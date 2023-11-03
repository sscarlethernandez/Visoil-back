const express = require('express');
const router = express.Router();
const ServicioCorteVinillo = require('../../models/Servicio/CorteVinillo');

// Otras importaciones y configuraciones necesarias

// Define el método para registrar un servicio de corte de vinilo
exports.registrarServicioCorteVinillo = async (req, res) => {
  try {
    const {
      imagen,
      color,
      nombre,
      descripcion,
      texto,
      tamanio,
      tipo
    } = req.body;

    // Crear un nuevo servicio de corte de vinilo
    const nuevoServicioCorteVinillo = new ServicioCorteVinillo({
      imagen,
      color,
      nombre,
      descripcion,
      texto,
      tamanio,
      tipo
    });

    // Guardar el servicio en la base de datos
    const servicioGuardado = await nuevoServicioCorteVinillo.save();

    res.json(servicioGuardado);
  } catch (error) {
    console.error('Error al registrar el servicio de corte de vinilo:', error);
    res.status(500).send('Error interno del servidor');
  }
};

