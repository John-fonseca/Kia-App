const VehiculoStore = require('./store');
class VehiculoController {
  static async obtenerPorChasis(req, res) {
    try {
      const { chasis } = req.params;
      const vehiculo = await VehiculoStore.findByChasis(chasis);
      
      if (!vehiculo) {
        return res.status(404).json({ 
          success: false,
          message: 'Vehículo no encontrado' 
        });
      }
      
      res.json({ success: true, data: vehiculo });
    } catch (error) {
      console.error('Error al buscar vehículo:', error);
      res.status(500).json({
        success: false,
        message: 'Error al buscar vehículo',
        error: error.message
      });
    }
  }

  static async crearVehiculo(req, res) {
    try {
      const datosVehiculo = req.body;

      // Validar chasis único
      if (await VehiculoStore.chasisExists(datosVehiculo.chasis)) {
        return res.status(400).json({
          success: false,
          message: 'El número de chasis ya existe'
        });
      }

      const nuevoVehiculo = await VehiculoStore.create(datosVehiculo);
      res.status(201).json({
        success: true,
        message: 'Vehículo registrado exitosamente',
        data: nuevoVehiculo
      });
    } catch (error) {
      console.error('Error al registrar vehículo:', error);
      res.status(500).json({
        success: false,
        message: 'Error al registrar vehículo',
        error: error.message
      });
    }
  }

  static async actualizarVehiculo(req, res) {
    try {
      const { id } = req.params;
      const datosActualizacion = req.body;

      // Validar chasis único (si se está actualizando)
      if (datosActualizacion.chasis) {
        if (await VehiculoStore.chasisExists(datosActualizacion.chasis, id)) {
          return res.status(400).json({
            success: false,
            message: 'El nuevo número de chasis ya existe'
          });
        }
      }

      const vehiculoActualizado = await VehiculoStore.update(id, datosActualizacion);
      
      if (!vehiculoActualizado) {
        return res.status(404).json({
          success: false,
          message: 'Vehículo no encontrado'
        });
      }
      
      res.json({
        success: true,
        message: 'Vehículo actualizado exitosamente',
        data: vehiculoActualizado
      });
    } catch (error) {
      console.error('Error al actualizar vehículo:', error);
      res.status(500).json({
        success: false,
        message: 'Error al actualizar vehículo',
        error: error.message
      });
    }
  }
}

module.exports = VehiculoController;