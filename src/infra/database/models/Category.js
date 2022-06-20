'use strict';

module.exports = function (sequelize, DataTypes) {
  const Category = sequelize.define('categorys', {

    id: { type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true },
    categoryName: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE, default: Date.now },
    updatedAt: { type: DataTypes.DATE, default: Date.now },
  });

  return Category;
};
