require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./network/auth.network");
const loginRoutes = require("./network/auth.network");
const vehiculo = require("./src/components/vehiculo/network");
const inventario = require("./src/components/inventario/network");

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error de conexión a MongoDB:", err));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/auth", loginRoutes);
app.use("/api/vehiculo", vehiculo);
app.use("/api/inventarios", inventario)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
