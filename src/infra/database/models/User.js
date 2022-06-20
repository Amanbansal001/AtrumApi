'use strict';

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('users', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    roleType: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    country: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    state: { type: DataTypes.STRING },
    zipCode: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    bio: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    profilePic: { type: DataTypes.STRING },
    countryCode: { type: DataTypes.STRING },
    nationality: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    comission: { type: DataTypes.STRING },
    signature: { type: DataTypes.STRING },
    isWonderRoom: { type: DataTypes.INTEGER },
    status: { type: DataTypes.INTEGER },
    createdAt: { type: DataTypes.DATE, default: Date.now },
    updatedAt: { type: DataTypes.DATE, default: Date.now },

  });

  User.associate = function (models) {
    User.belongsTo(models.UserFollow, { foreignKey: 'id', targetKey: 'artistId', as: 'follow' });
  }

  return User;
};
