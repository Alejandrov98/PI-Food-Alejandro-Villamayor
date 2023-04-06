const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resumen: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    nivelSalud: {
      type: DataTypes.FLOAT
    },
    imagen: {
      type: DataTypes.STRING
    },
    pasos: {
      type: DataTypes.TEXT
    },
    creadoDB: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {timestamps: false});
};

