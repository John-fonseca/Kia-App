const express = require("express");
const router = express.Router();
const VehiculoController = require("../vehiculo/controller");
const { check } = require("express-validator");
const { validarVehiculo } = require("../vehiculo/middleware");

// Obtener vehículo por chasis (autocompletado)
router.get(
  "/chasis/:chasis",
  [
    check("chasis", "El número de chasis es obligatorio").not().isEmpty(),
    validarVehiculo,
  ],
  VehiculoController.obtenerPorChasis
);

// Crear nuevo vehículo
router.post(
  "/",
  [
    check("marca", "La marca es obligatoria").not().isEmpty(),
    check("modelo", "El modelo es obligatorio").not().isEmpty(),
    check("chasis", "El número de chasis es obligatorio").not().isEmpty(),
    check("motor", "El número de motor es obligatorio").not().isEmpty(),
    check("color", "El color es obligatorio").not().isEmpty(),
    check("fechaIngreso", "La fecha de ingreso es obligatoria").not().isEmpty(),
    validarVehiculo,
  ],
  VehiculoController.crearVehiculo
);

// Actualizar vehículo
router.put(
  "/:id",
  [check("id", "El ID no es válido").isMongoId(), validarVehiculo],
  VehiculoController.actualizarVehiculo
);

module.exports = router;
