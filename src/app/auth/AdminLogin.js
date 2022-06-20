const Operation = require('../Operation');

class AdminLogin extends Operation {
  constructor({ usersRepository }) {
    super();
    this.usersRepository = usersRepository;
  }

  async execute(req) {
    const { SUCCESS, NOT_FOUND } = this.outputs;

    try {
      const user = await this.usersRepository.login(req);
      this.emit(SUCCESS, user);
    } catch(error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

AdminLogin.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = AdminLogin;
