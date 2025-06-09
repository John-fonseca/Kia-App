const mongoose = require("mongoose");

const vehiculoSchema = new mongoose.Schema({
  marca: {
    type: String,
    required: true,
    trim: true,
  },
  modelo: {
    type: String,
    required: true,
    trim: true,
  },
  chasis: {
    type: String,
    required: true,
    unique: true, // ✅ Esto ya crea el índice único
    trim: true,
    uppercase: true,
  },
  motor: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  color: {
    type: String,
    required: true,
    trim: true,
  },
  fechaIngreso: {
    type: Date,
    required: true,
  },
  llaves: {
    type: [Boolean],
    default: [false, false],
    required: true,
  },
  exploradoras: {
    type: Boolean,
    default: false,
  },
  estado: {
    type: String,
    enum: ["activo", "inactivo", "mantenimiento"],
    default: "activo",
  },
  origen: { type: String },
  // Cabina
  descansacabezas: Boolean,
  aireAcondicionado: Boolean,
  radio: Boolean,
  parlantes: Boolean,
  cubreEquipo: Boolean,
  manualUsuario: Boolean,
  manualGarantia: Boolean,
  manualRadio: Boolean,
  limpiezaInterior: Boolean,
  kilometrajeMaximo: Number,
  kilometrajeActual: Number,
  // Motor y cabina
  funcionamientoEquipos: Boolean,
  piezasMotorCompletas: Boolean,
  limpiezaMotor: Boolean,
  funcionamientoMotor: Boolean,
  gato: Boolean,
  herramientas: Boolean,
  llantaRepuesto: Boolean,
  combustible: Boolean,
  redPortaequipaje: Boolean,
  espejoRetrovisor: Boolean,
  llanta: Boolean,
  setDespinche: Boolean,
  setOrganizaHerramienta: Boolean,
  autonomiaCombustible: String,
  observaciones: String,
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now,
  },
});

vehiculoSchema.pre("save", function (next) {
  this.fechaActualizacion = Date.now();
  next();
});

module.exports = mongoose.model("Vehiculo", vehiculoSchema);

