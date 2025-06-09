const { check } = require('express-validator');

exports.validarVehiculo = [
  check('marca', 'La marca es obligatoria').not().isEmpty(),
  check('modelo', 'El modelo es obligatorio').not().isEmpty(),
  check('chasis', 'El número de chasis es obligatorio').not().isEmpty(),
  check('motor', 'El número de motor es obligatorio').not().isEmpty(),
  check('color', 'El color es obligatorio').not().isEmpty(),
  check('fechaIngreso', 'La fecha de ingreso es obligatoria').not().isEmpty(),
];