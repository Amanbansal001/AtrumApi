'use strict';

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('user_follows', {

    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    artistId: { type: DataTypes.INTEGER },
    userId: { type: DataTypes.INTEGER },
    createdAt: { type: DataTypes.DATE, default: Date.now },
    updatedAt: { type: DataTypes.DATE, default: Date.now },

  });

  return User;
};
