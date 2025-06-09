const { check, validationResult } = require('express-validator');

const validateRegister = [
  check('nombres').not().isEmpty().withMessage('Los nombres son requeridos'),
  check('apellidos').not().isEmpty().withMessage('Los apellidos son requeridos'),
  check('email').isEmail().withMessage('Email no válido'),
  check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  check('rol').isIn(['Administrador', 'Operador', 'Movilizador']).withMessage('Rol no válido'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  validateRegister
};