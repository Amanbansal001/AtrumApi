const { post } = require("../../interfaces/http/utils/axios");
var querystring = require('querystring');
const email = require("../../interfaces/http/utils/email");
const axios = require("../../interfaces/http/utils/axios");
const DHL_APIURL = process.env.DHL_APIURL;
const DHL_APIKEY = process.env.DHL_APIKEY;

class SequelizeDHLRepository {
  constructor({
    config,
    OrdersModel,
    UserCartsModel,
    ProductsModel,
    UsersModel,
    OrderAddressesModel,
    NotificationModel
  }) {
    this.config = config;
    this.OrdersModel = OrdersModel;
    this.UserCartsModel = UserCartsModel;
    this.ProductsModel = ProductsModel;
    this.UsersModel = UsersModel;
    this.OrderAddressesModel = OrderAddressesModel;
    this.NotificationModel = NotificationModel;
  }

  //demo-key
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
    }


  }

  async getLocationById(req) {

    const { countryCode, postalCode } = req.query;

    const locations = await axios.get({
      url: `${DHL_APIURL}find-by-address?countryCode=${countryCode}&postalCode=${postalCode}`,
      headers: {
        'DHL-API-Key': `${DHL_APIKEY}`
      },
      debug: true
    });
  
    return locations.data;
  }

  async taxes(req) {
    let taxes=0;
    let data = {...req.body,"accounts": [
      {
        "typeCode": "shipper",
        "number": "958388874"
      }
    ]};

    delete data["_content"]; 

    const rates = await axios.post({
      url: process.env.DHL_TAXRATE,
      headers: {
        'Authorization': "Basic "+process.env.DHL_TAXRATEAUTH
      },
      data: data,
      debug: true
    });

    const json = rates.data;

    json.products.forEach(e => {

      const sar = e.totalPrice.find(f=>f.priceCurrency==="SAR");
      if(sar){
        taxes = sar.price / process.env.USD_TO_SAR;
        taxes = taxes.toFixed(2);
      }
    });

    return {taxes,json};
  }


}

module.exports = SequelizeDHLRepository;
