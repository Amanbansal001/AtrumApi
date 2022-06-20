'use strict';

module.exports = function (sequelize, DataTypes) {
  const OrderPaymentMethod = sequelize.define('order_payment_methods', {
    id: { type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true },
    userId: { type: DataTypes.INTEGER },
    isDefault: { type: DataTypes.INTEGER },
    cardType: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    cardNumber: { type: DataTypes.STRING },
    expiryDate: { type: DataTypes.STRING },
    cvv: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE, default: Date.now },
    updatedAt: { type: DataTypes.DATE, default: Date.now },

  });

  return OrderPaymentMethod;
};
