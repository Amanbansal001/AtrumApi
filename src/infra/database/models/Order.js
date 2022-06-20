'use strict';

module.exports = function (sequelize, DataTypes) {
  const Order = sequelize.define('orders', {

    id: { type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true },
    orderId: { type: DataTypes.STRING },
    txnId: { type: DataTypes.STRING },
    trackingId: { type: DataTypes.STRING },
    cartId: { type: DataTypes.STRING },
    userId: { type: DataTypes.INTEGER },
    couponId: { type: DataTypes.INTEGER },
    billAddressId: { type: DataTypes.INTEGER },
    shipAddressId: { type: DataTypes.INTEGER },
    paymentMethodId: { type: DataTypes.INTEGER },
    total: { type: DataTypes.STRING },
    grandTotal: { type: DataTypes.STRING },
    discountPrice: { type: DataTypes.STRING },
    orderStatus: { type: DataTypes.STRING },
    paymentType: { type: DataTypes.STRING },
    vat: { type: DataTypes.STRING },
    orderType: { type: DataTypes.STRING },
    totalShippingAmount: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE, default: Date.now },
    updatedAt: { type: DataTypes.DATE, default: Date.now },
  });

  Order.associate = function (models) {
    Order.belongsTo(models.User, {foreignKey: 'userId', targetKey: 'id', as: 'user' });
    Order.belongsTo(models.OrderAddress, {foreignKey: 'billAddressId', targetKey: 'id', as: 'bill' });
    Order.belongsTo(models.OrderAddress, {foreignKey: 'shipAddressId', targetKey: 'id', as: 'ship' });
  }

  return Order;
};
