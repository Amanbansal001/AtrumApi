'use strict';

module.exports = function (sequelize, DataTypes) {
  const MediaMasters = sequelize.define('media_masters', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    destination: { type: DataTypes.STRING },
    encoding: { type: DataTypes.STRING },
    fieldname: { type: DataTypes.STRING },
    filename: { type: DataTypes.STRING },
    mimetype: { type: DataTypes.STRING },
    originalname: { type: DataTypes.STRING },
    path: { type: DataTypes.STRING },
    size: { type: DataTypes.STRING },
    height: { type: DataTypes.STRING },
    width: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE, default: Date.now },
    updatedAt: { type: DataTypes.DATE, default: Date.now },

  });

  return MediaMasters;
};
