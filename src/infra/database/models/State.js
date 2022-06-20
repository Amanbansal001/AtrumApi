'use strict';

module.exports = function (sequelize, DataTypes) {
  const State = sequelize.define('states', {
    id: { type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true },
    name : { type: DataTypes.STRING },
    country_id: { type: DataTypes.INTEGER },
    createdAt: { type: DataTypes.DATE, default: Date.now },
    updatedAt: { type: DataTypes.DATE, default: Date.now },

  });

  State.associate = function (models) {
    State.belongsTo(models.Country, {foreignKey: 'country_id', targetKey: 'id', as: 'country' });
  }

  return State;
};
