const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const LoginStore = require("../login/store");
const { JWT_SECRET } = process.env;

class LoginController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // 1. Buscar usuario por email
      const user = await LoginStore.findByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Credenciales inválidas" });
      }

      // 2. Verificar contraseña
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Credenciales inválidas" });
      }

      // 3. Actualizar último login
      await LoginStore.updateLoginData(user._id, new Date());

      // 4. Crear token JWT
      const token = jwt.sign(
        {
          id: user._id,
          rol: user.rol,
          nombres: user.nombres,
          apellidos: user.apellidos,
        },
        JWT_SECRET,
        { expiresIn: "8h" }
      );

      // 5. Responder con token y datos básicos del usuario
      res.json({
        token,
        user: {
          id: user._id,
          nombres: user.nombres,
          apellidos: user.apellidos,
          email: user.email,
          rol: user.rol,
        },
      });
    } catch (error) {
      console.error("Error en login:", error);
      res
        .status(500)
        .json({ message: "Error en el servidor", error: error.message });
    }
  }
}

module.exports = LoginController;
