
const UserMapper = require('./SequelizeUserMapper');
const jwt = require("jsonwebtoken");
const constants = require('../../interfaces/http/utils/constants');
const secret = process.env.JSON_PWD_SECRET;
const crypto = require('crypto');
const { generateOTP } = require('../../interfaces/http/utils/helper');
const { resetPassword } = require('../../interfaces/http/utils/email');

class SequelizeUsersRepository {
  constructor({
    config,
    UsersModel,

  }) {
    this.config = config;
    this.UsersModel = UsersModel;
  }


  async login(req) {

    const pwd = crypto.createHash('md5').update(req.body.password).digest('hex');

    const user = await this.UsersModel.findOne({
      attributes: ["id", "name","email", "country", "bio", "profilePic","roleType","status","password"],
      where: { email: req.body.email},
    });

    if (!user) {
      const error = new Error('ValidationError');
      error.details = "User not found";

      throw error;
    }

    if(user.password!=pwd){
      const error = new Error('ValidationError');
      error.details = "Incorrect password";

      throw error;
    }

    if(user.status==0){
      const error = new Error('ValidationError');
      error.details = "User is deactivated";

      throw error;
    }

    if(user.status==2){
      const error = new Error('ValidationError');
      error.details = "User email confirmation is pending";

      throw error;
    }

    const token = jwt.sign({ user: user }, secret, {
      expiresIn: this.config.sessonExpire
    });
    user.dataValues.token = token;
    return user;
  }

  async adminlogin(req) {

    const pwd = crypto.createHash('md5').update(req.body.password).digest('hex');


    const user = await this.UsersModel.findOne({
      where: { email: req.body.email, password: pwd },
    });

    if (!user) {
      const error = new Error('ValidationError');
      error.details = "User not found";

      throw error;
    }

    const token = jwt.sign({ user: user }, secret, {
      expiresIn: this.config.sessonExpire
    });

    const userdata = await this.UsersModel.findOne({
      attributes: ["id", "name","email", "country", "bio", "profilePic","roleType","nationality"],
      where: { email: req.body.email, password: pwd },
    });

    userdata.dataValues.token = token;
    return userdata;
  }

  async reset(req) {


    const user = await this.UsersModel.findOne({
      attributes: ["id", "name","email", "country", "bio", "profilePic","roleType","nationality"],
      where: { email: req.body.email, roleType: "User" },
    });

    if (!user) {
      const error = new Error('ValidationError');
      error.details = "User not found";

      throw error;
    }

    const otp={
      email:req.body.email,
      otp:generateOTP()
    }

    this.config.vendor.api.otp.find(e => e.email == req.body.email);

    resetPassword(req.body.email,otp.otp);

    this.config.vendor.apiFunc.saveOTP(otp);

    return user;
  }

  async resetPwd(req) {


    const user = await this.UsersModel.findOne({
      attributes: ["id", "name","email", "country", "bio", "profilePic","roleType","nationality"],
      where: { email: req.body.email, roleType: "User" },
    });

    if (!user) {
      const error = new Error('ValidationError');
      error.details = "User not found";

      throw error;
    }

    const otp = this.config.vendor.api.otp.findIndex(e => e.email == req.body.email && e.otp == req.body.otp);

    if(otp==-1){
      const error = new Error('ValidationError');
      error.details = "Otp not generated";

      throw error;
    }

    this.config.vendor.api.otp.splice(otp, constants.ACTIVE);

    this.UsersModel.update(req.body, { where: { id: user.id } });

    return user;
  }

}

module.exports = SequelizeUsersRepository;
