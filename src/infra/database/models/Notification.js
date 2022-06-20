'use strict';

module.exports = function (sequelize, DataTypes) {
  const Notification = sequelize.define('notifications', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING },
    message: { type: DataTypes.STRING },
    orderId: { type: DataTypes.INTEGER },
    productId: { type: DataTypes.INTEGER },
    userId: { type: DataTypes.INTEGER },
    status: { type: DataTypes.INTEGER },
    createdAt: { type: DataTypes.DATE, default: Date.now },
    updatedAt: { type: DataTypes.DATE, default: Date.now },
  });

  Notification.associate = function (models) {
    Notification.belongsTo(models.Product, { foreignKey: 'productId', targetKey: 'id', as: 'product' });
    Notification.belongsTo(models.Order, { foreignKey: 'orderId', targetKey: 'id', as: 'order' });
    Notification.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'user' });
  }

  return Notification;
};
