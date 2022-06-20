'use strict';

module.exports = function (sequelize, DataTypes) {
  const Enquiry = sequelize.define('enquiry_masters', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    messageId: { type: DataTypes.INTEGER },
    productId: { type: DataTypes.INTEGER },
    userId: { type: DataTypes.INTEGER },
    message: { type: DataTypes.STRING },
    byUserId: { type: DataTypes.INTEGER },
    createdAt: { type: DataTypes.DATE, default: Date.now },
    updatedAt: { type: DataTypes.DATE, default: Date.now },
  });

  Enquiry.associate = function (models) {
    Enquiry.belongsTo(models.Product, { foreignKey: 'productId', targetKey: 'id', as: 'product' });
    Enquiry.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'user' });
  }

  return Enquiry;
};
