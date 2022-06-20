'use strict';

module.exports = function (sequelize, DataTypes) {
  const Nft = sequelize.define('nft_masters', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nftImage: { type: DataTypes.STRING },
    nftTitle: { type: DataTypes.STRING },
    nftUrl: { type: DataTypes.STRING },
    nftPrice: { type: DataTypes.STRING },
    nftDescription: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE, default: Date.now },
    updatedAt: { type: DataTypes.DATE, default: Date.now },

  });

  return Nft;
};
