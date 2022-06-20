'use strict';

module.exports = function (sequelize, DataTypes) {
  const Auction = sequelize.define('auctions', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    auctionNameId: { type: DataTypes.INTEGER },
    productId: { type: DataTypes.INTEGER },
    status: { type: DataTypes.INTEGER },
    price:{ type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE, default: Date.now },
    updatedAt: { type: DataTypes.DATE, default: Date.now },
  });

  Auction.associate = function (models) {
    Auction.belongsTo(models.Product, {foreignKey: 'productId', targetKey: 'id', as: 'product' });
    Auction.belongsTo(models.AuctionNames, {foreignKey: 'auctionNameId', targetKey: 'id', as: 'auctionName' });
    Auction.hasMany(models.ProductBids, {sourceKey: 'id', foreignKey: 'auctionId', as: 'bids' });
  }

  return Auction;
};
