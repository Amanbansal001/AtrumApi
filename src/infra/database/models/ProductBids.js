'use strict';

module.exports = function (sequelize, DataTypes) {
  const ProductBids = sequelize.define('product_bids', {
    id: { type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true },
    userId: { type: DataTypes.INTEGER },
    auctionId: { type: DataTypes.INTEGER },
    bidPrice: { type: DataTypes.STRING },
    productId: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING },
    country: { type: DataTypes.STRING },
    addressLine1: { type: DataTypes.STRING },
    addressLine2: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    state: { type: DataTypes.STRING },
    zipCode: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    bidStatus: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE, default: Date.now },
    updatedAt: { type: DataTypes.DATE, default: Date.now },

  });

  ProductBids.associate = function (models) {
    ProductBids.belongsTo(models.Product, {foreignKey: 'productId', targetKey: 'id', as: 'arts' });
    ProductBids.belongsTo(models.User, {foreignKey: 'userId', targetKey: 'id', as: 'user' });
    ProductBids.belongsTo(models.Auction, {foreignKey: 'auctionId', targetKey: 'id', as: 'auction' });
  }

  return ProductBids;
};
