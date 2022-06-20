const User = require('../../domain/User');

const SequelizeUserMapper = {
  toEntity({ dataValues }) {
    
    const { 
      token,
      id,
      name,
      email,
      mobile,
      roleType,
      createdAt,
      updatedAt
    
    } = dataValues;

    return new User({
      token,
      id,
      name,
      email,
      mobile,
      roleType,
      createdAt,
      updatedAt

    });
  },


  toDatabase(survivor) {
    const { 
      token,
      id,
      name,
      email,
      mobile,
      createdAt,
      updatedAt
     } = survivor;

    return {
      token,
      id,
      name,
      email,
      mobile,
      createdAt,
      updatedAt
    };
  }
};

module.exports = SequelizeUserMapper;
