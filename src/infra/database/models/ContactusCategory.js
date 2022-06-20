'use strict';

module.exports = function (sequelize, DataTypes) {
  const ContactusCategory = sequelize.define('contact_us_categorys', {

    id: { type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true },
    categoryName: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE, default: Date.now },
    updatedAt: { type: DataTypes.DATE, default: Date.now },
  });

  return ContactusCategory;
};
