const { post } = require("../../interfaces/http/utils/axios");
var querystring = require('querystring');
const email = require("../../interfaces/http/utils/email");

class SequelizePaymentsRepository {
  constructor({
    config,
    OrdersModel,
    UserCartsModel,
    ProductsModel,
    UsersModel,
    OrderAddressesModel,
    NotificationModel,
    CountryModel
  }) {
    this.config = config;
    this.OrdersModel = OrdersModel;
    this.UserCartsModel = UserCartsModel;
    this.ProductsModel = ProductsModel;
    this.UsersModel = UsersModel;
    this.OrderAddressesModel = OrderAddressesModel;
    this.NotificationModel = NotificationModel;
    this.CountryModel = CountryModel;
  }


  async init(req) {

    if (!req.auth) {
      const error = new Error('ERROR');
      error.details = "User Not Logged in";

      throw error;
    }

    if (!req.body.carts) {
      const error = new Error('ERROR');
      error.details = "No product found";

      throw error;
    }

    const isUser = await this.UsersModel.findOne({ where: { id: req.auth.user.id, status: 1 } });
    if (!isUser) {
      const error = new Error('ERROR');
      error.details = "User Not found";

      throw error;
      return;
    }

    const userId = req.auth.user.id;
    let total = 0;
    let grandtotal = 0;
    let errors = false;
    let pid = [];
    let isAuction = false;
    let artistId = 0;
    let logistics = "";
    let taxes = req.body.carts[0].shippingAmt || 0;
   
    for (var i = 0; i < req.body.carts.length; i++) {
      try {
        let e = req.body.carts[i];

        isAuction = (e.isAuction) ? true : false;

        pid.push(e.id);
        const isProduct = await this.ProductsModel.findOne({
          where: {
            id: e.id
          }
        });

        logistics = isProduct.logistics;

        if (!isAuction && !isProduct) {
          errors = true;
          throw new Error("");
        }

        if (!isAuction && isProduct.inStock <= 0) {
          errors = true;
          throw new Error("");
        }

        if (!isAuction && isProduct.inStock < e.qty) {
          errors = true;
          throw new Error("");
        }


        e.qty = (e.qty) ? e.qty : 1;
        total += (parseFloat(e.price) * e.qty);
      } catch (e) {

        const error = new Error('ValidationError');
        error.details = "Product not available";

        throw error;
      }
    }


    if (errors) {
      const error = new Error('ValidationError');
      error.details = "Product not available";

      throw error;
    }

    const outOfStock = await this.ProductsModel.findOne({
      where: {
        id: pid,
        inStock: 0
      }
    });

    if (outOfStock && !isAuction) {
      const error = new Error('ValidationError');
      error.details = "Product not available";

      throw error;
    }

    grandtotal = (total + (parseFloat(req.body.vat) * total) / 100) + parseFloat(req.body.totalShippingAmount);

    const order = await this.OrdersModel.create({
      orderId: Date.now(),
      txnId: Date.now(),//hyperpayData.id,
      cartId: Date.now(),//hyperpayData.id,
      trackingId: Date.now(),//hyperpayData.id,
      billAddressId: req.body.billAddressId,
      shipAddressId: req.body.shipAddressId,
      userId: userId,
      total: total,
      grandTotal: grandtotal,
      orderStatus: req.body.orderStatus || 'PENDING',
      paymentType: isAuction?'PA':'DB',
      paymentMethodId: 1,
      totalShippingAmount: taxes,
      orderType: req.body.orderType || 'PRODUCT',
      vat: req.body.vat || 0
    });

    
    const address = await this.OrderAddressesModel.findOne({ where: req.body.billAddressId });
    const country = await this.CountryModel.findOne({ where: { name: address.country } });

    const initPayment = await post({
      url: process.env.HYPERPAY_URL,
      data: querystring.stringify({
        entityId: process.env.HYPERPAY_ENTITYID,
        amount: parseInt(parseInt(grandtotal)*parseFloat(process.env.USD_TO_SAR)),
        currency: "SAR",
        paymentType: isAuction?'PA':'DB',
        merchantTransactionId: order.id+"_"+Date.now() + "",
        "customer.email": req.auth.user.email,
        "billing.street1": address.addressLine1,
        "billing.city": address.city,
        "billing.state": address.state,
        "billing.country": country.iso2,
        "billing.postcode": address.zipCode,
        "customer.givenName": req.auth.user.name,
        "customer.surname": req.auth.user.name


      }),
      headers: {
        'Authorization': `Bearer ${process.env.HYPERPAY_ACCESSTOKEN}`,
        'content-type': 'application/x-www-form-urlencoded'
      },
      debug: true
    })

    let hyperpayData = initPayment.data;
    

    await this.OrdersModel.update({ txnId: hyperpayData.id, cartId: hyperpayData.id, trackingId: hyperpayData.id }, { where: { id: order.id } });


    req.body.carts.forEach(async (e) => {
      let message = "";
      await this.UserCartsModel.create({
        cartId: hyperpayData.id,
        orderId: order.id,
        userId: userId,
        bidId: (e.bidId) ? e.bidId : 0,
        productId: e.id,
        orderStatus: req.body.orderStatus || 'PENDING',
        qty: e.qty,
        price: e.price,
        shippingAmount: taxes,
        vat: req.body.vat || 0
      })


      if (req.body.orderStatus == "PENDING FOR SHIPPING CHARGES") {
        message = "We will calculate shipping charges and get back to you within 48 hours.";
      } else if (req.body.orderStatus == "PENDING FOR PAYMENT" && taxes == "0") {
        message = "We have calculated the shipping charges.A payment link will be sent on your e-mail soon. ";
      } else if (req.body.orderStatus == "PENDING FOR PAYMENT" && taxes != "0") {
        
      } else if (req.body.orderStatus == "CONFIRMED") {
        message = "Thank you for ordering with us. Your order has been confirmed and we will revert with estimated delievery date soon.";
      }else if (req.body.orderStatus == "PENDING FOR PAYMENT ABOVE LIMIT") {
        message = "Thank you for ordering with us. For your particular order,you will need to make a direct payment on our bank account..";
      }

      const oid = `ORD${String(order.id).padStart(6, '0')}`;
      const product = await this.ProductsModel.findOne({
        where: {
          id: e.id
        }
      });

      if (message) {
        await this.NotificationModel.create({
          orderId: order.id,
          userId: userId,
          productId: e.id,
          title: `${oid} - ${product.productName}`,
          message: message
        })

        await this.NotificationModel.create({
          orderId: order.id,
          userId: -1,
          productId: e.id,
          title: `${oid} - ${product.productName}`,
          message: message
        })
      }

    })


    setTimeout(() => {
      this.emailOrder(req, hyperpayData);
    }, 3000)

    hyperpayData.taxes = taxes;
    return hyperpayData;

  }


  async callHyperPay(req,order,grandtotal,isAuction){

    const address = await this.OrderAddressesModel.findOne({ where: req.body.billAddressId });
    const country = await this.CountryModel.findOne({ where: { name: address.country } });

    const initPayment = await post({
      url: process.env.HYPERPAY_URL,
      data: querystring.stringify({
        entityId: process.env.HYPERPAY_ENTITYID,
        amount: parseInt(parseInt(grandtotal)*parseFloat(process.env.USD_TO_SAR)),
        currency: "SAR",
        paymentType: isAuction?'PA':'DB',

        merchantTransactionId: order.id + "",
        "customer.email": req.auth.user.email,
        "billing.street1": address.addressLine1,
        "billing.city": address.city,
        "billing.state": address.state,
        "billing.country": country.iso2,
        "billing.postcode": address.zipCode,
        "customer.givenName": req.auth.user.name,
        "customer.surname": req.auth.user.name


      }),
      headers: {
        'Authorization': `Bearer ${process.env.HYPERPAY_ACCESSTOKEN}`,
        'content-type': 'application/x-www-form-urlencoded'
      },
      debug: true
    })

    return initPayment;
  }

  async emailOrder(req, hyperpayData) {
    const items = await this.UserCartsModel.findAll({
      where: { cartId: hyperpayData.id },
      include: [
        {
          model: this.ProductsModel,
          as: 'arts',
          include: [
            {
              model: this.UsersModel,
              as: 'user',
            },
          ]
        },
        {
          model: this.UsersModel,
          as: 'user',
        },
        {
          model: this.OrdersModel,
          as: 'order',
          include: [
            {
              model: this.OrderAddressesModel,
              as: 'bill',
            },
            {
              model: this.OrderAddressesModel,
              as: 'ship',
            },

          ]
        }
      ]
    })

    const _orders = await this.OrdersModel.findOne({
      where: { cartId: hyperpayData.id },
      include: [
        {
          model: this.OrderAddressesModel,
          as: 'bill',
        },
        {
          model: this.OrderAddressesModel,
          as: 'ship',
        },

      ]
    })

    if (req.body.orderStatus == "PENDING FOR SHIPPING CHARGES" || "PENDING FOR PAYMENT ABOVE LIMIT") {
      await email.emailOnOrder(items, _orders, this.UserCartsModel);
    }
  }

}

module.exports = SequelizePaymentsRepository;
