const Operation = require('../Operation');

class Payment extends Operation {
  constructor({ paymentRepository }) {
    super();
    this.paymentRepository = paymentRepository;
  }

  async execute(req) {
    const { SUCCESS, NOT_FOUND } = this.outputs;

    try {
      const user_model = await this.paymentRepository.init(req);
      this.emit(SUCCESS, user_model);
    } catch(error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

Payment.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = Payment;
