const { attributes } = require('structure');

const UserFollow = attributes({

  id: { type: Number },
  artistId: { type: Number },
  userId: { type: Number },
  createdAt: { type: DataTypes.DATE, default: Date.now },
  updatedAt: { type: DataTypes.DATE, default: Date.now },

})(class UserFollow {

});

module.exports = UserFollow;
