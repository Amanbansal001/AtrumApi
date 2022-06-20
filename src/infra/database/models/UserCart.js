'use strict';

module.exports = function (sequelize, DataTypes) {
  const UserCart = sequelize.define('user_carts', {
    id: { type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true },
    orderId: { type: DataTypes.INTEGER },
    cartId: { type: DataTypes.STRING },
    userId: { type: DataTypes.INTEGER },
    bidId: { type: DataTypes.INTEGER },
    productId: { type: DataTypes.INTEGER },
    isDeleted: { type: DataTypes.INTEGER },
    qty: { type: DataTypes.INTEGER },
    price: { type: DataTypes.STRING },
    vat: { type: DataTypes.STRING },
    shippingAmount: { type: DataTypes.STRING },
    orderStatus: { type: DataTypes.STRING },
    deliveryDate: { type: DataTypes.DATE},
    pickUpDate: { type: DataTypes.DATE},
    estimatedPickupDate: { type: DataTypes.DATE},
    estimatedDeliveryDate: { type: DataTypes.DATE},
    url: { type: DataTypes.STRING},
    dhlUrl: { type: DataTypes.STRING},
    artistPayment:{ type: DataTypes.STRING },
    comission: { type: DataTypes.INTEGER },
    createdAt: { type: DataTypes.DATE, default: Date.now },
    updatedAt: { type: DataTypes.DATE, default: Date.now },

  });

  UserCart.associate = function (models) {
    UserCart.belongsTo(models.Product, {foreignKey: 'productId', targetKey: 'id', as: 'arts' });
    UserCart.belongsTo(models.User, {foreignKey: 'userId', targetKey: 'id', as: 'user' });
    UserCart.belongsTo(models.Order, {foreignKey: 'orderId', targetKey: 'id', as: 'order' });
    UserCart.belongsTo(models.ProductBids, {foreignKey: 'bidId', targetKey: 'id', as: 'bid' });
  }

  return UserCart;
};
