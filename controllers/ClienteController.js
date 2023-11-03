const bcrypt = require('bcrypt');
const Cliente = require('../models/Cliente'); // Importa el modelo de Cliente

// Controlador para registrar un nuevo cliente
exports.registrarCliente = async (req, res) => {
    try {
        // Extrae los datos del cliente del cuerpo de la solicitud
        const {
            cedula,
            tipoDocumento,
            nombre,
            apellido,
            genero,
            fechaNacimiento,
            correo,
            telefono,
            direccion,
            estadoCliente,
            fotoPerfil,
            ciudad,
            barrio,
            pass
        } = req.body;

        const hashContraseña = await bcrypt.hash(pass, 10);

        // Crea una instancia del modelo Cliente con los datos recibidos
        const nuevoCliente = new Cliente({
            cedula,
            tipoDocumento,
            nombre,
            apellido,
            genero,
            fechaNacimiento,
            correo,
            telefono,
            direccion,
            estadoCliente,
            fotoPerfil,
            ciudad,
            barrio,
            pass: hashContraseña
        });

        // Guarda el nuevo cliente en la base de datos
        await nuevoCliente.save();

        res.status(201).json({ mensaje: 'Cliente registrado con éxito' });
    } catch (error) {
        console.error('Error al registrar el cliente:', error);
        res.status(500).json({ error: 'Error al registrar el cliente' });
    }
};

// Controlador para consultar TODOS los clientes 
exports.consultarClientes = async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los clientes' });
    }
};

// Controlador para obtener un cliente por su ID
exports.consultarClientePorID = async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id);
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.status(200).json(cliente);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el cliente' });
    }
};

// Controlador para actualizar un cliente por su CEDULA
exports.actualizarCliente = async (req, res) => {
    const cedulaCliente = req.params.cedula; // La cedula del cliente a actualizar

    try {
        const clienteActualizado = await Cliente.findOneAndUpdate(
            { cedula: cedulaCliente },
            {
                $set: req.body, // Utiliza el cuerpo de la solicitud para actualizar los campos
            },
            { new: true }
        );

        if (!clienteActualizado) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        res.status(200).json(clienteActualizado);
    } catch (error) {
        console.error('Error al actualizar el cliente:', error);
        res.status(500).json({ error: 'Error al actualizar el cliente' });
    }
};

// Controlador para eliminar un cliente
exports.eliminarCliente = async (req, res) => {
    const cedulaCliente = req.params.cedula; // La cedula del cliente a eliminar
  
    try {
      const clienteEliminado = await Cliente.findOneAndDelete({ cedula: cedulaCliente });
  
      if (!clienteEliminado) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }
  
      res.status(200).json({ mensaje: 'Cliente eliminado correctamente', cliente: clienteEliminado });
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);
      res.status(500).json({ error: 'Error al eliminar el cliente' });
    }
  };



