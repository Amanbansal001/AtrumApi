const { attributes } = require('structure');

const User = attributes({

  id: { type: Number },
  plantId: { type: Number },
  employeeCode: { type: String },
  employeeName: { type: String },
  employeeMobile: { type: String },
  employeeEmail: { type: String },
  employeePosition: { type: String },
  roleType: { type: String },
  status: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },

})(class User {

});

module.exports = User;
