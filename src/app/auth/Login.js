const Operation = require('../Operation');

class Login extends Operation {
  constructor({ userRepository }) {
    super();
    this.userRepository = userRepository;
  }

  async execute(req) {
    const { SUCCESS, NOT_FOUND } = this.outputs;

    try {
      const user_model = await this.userRepository.login(req);
      this.emit(SUCCESS, user_model);
    } catch(error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }

  async execute_reset(req) {
    const { SUCCESS, NOT_FOUND } = this.outputs;

    try {
      const user_model = await this.userRepository.reset(req);
      this.emit(SUCCESS, user_model);
    } catch(error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }

  async execute_resetPwd(req) {
    const { SUCCESS, NOT_FOUND } = this.outputs;

    try {
      const user_model = await this.userRepository.resetPwd(req);
      this.emit(SUCCESS, user_model);
    } catch(error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }

  async execute_admin(req) {
    const { SUCCESS, NOT_FOUND } = this.outputs;

    try {
      const user_model = await this.userRepository.adminlogin(req);
      this.emit(SUCCESS, user_model);
    } catch(error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

Login.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = Login;
