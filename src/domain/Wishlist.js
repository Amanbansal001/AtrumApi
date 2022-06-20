const { attributes } = require('structure');

const Wishlist = attributes({

  id: { type: Number },
  roleType: { type: String },
  name: { type: String },
  country: { type: String },
  bio: { type: String },
  email: { type: String },
  password: { type: String },
  profilePic: { type: String },
  countryCode: { type: String },
  phone: { type: String },
  createdAt: { type: DataTypes.DATE, default: Date.now },
  updatedAt: { type: DataTypes.DATE, default: Date.now },

})(class Wishlist {

});

module.exports = Wishlist;
