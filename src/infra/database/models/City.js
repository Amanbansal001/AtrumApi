'use strict';

module.exports = function (sequelize, DataTypes) {
  const City = sequelize.define('cities', {
    id: { type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true },
    name : { type: DataTypes.STRING },
    state_id: { type: DataTypes.INTEGER },
    createdAt: { type: DataTypes.DATE, default: Date.now },
    updatedAt: { type: DataTypes.DATE, default: Date.now },

  });

  City.associate = function (models) {
    City.belongsTo(models.State, {foreignKey: 'state_id', targetKey: 'id', as: 'state' });
  }

  return City;
};
