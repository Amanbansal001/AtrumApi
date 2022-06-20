'use strict';

module.exports = function (sequelize, DataTypes) {
  const ContactUs = sequelize.define('contact_us', {
    id: { type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true },
    userId: { type: DataTypes.INTEGER },
    from: { type: DataTypes.STRING },
    category: { type: DataTypes.STRING },
    message: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE, default: Date.now },
    updatedAt: { type: DataTypes.DATE, default: Date.now },

  });

  return ContactUs;
};
