'use strict';

module.exports = function (sequelize, DataTypes) {
  const Country = sequelize.define('countries', {
    id: { type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true },
    name : { type: DataTypes.STRING },
    vat: { type: DataTypes.STRING },
    iso2: { type: DataTypes.STRING },
    currency: { type: DataTypes.STRING },
    currency_symbol: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE, default: Date.now },
    updatedAt: { type: DataTypes.DATE, default: Date.now },

  });

  return Country;
};
