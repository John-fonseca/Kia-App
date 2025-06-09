const express = require("express");
const router = express.Router();
const { validateInventario } = require("../inventario/middleware");
const {
  generarInventario,
  obtenerInventarios,
} = require("../inventario/controller");

router
  .route("/")
  .post(validateInventario, generarInventario)
  .get(obtenerInventarios);

module.exports = router;
