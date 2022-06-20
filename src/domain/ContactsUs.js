const { attributes } = require('structure');

const ContactsUs = attributes({

  id: { type: Number },
  ContactsUsId: { type: Number },
  from: { type: String },
  category: { type: String },
  message: { type: String },
  createdAt: { type: DataTypes.DATE, default: Date.now },
  updatedAt: { type: DataTypes.DATE, default: Date.now },

})(class ContactsUs {

});

module.exports = ContactsUs;
