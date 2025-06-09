const Inventario = require("../../../databases/models/inventory");

exports.generarInventario = async (req, res, next) => {
  try {
    const { desde, hasta, estado, marca, origen } = req.body;

    // Validación de fechas
    if (new Date(desde) > new Date(hasta)) {
      return res.status(400).json({
        success: false,
        message: "La fecha de inicio no puede ser mayor a la fecha fin",
      });
    }

    // Crear nuevo registro de inventario
    const nuevoInventario = new Inventario({
      desde,
      hasta,
      estado,
      marca,
      origen,
    });

    await nuevoInventario.save();

    // Aquí podrías agregar lógica para generar el reporte real
    // Por ahora solo devolvemos el objeto creado
    res.status(201).json({
      success: true,
      data: nuevoInventario,
      message: "Solicitud de inventario creada correctamente",
    });
  } catch (error) {
    next(error);
  }
};

exports.obtenerInventarios = async (req, res, next) => {
  try {
    const inventarios = await Inventario.find({
      estado: req.body.estado,
    }).sort({ fechaCreacion: -1 });

    res.json({
      success: true,
      count: inventarios.length,
      data: inventarios,
    });
  } catch (error) {
    next(error);
  }
};
