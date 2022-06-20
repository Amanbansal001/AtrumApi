'use strict';

module.exports = function (sequelize, DataTypes) {
  const Product = sequelize.define('products', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    inStock: { type: DataTypes.INTEGER },
    userId: { type: DataTypes.INTEGER },
    categoryId: { type: DataTypes.INTEGER },
    publishYear: { type: DataTypes.STRING },
    productName: { type: DataTypes.STRING },
    productDescription: { type: DataTypes.STRING },
    productImage: { type: DataTypes.STRING },
    price: { type: DataTypes.STRING },
    shippingInfo: { type: DataTypes.STRING },
    collection: { type: DataTypes.STRING },
    medium: { type: DataTypes.STRING },
    signature: { type: DataTypes.STRING },
    certificateAuth: { type: DataTypes.STRING },
    frame: { type: DataTypes.STRING },
    length: { type: DataTypes.STRING },
    geoMap: { type: DataTypes.STRING },
    breadth: { type: DataTypes.STRING },
    height: { type: DataTypes.STRING },
    weight: { type: DataTypes.STRING },
    logistics: { type: DataTypes.STRING },

    productCity: { type: DataTypes.STRING },
    orientation: { type: DataTypes.STRING },
    material: { type: DataTypes.STRING },
    showPrice: { type: DataTypes.STRING },
    edition: { type: DataTypes.STRING },
    isStock: { type: DataTypes.INTEGER },
    gallery: { type: DataTypes.INTEGER },
    isWonderRoom: { type: DataTypes.INTEGER },
    isViewRoom: { type: DataTypes.INTEGER },
    active: { type: DataTypes.INTEGER },
    dateOfProduction : { type: DataTypes.DATE, default: Date.now },
    createdAt: { type: DataTypes.DATE, default: Date.now },
    updatedAt: { type: DataTypes.DATE, default: Date.now },

  });

  Product.associate = function (models) {
    Product.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'user' });
    Product.belongsTo(models.TrendingArtwork, { foreignKey: 'id', targetKey: 'productId', as: 'trending' });
    Product.belongsTo(models.UserFollow, { foreignKey: 'userId', targetKey: 'artistId', as: 'follow' });
    Product.belongsTo(models.Wishlist, { foreignKey: 'id', targetKey: 'productId', as: 'wishlist' });
    Product.belongsTo(models.Category, { foreignKey: 'categoryId', targetKey: 'id', as: 'category' });
    Product.belongsTo(models.Auction, { foreignKey: 'id', targetKey: 'productId', as: 'auction' });
    Product.belongsTo(models.MediaMasters, { foreignKey: 'productImage', targetKey: 'filename', as: 'media' });
  }

  return Product;
};
