const { attributes } = require('structure');

const Category = attributes({

  id: { type: Number },
  categoryName: { type: String },
  createdAt: { type: DataTypes.DATE, default: Date.now },
  updatedAt: { type: DataTypes.DATE, default: Date.now },

})(class Category {

});

module.exports = Category;
