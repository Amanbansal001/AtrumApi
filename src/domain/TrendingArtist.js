const { attributes } = require('structure');

const TrendingArtist = attributes({
  
  id: { type: Number },
  userId: { type: Number },
  month: { type: Number },
  createdAt: { type: DataTypes.DATE, default: Date.now },
  updatedAt: { type: DataTypes.DATE, default: Date.now },

})(class TrendingArtist {

});

module.exports = TrendingArtist;
