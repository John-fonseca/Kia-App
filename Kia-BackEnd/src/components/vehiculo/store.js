const Vehiculo = require("../../../databases/models/vehicle-model");

class VehiculoStore {
  static async findByChasis(chasis) {
    return await Vehiculo.findOne({ chasis })
      .select("-creadoPor -fechaCreacion -fechaActualizacion")
      .lean();
  }

  static async create(data) {
    const vehiculo = new Vehiculo(data);
    return await vehiculo.save();
  }

  static async update(id, updates) {
    return await Vehiculo.findByIdAndUpdate(
      id,
      { ...updates, fechaActualizacion: Date.now() },
      { new: true, runValidators: true }
    );
  }

  static async chasisExists(chasis, excludeId = null) {
    const query = { chasis };
    if (excludeId) {
      query._id = { $ne: excludeId };
    }
    const count = await Vehiculo.countDocuments(query);
    return count > 0;
  }
}

module.exports = VehiculoStore;
