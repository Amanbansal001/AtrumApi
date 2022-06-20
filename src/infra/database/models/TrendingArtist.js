'use strict';

module.exports = function (sequelize, DataTypes) {
  const TrendingArtist = sequelize.define('trending_artists', {
    id: { type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true },
    userId: { type: DataTypes.INTEGER },
    month: { type: DataTypes.INTEGER },
    createdAt: { type: DataTypes.DATE, default: Date.now },
    updatedAt: { type: DataTypes.DATE, default: Date.now },

  });

  TrendingArtist.associate = function (models) {
    TrendingArtist.belongsTo(models.User, {foreignKey: 'userId', targetKey: 'id', as: 'user' });
  }


  return TrendingArtist;
};
