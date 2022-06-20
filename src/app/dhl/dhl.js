const Operation = require('../Operation');

class DHL extends Operation {
  constructor({ dhlRepository }) {
    super();
    this.dhlRepository = dhlRepository;
  }

  async execute(req) {
    const { SUCCESS, NOT_FOUND } = this.outputs;

    try {
      const user_model = await this.dhlRepository.init(req);
      this.emit(SUCCESS, user_model);
    } catch (error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }

  async getLocationById(req) {
    const { SUCCESS, NOT_FOUND } = this.outputs;

    try {
      const user_model = await this.dhlRepository.getLocationById(req);
      this.emit(SUCCESS, user_model);
    } catch (error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }

  async taxes(req) {
    const { SUCCESS, NOT_FOUND } = this.outputs;

    try {
      const user_model = await this.dhlRepository.taxes(req);
      this.emit(SUCCESS, user_model);
    } catch (error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

DHL.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = DHL;
