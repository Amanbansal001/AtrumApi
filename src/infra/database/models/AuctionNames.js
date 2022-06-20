'use strict';

module.exports = function (sequelize, DataTypes) {
  const AuctionNames = sequelize.define('auction_names', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING },
    status: { type: DataTypes.INTEGER },
    startDate: { type: DataTypes.DATE },
    expiryDate: { type: DataTypes.DATE },
    createdAt: { type: DataTypes.DATE, default: Date.now },
    updatedAt: { type: DataTypes.DATE, default: Date.now },
  });

  AuctionNames.associate = function (models) {
    AuctionNames.hasMany(models.Auction, { sourceKey: 'id', foreignKey: 'auctionNameId', as: 'auction' });
  }

  return AuctionNames;
};
