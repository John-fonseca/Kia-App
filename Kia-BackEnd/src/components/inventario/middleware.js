const jwt = require("jsonwebtoken");
const ErrorResponse = require("../../utils/response");

// Middleware para validar campos del inventario
exports.validateInventario = (req, res, next) => {
  const { desde, hasta, estado, marca } = req.body;

  if (!desde || !hasta || !estado || !marca) {
    return next(new ErrorResponse("Faltan campos requeridos", 400));
  }

  next();
};
