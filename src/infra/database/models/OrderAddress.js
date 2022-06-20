'use strict';

module.exports = function (sequelize, DataTypes) {
  const OrderAddress = sequelize.define('order_addresses', {
    id: { type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true },
    userId: { type: DataTypes.INTEGER },
    isDefault: { type: DataTypes.INTEGER },
    shippingType: { type: DataTypes.STRING },
    isBillingSame: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING },
    addressLine1: { type: DataTypes.STRING },
    addressLine2: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    state: { type: DataTypes.STRING },
    country: { type: DataTypes.STRING },
    zipCode: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE, default: Date.now },
    updatedAt: { type: DataTypes.DATE, default: Date.now },

  });

  return OrderAddress;
};
