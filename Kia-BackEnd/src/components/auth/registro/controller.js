const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserStore = require("../registro/store");
const { JWT_SECRET } = process.env;

class AuthController {
  static async register(req, res) {
    try {
      const { nombres, apellidos, email, password, rol } = req.body;

      const existingUser = await UserStore.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "El usuario ya existe" });
      }

      const user = await UserStore.createUser({
        nombres,
        apellidos,
        email,
        password,
        rol,
      });

      const token = jwt.sign({ id: user._id, rol: user.rol }, JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(201).json({ token, user });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error en el servidor", error: error.message });
    }
  }
}

module.exports = AuthController;
