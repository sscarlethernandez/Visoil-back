const Cliente = require("../../models/Cliente");
const bcrypt = require('bcrypt');

// Asegúrate de importar correctamente tu modelo de Usuario
exports.iniciarSesion = async function (req, res) {
  const { correo, pass } = req.body;

  try {
    // Buscar el cliente por el correo proporcionado
    const cliente = await Cliente.findOne({ correo });
    
    // Verificar si el cliente existe
    if (!cliente) {
      return res.status(404).json({ success: false, message: 'Correo no encontrado' });
    }

    // Si el cliente existe, verificar la contraseña
    const passwordMatch = await bcrypt.compare(pass, cliente.pass);
    if (passwordMatch) {
      // Aquí podrías realizar acciones adicionales, como generar un token de autenticación, etc.
      // Devolver una respuesta con un código de éxito y los datos del cliente
      return res.status(200).json({ success: true, cliente });
    } else {
      return res.status(401).json({ success: false, message: 'Contraseña Incorrecta' });
    }
  } catch (error) {
    // Manejar errores en caso de que haya un problema con la base de datos u otros errores inesperados
    return res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
};
