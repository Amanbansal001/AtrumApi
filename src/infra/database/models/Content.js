'use strict';

module.exports = function (sequelize, DataTypes) {
  const Content = sequelize.define('content_masters', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    type: { type: DataTypes.STRING },
    typeName: { type: DataTypes.STRING },
    content: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE, default: Date.now },
    updatedAt: { type: DataTypes.DATE, default: Date.now },
  });

  return Content;
};
