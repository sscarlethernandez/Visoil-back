const Producto = require('../models/Producto'); 
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/public'); // Directorio donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Usa el nombre original del archivo
  }
});

const upload = multer({ storage: storage });

exports.registrarProducto = (req, res) => {
  upload.single('imagen')(req, res, async function (err) {
    try {
      if (err) {
        // Maneja el error de carga de imagen aquí
        return res.status(400).json({ mensaje: 'Error al cargar la imagen' });
      }

      const { codigo, nombre, descripcion, precio, categoria, referencia, tela, talla, medida, disenio } = req.body;
      const imagen = req.file ? req.file.filename : null; // Nombre del archivo de imagen subido, o null si no se proporciona

      
      // Crea un nuevo producto en la base de datos
      const producto = new Producto({
        codigo,
        nombre,
        descripcion,
        precio,
        categoria,
        referencia,
        imagen,
        tela,
        talla,
        medida,
        disenio
      });

      console.log(producto); 

      await producto.save();

      res.json({ mensaje: 'Producto creado exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al crear el producto' });
    }
  });
};




// Controlador para consultar todos los productos
exports.consultarProductosAdmin = async (req, res) => {
  try {
    // Utiliza el modelo Producto para buscar todos los productos en la base de datos
    const productos = await Producto.find();

    // Responde con la lista de productos en formato JSON
    res.status(200).json(productos);
  } catch (error) {
    console.error('Error al consultar los productos:', error);
    // Responde con un mensaje de error
    res.status(500).json({ error: 'Error al consultar los productos' });
  }
};

// Controlador para actualizar un producto
exports.actualizarProducto = async (req, res) => {
  const codigoProducto = req.params.codigo; // El código del producto a actualizar

  try {
    const productoActualizado = await Producto.findOneAndUpdate(
      { codigo: codigoProducto },
      {
        $set: req.body, // Utiliza el cuerpo de la solicitud para actualizar los campos
      },
      { new: true }
    );

    if (!productoActualizado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.status(200).json(productoActualizado);
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};


// Controlador para eliminar un producto
exports.eliminarProducto = async (req, res) => {
  const codigoProducto = req.params.codigo; // El código del producto a eliminar

  try {
    const productoEliminado = await Producto.findOneAndDelete({ codigo: codigoProducto });

    if (!productoEliminado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.status(200).json({ mensaje: 'Producto eliminado correctamente', producto: productoEliminado });
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};


exports.filtrarPorPrecio = async (req, res) => {
  try {
    const minPrecio = req.query.minPrecio;
    const maxPrecio = req.query.maxPrecio;

    if (!minPrecio || !maxPrecio) {
      return res.status(400).json({ message: 'Debes proporcionar tanto minPrecio como maxPrecio en la URL' });
    }

    const productos = await Producto.find({
      precio: {
        $gte: parseFloat(minPrecio),
        $lte: parseFloat(maxPrecio),
      },
    });

    return res.json(productos);
  } catch (error) {
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

exports.filtrarPorCodigo = async (req, res) => {
  try {
    const codigo = req.query.codigo;

    if (!codigo) {
      return res.status(400).json({ message: 'Debes proporcionar un código en la URL' });
    }

    const producto = await Producto.findOne({ codigo });

    return res.json(producto);
  } catch (error) {
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};


exports.filtrarPorNombre = async (req, res) => {
  try {
    const nombre = req.query.nombre;

    if (!nombre) {
      return res.status(400).json({ message: 'Debes proporcionar un nombre en la URL' });
    }

    const productos = await Producto.find({ nombre });

    return res.json(productos);
  } catch (error) {
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

exports.filtrarPorCategoria = async (req, res) => {
  try {
    const categoria = req.query.categoria;

    if (!categoria) {
      return res.status(400).json({ message: 'Debes proporcionar una categoría en la URL' });
    }

    const productos = await Producto.find({ categoria });

    return res.json(productos);
  } catch (error) {
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

exports.filtrarPorReferencia = async (req, res) => {
  try {
    const referencia = req.query.referencia;

    if (!referencia) {
      return res.status(400).json({ message: 'Debes proporcionar una referencia en la URL' });
    }

    const productos = await Producto.find({ referencia });

    return res.json(productos);
  } catch (error) {
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

