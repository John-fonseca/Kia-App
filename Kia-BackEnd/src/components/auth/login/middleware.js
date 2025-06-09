const { check, validationResult } = require("express-validator");

const validateLogin = [
  check("email")
    .isEmail()
    .withMessage("Debe ser un email válido")
    .not()
    .isEmpty()
    .withMessage("El email es requerido"),

  check("password")
    .not()
    .isEmpty()
    .withMessage("La contraseña es requerida")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateLogin,
};
