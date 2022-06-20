'use strict';

module.exports = function (sequelize, DataTypes) {
  const Analytic = sequelize.define('analytics', {
    id: { type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true },
    userId: { type: DataTypes.INTEGER },
    productId: { type: DataTypes.INTEGER },
    createdAt: { type: DataTypes.DATE, default: Date.now },
    updatedAt: { type: DataTypes.DATE, default: Date.now },

  });

  return Analytic;
};
