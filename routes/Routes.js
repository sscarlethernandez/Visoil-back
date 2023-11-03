const express = require('express');
const productoController = require('../controllers/ProductoController');
const clienteController = require('../controllers/ClienteController');
const clienteAuthController = require('../controllers/Auth/ClienteAuthController');
const servicioCorteVinilloController = require('../controllers/servicioController/CorteVinilloController');

const Router = express.Router();

//Rutas de producto
Router.post('/registrarproducto',productoController.registrarProducto);
Router.get('/productos',productoController.consultarProductosAdmin);
Router.put('/productos/:codigo', productoController.actualizarProducto);
Router.delete('/productos/:codigo', productoController.eliminarProducto);
Router.get('/productosfiltradoporprecio', productoController.filtrarPorPrecio);


//Rutas Cliente
Router.post('/registrarcliente', clienteController.registrarCliente);
Router.get('/clientes', clienteController.consultarClientes);
Router.put('/clientes/:cedula', clienteController.actualizarCliente);
Router.delete('/clientes/:cedula',clienteController.eliminarCliente);

//Rutas Servicio
//Rutas ServicioCorteVinillo
Router.post('/servicio/cortevinillo',servicioCorteVinilloController.registrarServicioCorteVinillo);


//Ruta Inicio Sesion
Router.post('/inicioSesionCliente', clienteAuthController.iniciarSesion);

module.exports = Router;