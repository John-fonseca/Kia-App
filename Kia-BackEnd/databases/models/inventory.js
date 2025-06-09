const mongoose = require('mongoose');

const inventarioSchema = new mongoose.Schema({
  desde: { type: Date, required: true },
  hasta: { type: Date, required: true },
  estado: { type: String, required: true, enum: ['activo', 'inactivo', 'mantenimiento'] },
  marca: { type: String, required: true },
  origen: { type: String },
  fechaCreacion: { type: Date, default: Date.now },
}, { collection: "inventario", versionKey: false });

module.exports = mongoose.model('Inventario', inventarioSchema);