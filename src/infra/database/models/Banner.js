'use strict';

module.exports = function (sequelize, DataTypes) {
  const Banner = sequelize.define('banners', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    text: { type: DataTypes.STRING },
    heading: { type: DataTypes.STRING },
    url: { type: DataTypes.STRING },
    type: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE, default: Date.now },
    updatedAt: { type: DataTypes.DATE, default: Date.now },
  });

  return Banner;
};
