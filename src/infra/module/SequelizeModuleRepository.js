
const sequelize = require('sequelize');
const Op = sequelize.Op;
const crypto = require('crypto');
const utils = require('../../interfaces/http/utils/helper');
const email = require('../../interfaces/http/utils/email');
const moment = require('moment');
const constants = require('../../interfaces/http/utils/constants');
const axios = require('../../interfaces/http/utils/axios');
const { newUser } = require('../../interfaces/http/utils/email');
const { yymmdd } = require('../../interfaces/http/utils/helper');
const fs = require('fs');
const path = require('path');
var querystring = require('querystring');
const { post } = require('../../interfaces/http/utils/axios');

class SequelizeModuleRepository {
  constructor({
    config,
    AnalyticsModel, CategorysModel, ContactUsModel,
    OrdersModel, OrderAddressesModel, OrderPaymentMethodsModel,
    ProductsModel, ProductBidsModel, ProductFollowsModel, ProductSharesModel,
    TrendingArtistsModel, UsersModel, UserCartsModel, UserFollowsModel, WishlistsModel,
    NftModel, TrendingArtworksModel, AuctionModel, ConfigModel, BannerModel, ContactusCategoryModel,
    CountryModel, CityModel, StateModel, ArtworkShippingModel, ContentModel, AuctionNamesModel, EnquiryModel,
    NotificationModel, MediaMastersModel
  }) {
    this.AnalyticsModel = AnalyticsModel;
    this.CategorysModel = CategorysModel;
    this.ContactUsModel = ContactUsModel;
    this.OrdersModel = OrdersModel;
    this.OrderAddressesModel = OrderAddressesModel;
    this.OrderPaymentMethodsModel = OrderPaymentMethodsModel;
    this.ProductsModel = ProductsModel;
    this.ProductBidsModel = ProductBidsModel;
    this.ProductFollowsModel = ProductFollowsModel;
    this.ProductSharesModel = ProductSharesModel;
    this.TrendingArtistsModel = TrendingArtistsModel;
    this.UsersModel = UsersModel;
    this.UserCartsModel = UserCartsModel;
    this.UserFollowsModel = UserFollowsModel;
    this.WishlistsModel = WishlistsModel;
    this.NftModel = NftModel;
    this.TrendingArtworksModel = TrendingArtworksModel;
    this.ConfigModel = ConfigModel;
    this.BannerModel = BannerModel;
    this.AuctionModel = AuctionModel;
    this.ContactusCategoryModel = ContactusCategoryModel;
    this.CountryModel = CountryModel;
    this.CityModel = CityModel;
    this.StateModel = StateModel;
    this.ArtworkShippingModel = ArtworkShippingModel;
    this.ContentModel = ContentModel;
    this.AuctionNamesModel = AuctionNamesModel;
    this.EnquiryModel = EnquiryModel;
    this.NotificationModel = NotificationModel;
    this.MediaMastersModel = MediaMastersModel;
  }

  async add_analytics(req) {
    const data = await this.AnalyticsModel.create(req.body);
    return data;
  }

  async update_analytics(req) {
    await this.AnalyticsModel.update(req.body, { where: { id: req.body.id } });
    const data = await this.AnalyticsModel.findOne({ where: { id: req.body.id } });
    return data;
  }

  async get_analytics() {
    const data = await this.AnalyticsModel.findAll();
    return data;
  }

  async get_analytics_id(id) {
    const data = await this.AnalyticsModel.findOne({ where: { id: id } });
    return data;
  }
  async add_categorys(req) {
    if (req.body.isDelete == 1) {
      await this.CategorysModel.destroy({ where: { id: req.body.id } })
      return;
    } else if (req.body.isUpdate == 1) {
      await this.CategorysModel.update(req.body, { where: { id: req.body.id } })
      return;
    }
    const data = await this.CategorysModel.create(req.body);
    return data;
  }

  async update_categorys(req) {
    if (req.body.isDelete == 1) {

      const checkP = await this.ProductsModel.findOne({
        where: { id: req.body.id, active: 1 },
        include: [
          {
            model: this.MediaMastersModel,
            as: 'media',
          },
        ]
      });
      if (checkP) {
        const error = new Error('ValidationError');
        error.details = "Category has active products";

        throw error;
      }
      await this.CategorysModel.destroy({ where: { id: req.body.id } })
      return;
    } else if (req.body.isUpdate == 1) {
      const checkP = await this.ProductsModel.findOne({
        where: { id: req.body.id, active: 1 },
        include: [
          {
            model: this.MediaMastersModel,
            as: 'media',
          },
        ]
      });
      if (checkP) {
        const error = new Error('ValidationError');
        error.details = "Category has active products";

        throw error;
      }
      await this.CategorysModel.update(req.body, { where: { id: req.body.id } })
      return;
    }
  
    const data = await this.CategorysModel.findOne({ where: { id: req.body.id } });
    return data;
  }

  async get_categorys() {
    const data = await this.CategorysModel.findAll();
    return data;
  }

  async get_categorys_id(id) {
    const data = await this.CategorysModel.findOne({ where: { id: id } });
    return data;
  }
  async add_contact_us(req) {
    const data = await this.ContactUsModel.create(req.body);
    return data;
  }

  async update_contact_us(req) {
    await this.ContactUsModel.update(req.body, { where: { id: req.body.id } });
    const data = await this.ContactUsModel.findOne({ where: { id: req.body.id } });
    return data;
  }

  async get_contact_us() {
    const data = await this.ContactUsModel.findAll({ order: [['id', `desc`]], });
    return data;
  }

  async get_contact_us_id(id) {
    const data = await this.ContactUsModel.findOne({ where: { id: id } });
    return data;
  }
  async add_orders(req) {
    if (req.body.isDelete == 1) {
      await this.OrdersModel.destroy({ where: { id: req.body.id } })
      return;
    } else if (req.body.isUpdate == 1) {

      const order = await this.OrdersModel.findOne({ where: { cartId: req.body.cartId } });

      if (req.body.orderStatus == "CONFIRMED") {


        if (order.paymentType == "PA") {
          const confirming = await axios.post({
            url: process.env.HYPERPAY_URL_CONFIRMATION + "/" + req.body.cartId,
            headers: {
              'Authorization': `Bearer ${process.env.HYPERPAY_ACCESSTOKEN}`,
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: querystring.stringify({
              entityId: process.env.HYPERPAY_ENTITYID,
              amount: order.grandTotal,
              currency: "SAR",
              paymentType: "CP",
            }),
            debug: true
          })
        }

        const statusR = await axios.get({
          url: process.env.HYPERPAY_URL + "/" + req.body.cartId + "/payment?entityId=" + process.env.HYPERPAY_ENTITYID,
          headers: {
            'Authorization': `Bearer ${process.env.HYPERPAY_ACCESSTOKEN}`,
            'content-type': 'application/x-www-form-urlencoded'
          },
          debug: true
        })

        const re = new RegExp("^([a-z0-9]{5,})$");
        if (statusR.data.result.code.match(/^(000\.000\.|000\.100\.1|000\.[36])/)) {

          const cart = await this.UserCartsModel.findOne({
            where:{cartId:req.body.cartId},
            include: [
              {
                model: this.ProductsModel,
                as: 'arts',
              },
              {
                model: this.UsersModel,
                as: 'user',
              },
            ]
          });

          const carts = await this.UserCartsModel.findAll({
            where:{cartId:req.body.cartId},
            include: [
              {
                model: this.ProductsModel,
                as: 'arts',
              },
              {
                model: this.UsersModel,
                as: 'user',
              },
            ]
          });
        } else {
          req.body.orderStatus = "FAILED";
        }

      } else {
        req.body.orderStatus = "FAILED";
      }



      await this.OrdersModel.update(req.body, { where: { cartId: req.body.cartId } })

      await this.UserCartsModel.update({
        orderStatus: req.body.orderStatus
      }, {
        where: { cartId: req.body.cartId },
      });

      let message = "";
      if (req.body.orderStatus == "PENDING FOR SHIPPING CHARGES") {
        message = "We will calculate shipping charges and get back to you within 48 hours.";
      } else if (req.body.orderStatus == "PENDING FOR PAYMENT" || req.body.orderStatus == "PENDING FOR PAYMENT ABOVE LIMIT") {
        message = "We have calculated the shipping charges.A payment link will be sent on your e-mail soon. ";
      } else if (req.body.orderStatus == "CONFIRMED") {
        message = "Thank you for ordering with us. Your order has been confirmed and we will revert with estimated delievery date soon.";
      } else if (req.body.orderStatus == "FAILED") {
        message = "Your order has been failed.";
      } else if (req.body.orderStatus == "ACCEPTED" && req.body.deliveryDate) {
        message = "Your order has been accepted. The Estimated delivery date is " + req.body.deliveryDate;
      } else if (req.body.orderStatus == "SHIPPED") {
        message = "Your order has been shipped.";
      } else if (req.body.orderStatus == "DELIVERED") {
        message = "Your Order has been delieverd successfully.";
      }

      const oid = `ORD${String(req.body.id).padStart(6, '0')}`;

      const items = await this.UserCartsModel.findAll({
        where: { cartId: req.body.cartId },
        include: [
          {
            model: this.ProductsModel,
            as: 'arts',
          },
          {
            model: this.UsersModel,
            as: 'user',
          },
        ]
      });

      items.forEach(async e => {
        await this.ProductsModel.update({ inStock: e.arts.inStock - e.qty }, { where: { id: e.productId } });
      })

      await this.emailOrder(req, req.body.cartId)

      return;
    }
    const data = await this.OrdersModel.create(req.body);
    return data;
  }

  async update_orders(req) {


    await this.OrdersModel.update(req.body, { where: { id: req.body.id } });
    const data = await this.OrdersModel.findOne({ where: { id: req.body.id } });
    return null;
  }

  async get_orders(req) {
    const data = await this.OrdersModel.findAll({
      where: req.sqlExplorer.where,
      include: [
        {
          model: this.UsersModel,
          as: 'user',
          attributes: ["id", "name", "country", "comission", "signature", "bio", "profilePic", "roleType", "email",
            "state", "city", "zipCode", "address", "status", "nationality",
            "countryCode", "phone", "createdAt", "updatedAt"]
        },
        {
          model: this.OrderAddressesModel,
          as: 'bill',
        },
        {
          model: this.OrderAddressesModel,
          as: 'ship',
        },
      ]
    });
    return data;
  }

  async get_orders_id(id) {
    const data = await this.OrdersModel.findOne({ where: { id: req.body.id } });
    return data;
  }
  async add_order_addresses(req) {
    const data = await this.OrderAddressesModel.create(req.body);
    return data;
  }

  async update_order_addresses(req) {
    if (req.body.type && req.body.type == "DELETE") {
      await this.OrderAddressesModel.destroy({ where: { id: req.body.id } });
      return null;
    }

    if (req.body.isDefault && req.body.isDefault == 1) {
      await this.OrderAddressesModel.update({ isDefault: 0 }, { where: { userId: req.body.userId } });
    }

    await this.OrderAddressesModel.update(req.body, { where: { id: req.body.id } });
    const data = await this.OrderAddressesModel.findOne({ where: { id: req.body.id } });
    return data;
  }

  async get_order_addresses(req) {
    const data = await this.OrderAddressesModel.findAll({
      where: req.sqlExplorer.where
    });
    return data;
  }

  async get_order_addresses_id(id) {
    const data = await this.OrderAddressesModel.findOne({ where: { id: id } });
    return data;
  }
  async add_order_payment_methods(req) {
    const data = await this.OrderPaymentMethodsModel.create(req.body);
    return data;
  }

  async update_order_payment_methods(req) {
    if (req.body.type && req.body.type == "DELETE") {
      await this.OrderPaymentMethodsModel.destroy({ where: { id: req.body.id } });
      return null;
    }
    await this.OrderPaymentMethodsModel.update(req.body, { where: { id: req.body.id } });
    const data = await this.OrderPaymentMethodsModel.findOne({ where: { id: req.body.id } });
    return data;
  }

  async get_order_payment_methods(req) {
    const data = await this.OrderPaymentMethodsModel.findAll({
      where: req.sqlExplorer.where
    });
    return data;
  }

  async get_order_payment_methods_id(id) {
    const data = await this.OrderPaymentMethodsModel.findOne({ where: { id: req.body.id } });
    return data;
  }
  async add_products(req) {
    const data = await this.ProductsModel.create(req.body);
    return data;
  }

  async update_products(req) {

    if (req.body.active == 0) {
      const current = await this.AuctionNamesModel.findAll({
        raw: true,
        where: {
          startDate: {
            [Op.lte]: moment().toDate()
          },
          expiryDate: {
            [Op.gte]: moment().toDate()
          },
          status: 1
        },
        include: [
          {
            model: this.AuctionModel,
            as: 'auction',
            where: { status: 1 },
            required: true,

            include: [
              {
                model: this.ProductsModel,
                as: 'product',
                required: true,
                where: { id: req.body.id },
              },
            ]
          }
        ]
      });

      if (current.length > 0) {
        const error = new Error('ValidationError');
        error.details = "Auction for this product is already active";

        throw error;
      }
    }

    await this.ProductsModel.update(req.body, { where: { id: req.body.id } });
    const data = await this.ProductsModel.findOne({
      where: { id: req.body.id },
      include: [
        {
          model: this.MediaMastersModel,
          as: 'media',
        },
      ]
    });
    return data;
  }

  async get_products(req) {

    let data = null;
    if (req.auth) {

      data = await this.ProductsModel.findAll({
        where: req.sqlExplorer.where,
        include: [
          {
            model: this.UsersModel,
            as: 'user',
            attributes: ["id", "name", "country", "comission", "signature", "bio", "profilePic", "roleType", "email",
              "state", "city", "zipCode", "address", "status", "nationality",
              "countryCode", "phone", "createdAt", "updatedAt"],
          },
          {
            model: this.CategorysModel,
            as: 'category',
          },
          {
            model: this.MediaMastersModel,
            as: 'media',
          },
          {
            model: this.UserFollowsModel,
            as: 'follow',
            required: false,
            where: {
              userId: (req.auth) ? req.auth.user.id : 0
            }
          },
          {
            model: this.WishlistsModel,
            as: 'wishlist',
            required: false,
            where: {
              userId: (req.auth) ? req.auth.user.id : 0
            }
          }
        ],
        order: req.sqlExplorer.order
      });
    } else {
      data = await this.ProductsModel.findAll({
        where: req.sqlExplorer.where,
        include: [
          {
            model: this.UsersModel,
            as: 'user',
            attributes: ["id", "name", "country", "comission", "signature", "bio", "profilePic", "roleType", "email",
              "state", "city", "zipCode", "address", "status", "nationality",
              "countryCode", "phone", "createdAt", "updatedAt"],
          },
          {
            model: this.CategorysModel,
            as: 'category',
          },
          {
            model: this.MediaMastersModel,
            as: 'media',
          },
        ],
        order: req.sqlExplorer.order
      });
    }


    return data;
  }

  async get_products_only(req) {

    let data = null;
    let p = [];
   
    const aProducts = await this.AuctionNamesModel.findAll({
      where: {
        startDate: {
          [Op.lte]: moment().toDate()
        },
        expiryDate: {
          [Op.gte]: moment().toDate()
        },
        status: { [Op.in]: [constants.ACTIVE] }
      },
      include: [
        {
          model: this.AuctionModel,
          as: 'auction',
          where: { status: { [Op.in]: [constants.ACTIVE] } },
          required: true
        }
      ]
    });

    aProducts.forEach(f => {
      f.auction.forEach(e => {
        p.push(e.dataValues.productId);
      })
    })



    req.sqlExplorer.where = { ...req.sqlExplorer.where, id: { [Op.notIn]: p } }

    if (req.auth) {

      data = await this.ProductsModel.findAll({
        where: req.sqlExplorer.where,
        include: [
          {
            model: this.UsersModel,
            as: 'user',
            attributes: ["id", "name", "country", "comission", "signature", "bio", "profilePic", "roleType", "email",
              "state", "city", "zipCode", "address", "status", "nationality",
              "countryCode", "phone", "createdAt", "updatedAt"],
          },
          {
            model: this.CategorysModel,
            as: 'category',
          },
          {
            model: this.UserFollowsModel,
            as: 'follow',
            required: false,
            where: {
              userId: (req.auth) ? req.auth.user.id : 0
            }
          },
          {
            model: this.WishlistsModel,
            as: 'wishlist',
            required: false,
            where: {
              userId: (req.auth) ? req.auth.user.id : 0
            }
          },
          {
            model: this.MediaMastersModel,
            as: 'media',
          },
        ],
        order: req.sqlExplorer.order
      });
    } else {
      data = await this.ProductsModel.findAll({
        where: req.sqlExplorer.where,
        include: [
          {
            model: this.UsersModel,
            as: 'user',
            attributes: ["id", "name", "country", "comission", "signature", "bio", "profilePic", "roleType", "email",
              "state", "city", "zipCode", "address", "status", "nationality",
              "countryCode", "phone", "createdAt", "updatedAt"],
          },
          {
            model: this.CategorysModel,
            as: 'category',
          },
          {
            model: this.MediaMastersModel,
            as: 'media',
          },
        ],
        order: req.sqlExplorer.order
      });
    }

    return data;
  }

  async get_products_id(req, id) {

    const product = await this.ProductsModel.findOne({ where: { id: id } });
    const follow = await this.UserFollowsModel.findOne({ where: { userId: (req.auth) ? req.auth.user.id : 0, artistId: product.userId } });

    const data = await this.ProductsModel.findOne({
      where: { id: id, ...req.sqlExplorer.where },
      include: [
        {
          model: this.UsersModel,
          as: 'user',
          attributes: ["id", "name", "country", "comission", "signature", "bio", "profilePic", "roleType", "email",
            "state", "city", "zipCode", "address", "status", "nationality",
            "countryCode", "phone", "createdAt", "updatedAt"],
        },
        {
          model: this.WishlistsModel,
          as: 'wishlist',
          required: false,
          where: {
            userId: (req.auth) ? req.auth.user.id : 0
          }
        },
        {
          model: this.MediaMastersModel,
          as: 'media',
        },
      ],
    });

    data.dataValues.follow = follow;
    
    return data;
  }
  async add_product_bids(req) {

    const ifAuction = await this.ProductBidsModel.findOne({ where: { userId: req.body.userId, productId: req.body.productId, auctionId: req.body.auctionId } });
    if (ifAuction) {
      const error = new Error('ValidationError');
      error.details = "Your biding for the product is already done";

      throw error;
    }

    const data = await this.ProductBidsModel.create(req.body);

    const bid = await this.ProductBidsModel.findOne({
      where: { id: data.id }, include: [
        {
          model: this.ProductsModel,
          as: 'arts',
        },
      ]
    });

    await this.NotificationModel.create({
      orderId: 0,
      userId: bid.userId,
      productId: bid.productId,
      message: `Thank you for Bidding with Atrum. Your Bid has been confirmed. We will notify you when the auction gets over..`,
      title: bid.arts.productName
    })

    await this.NotificationModel.create({
      orderId: 0,
      userId: -1,
      productId: bid.productId,
      message: `Thank you for Bidding with Atrum. ${req.auth.user.name} Bid has been confirmed. We will notify you when the auction gets over..`,
      title: bid.arts.productName
    })

    return bid;
  }

  async update_product_bids(req) {

    if (req.body.bidStatus) {
      const bid = await this.ProductBidsModel.findOne({ where: { id: req.body.id } });
      const auction = await this.AuctionModel.findOne({ where: { id: bid.auctionId } });
      const auctionName = await this.AuctionNamesModel.findOne({ where: { id: auction.auctionNameId, expiryDate: { [Op.gte]: new Date() } } });
      if (auctionName) {
        const error = new Error('ValidationError');
        error.details = "Auction still active";

        throw error;
      }

      await this.ProductBidsModel.update({ bidStatus: 'Lose' }, { where: { auctionId: bid.auctionId } });
      const bids = await this.ProductBidsModel.findAll({
        where: { bidStatus: 'Lose', auctionId: bid.auctionId },
        include: [
          {
            model: this.ProductsModel,
            as: 'arts',
          },
          {
            model: this.UsersModel,
            as: 'user',
          },
        ]
      });
      bids.forEach(async e => {
        if (e.id !== req.body.id) {
          await this.NotificationModel.create({
            orderId: 0,
            userId: e.userId,
            productId: e.productId,
            message: `Sorry! You lost the bid. Better luck for next time. The amount blocked on your card will be released in next 7 working days.`,
            title: e.arts.productName
          })

          await this.NotificationModel.create({
            orderId: 0,
            userId: -1,
            productId: e.productId,
            message: `Sorry! ${e.user.name} lost the bid. Better luck for next time. The amount blocked on card will be released in next 7 working days.`,
            title: e.arts.productName
          })
        }
      })

    }

    await this.ProductBidsModel.update(req.body, { where: { id: req.body.id } });
    const data = await this.ProductBidsModel.findOne({
      where: { id: req.body.id }, include: [
        {
          model: this.ProductsModel,
          as: 'arts',
        },
        {
          model: this.UsersModel,
          as: 'user',
        },
      ]
    });
    await this.NotificationModel.create({
      orderId: 0,
      userId: data.userId,
      productId: data.productId,
      message: `Congratulations! You have won the bid. Order ID has been generated against your bid..`,
      title: data.arts.productName
    })

    await this.NotificationModel.create({
      orderId: 0,
      userId: -1,
      productId: data.productId,
      message: `Congratulations! ${data.user.name} have won the bid. Order ID has been generated against bid..`,
      title: data.arts.productName
    })
    return data;
  }

  async get_product_bids(req) {
    let cartId = [];
    const carts = await this.UserCartsModel.findAll({ where: { bidId: { [Op.not]: 0 } } });
    carts.forEach(e => {
      cartId.push(e.bidId);
    })

    const data = await this.ProductBidsModel.findAll({
      where: { id: { [Op.in]: cartId }, ...req.sqlExplorer.where },
      order: [['id', `desc`]],
      include: [
        {
          model: this.ProductsModel,
          as: 'arts',
        },
        {
          model: this.AuctionModel,
          as: 'auction',
          include: [
            {
              model: this.AuctionNamesModel,
              as: 'auctionName',
            },
          ]
        },
      ],
    });
    return data;
  }

  async get_product_bids_id(id) {
    const data = await this.ProductBidsModel.findOne({ where: { id: req.body.id } });
    return data;
  }

  async add_user_follows(req) {
    const isFound = await this.UserFollowsModel.findOne({ where: { userId: req.body.userId, artistId: req.body.artistId } });
    if (isFound) {
      await this.UserFollowsModel.destroy({ where: { id: isFound.id } })
      return;
    }
    const data = await this.UserFollowsModel.create(req.body);
    return data;
  }

  async add_product_follows(req) {

    const product = await this.ProductsModel.findOne({ where: { id: req.body.productId } });
    if (product) {

      const isFound = await this.UserFollowsModel.findOne({ where: { userId: req.body.userId, artistId: product.userId } });
      if (isFound) {
        await this.UserFollowsModel.destroy({ where: { id: isFound.id } })
        return;
      }
      const data = await this.UserFollowsModel.create({
        artistId:product.userId,
        userId:req.body.userId
      });
      return data;
    }
    return null;

  }

  async update_product_follows(req) {
    await this.ProductFollowsModel.update(req.body, { where: { id: req.body.id } });
    const data = await this.ProductFollowsModel.findOne({ where: { id: req.body.id } });
    return data;
  }

  async get_product_follows(req) {
    const data = await this.ProductFollowsModel.findAll({ where: { userId: req.auth.user.id } });
    let pids = [];

    data.forEach(e => {
      pids.push(e.productId);
    })

    const p = await this.ProductsModel.findAll({
      where: {
        id: { [Op.in]: pids }
      },
      include: [
        {
          model: this.MediaMastersModel,
          as: 'media',
        },
      ]
    })

    return p;
  }

  async get_product_follows_id(id) {
    const data = await this.ProductFollowsModel.findOne({ where: { id: req.body.id } });
    return data;
  }
  async add_product_shares(req) {
    const data = await this.ProductSharesModel.create(req.body);
    return data;
  }

  async update_product_shares(req) {
    await this.ProductSharesModel.update(req.body, { where: { id: req.body.id } });
    const data = await this.ProductSharesModel.findOne({ where: { id: req.body.id } });
    return data;
  }

  async get_product_shares() {
    const data = await this.ProductSharesModel.findAll();
    return data;
  }

  async get_product_shares_id(id) {
    const data = await this.ProductSharesModel.findOne({ where: { id: req.body.id } });
    return data;
  }
  async add_trending_artists(req) {
    const data = await this.TrendingArtistsModel.create(req.body);
    return data;
  }

  async update_trending_artists(req) {

    if (req.body.isDelete == "1") {
      await this.TrendingArtistsModel.destroy({ where: { id: req.params.id } });
      return null;
    }


    await this.TrendingArtistsModel.update(req.body, { where: { id: req.body.id } });
    const data = await this.TrendingArtistsModel.findOne({ where: { id: req.body.id } });
    return data;
  }

  async get_trending_artists(req) {

    let data = null;

    if (req.auth) {
      data = await this.TrendingArtistsModel.findAll({
        where: req.sqlExplorer.where,
        include: [
          {
            model: this.UsersModel,
            as: 'user',
            attributes: ["id", "name", "country", "comission", "signature", "bio", "profilePic", "roleType", "email",
              "state", "city", "zipCode", "address", "status", "nationality",
              "countryCode", "phone", "createdAt", "updatedAt"],
          },
          
        ]
      });
    } else {
      data = await this.TrendingArtistsModel.findAll({
        where: req.sqlExplorer.where,
        include: [
          {
            model: this.UsersModel,
            as: 'user',
            attributes: ["id", "name", "country", "comission", "signature", "bio", "profilePic", "roleType", "email",
              "state", "city", "zipCode", "address", "status", "nationality",
              "countryCode", "phone", "createdAt", "updatedAt"],
          },
          
        ]
      });
    }


    return data;
  }

  async get_trending_artists_id(id) {
    const data = await this.TrendingArtistsModel.findOne({ where: { id: req.body.id } });
    return data;
  }
  async add_users(req) {
    const isUser = await this.UsersModel.findOne({ where: { email: req.body.email } });
    if (isUser) {
      const error = new Error('ValidationError');
      error.details = "User Already Exists";

      throw error;
      return;
    }
    req.body.password = crypto.createHash('md5').update(req.body.password).digest('hex');
    req.body.status = (req.body.roleType == "Artist" || req.body.roleType == "ARTIST") ? 1 : 2;
    const data = await this.UsersModel.create(req.body);
    const id = btoa(data.id + "");
    newUser(req.body.email, id)
    return data;
  }

  async update_users(req) {
    if (req.body.password) {
      req.body.password = crypto.createHash('md5').update(req.body.password).digest('hex');
    }
    await this.UsersModel.update(req.body, { where: { id: req.body.id } });
    const data = await this.UsersModel.findOne({ where: { id: req.body.id } });
    if (data.status == constants.INACTIVE) {
      await this.ProductsModel.update({ active: constants.INACTIVE }, { where: { userId: req.body.id } });
    }
    return data;
  }

  async get_users(req) {
    let include = null;
    let data = null;
    if (req.auth) {
      include = {
        model: this.UserFollowsModel,
        as: 'follow',
        required: false,
        where: {
          userId: (req.auth) ? req.auth.user.id : 0
        }
      };
      data = await this.UsersModel.findAll({
        where: req.sqlExplorer.where,
        attributes: ["id", "name", "country", "comission", "signature", "bio", "profilePic", "roleType", "email",
          "state", "city", "zipCode", "address", "status", "nationality",
          "countryCode", "phone", "createdAt", "updatedAt"],
        include: [include]
      });
    } else {
      data = await this.UsersModel.findAll({
        where: req.sqlExplorer.where,
        attributes: ["id", "name", "country", "comission", "signature", "bio", "profilePic", "roleType", "email",
          "state", "city", "zipCode", "address", "status", "nationality",
          "countryCode", "phone", "createdAt", "updatedAt"],
      });
    }

    return data;
  }

  async get_users_id(req, id) {
    let include = null;
    let data = null;
    if (req.auth) {
      include = {
        model: this.UserFollowsModel,
        as: 'follow',
        required: false,
        where: {
          userId: (req.auth) ? req.auth.user.id : 0
        }
      };
      data = await this.UsersModel.findOne({
        where: { ...req.sqlExplorer.where, id: id },
        attributes: ["id", "name", "country", "comission", "signature", "bio", "profilePic", "roleType", "email",
          "state", "city", "zipCode", "address", "status", "nationality",
          "countryCode", "phone", "createdAt", "updatedAt"],
        include: [include]
      });
    } else {
      data = await this.UsersModel.findOne({
        where: { ...req.sqlExplorer.where, id: id, },
        attributes: ["id", "name", "country", "comission", "signature", "bio", "profilePic", "roleType", "email",
          "state", "city", "zipCode", "address", "status", "nationality",
          "countryCode", "phone", "createdAt", "updatedAt"],
      });
    }
    return data;
  }
  async add_user_carts(req) {
    const data = await this.UserCartsModel.create(req.body);
    return data;
  }

  async update_user_carts(req) {

    let isLink = false;

    req.body.forEach(async (el, idx) => {

      let message = "";

      if (el.orderStatus == "PENDING FOR SHIPPING CHARGES") {
        message = "We will calculate shipping charges and get back to you within 48 hours.";
      } else if (el.orderStatus == "PENDING FOR PAYMENT") {
        message = "We have calculated the shipping charges.A payment link will be sent on your e-mail soon. ";
      } else if (el.orderStatus == "CONFIRMED") {
        message = "Thank you for ordering with us. Your order has been confirmed and we will revert with estimated delievery date soon.";
      } else if (el.orderStatus == "ACCEPTED" && el.deliveryDate) {
        message = "Your order has been accepted. The Estimated delivery date is " + el.deliveryDate;
      } else if (el.orderStatus == "SHIPPED") {
        message = "Your order has been shipped.";
      } else if (el.orderStatus == "DELIVERED") {
        message = "Your Order has been delieverd successfully.";
      }

      const order = await this.UserCartsModel.findOne({ where: { id: el.id } });

      const oid = `ORD${String(order.orderId).padStart(6, '0')}`;
      const product = await this.ProductsModel.findOne({
        where: {
          id: order.productId
        },
        include: [
          {
            model: this.MediaMastersModel,
            as: 'media',
          },
        ]
      });




      if (message) {
        await this.NotificationModel.create({
          orderId: order.orderId,
          userId: order.userId,
          productId: order.productId,
          title: `${oid} - ${product.productName}`,
          message: message
        })

        await this.NotificationModel.create({
          orderId: order.orderId,
          userId: -1,
          productId: order.productId,
          title: `${oid} - ${product.productName}`,
          message: message
        })
      }

      await this.UserCartsModel.update(el, { where: { id: el.id } });
    });

    if (req.body && req.body.length > 0) {
      const order = await this.UserCartsModel.findOne({ where: { id: req.body[0].id } });

      await this.UserCartsModel.update({ orderStatus: req.body[0].orderStatus }, { where: { cartId: order.cartId } });

      if (req.body[0].trackingId) {
        await this.OrdersModel.update({ orderStatus: req.body[0].orderStatus, trackingId: req.body[0].trackingId }, { where: { cartId: order.cartId } });
      } else {
        await this.OrdersModel.update({ orderStatus: req.body[0].orderStatus }, { where: { cartId: order.cartId } });
      }




      if (req.body[0].shippingAmount > 0) {
        const OrdersModel = await this.OrdersModel.findOne({
          where: { cartId: order.cartId },
          include: [
            {
              model: this.UsersModel,
              as: 'user',
            },
          ]
        });

        let update = null;
        if (req.body[0].shippingAmount > 0) {
          let shAmt = parseFloat(req.body[0].shippingAmount);
          update = { cartId: order.id, totalShippingAmount: parseFloat(OrdersModel.totalShippingAmount) + shAmt, grandTotal: parseFloat(OrdersModel.grandTotal) + shAmt };
          if (req.body[0].trackingId) {
            update = { ...update, trackingId: req.body[0].trackingId };
          }
        }


        if (OrdersModel.orderStatus == "PENDING FOR PAYMENT") {
          const auth = await this.UsersModel.findOne({ where: OrdersModel.userId });
          const address = await this.OrderAddressesModel.findOne({ where: OrdersModel.billAddressId });
          const country = await this.CountryModel.findOne({ where: { name: address.country } });

          const initPayment = await post({
            url: process.env.HYPERPAY_URL,
            data: querystring.stringify({
              entityId: process.env.HYPERPAY_ENTITYID,
              amount: parseInt(parseInt(update.grandTotal) * parseFloat(process.env.USD_TO_SAR)),
              currency: "SAR",
              paymentType: 'DB',
              merchantTransactionId: OrdersModel.id + "_" + Date.now() + "",
              "customer.email": auth.email,
              "billing.street1": address.addressLine1,
              "billing.city": address.city,
              "billing.state": address.state,
              "billing.country": country.iso2,
              "billing.postcode": address.zipCode,
              "customer.givenName": auth.name,
              "customer.surname": auth.name


            }),
            headers: {
              'Authorization': `Bearer ${process.env.HYPERPAY_ACCESSTOKEN}`,
              'content-type': 'application/x-www-form-urlencoded'
            },
            debug: true
          })

          let hyperpayData = initPayment.data;

          update = { ...update, txnId: hyperpayData.id, cartId: hyperpayData.id, trackingId: hyperpayData.id };

          if (req.body[0].trackingId) {
            update = { ...update, trackingId: req.body[0].trackingId };
          }

          await this.UserCartsModel.update({ cartId: hyperpayData.id }, { where: { orderId: OrdersModel.id } });
        }

        await this.OrdersModel.update({ orderStatus: order.orderStatus, ...update }, { where: { cartId: order.cartId } });

        const latestorderforLink = await this.UserCartsModel.findOne({ where: { orderId: OrdersModel.id } });

        isLink = true;
        this.paymentLink(req, latestorderforLink.cartId);
      }

      if (isLink == false) {
        const latestorder = await this.UserCartsModel.findOne({ where: { id: req.body[0].id } });

        await this.emailOrder(req, latestorder.cartId)
      }
    }

    return null;
  }

  async get_user_carts(req) {
    const data = await this.UserCartsModel.findAll({
      where: req.sqlExplorer.where,
      order: [['id', `desc`]],
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
          model: this.ProductBidsModel,
          as: 'bid',
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
    });
    return data;
  }

  async get_user_carts_id(id) {
    const data = await this.UserCartsModel.findOne({ where: { id: req.body.id } });
    return data;
  }
  async add_user_follows(req) {
    const isFound = await this.UserFollowsModel.findOne({ where: { userId: req.body.userId, artistId: req.body.artistId } });
    if (isFound) {
      await this.UserFollowsModel.destroy({ where: { id: isFound.id } })
      return;
    }
    const data = await this.UserFollowsModel.create(req.body);
    return data;
  }

  async update_user_follows(req) {
    await this.UserFollowsModel.update(req.body, { where: { id: req.body.id } });
    const data = await this.UserFollowsModel.findOne({ where: { id: req.body.id } });
    return data;
  }

  async get_user_follows(req) {
    const data = await this.UserFollowsModel.findAll({ where: { userId: req.auth.user.id } });
    let pids = [];

    data.forEach(e => {
      pids.push(e.artistId);
    })

    const p = await this.UsersModel.findAll({
      where: {
        id: { [Op.in]: pids }
      }
    })

    return p;
  }

  async get_user_follows_id(id) {
    const data = await this.UserFollowsModel.findOne({ where: { id: req.body.id } });
    return data;
  }
  async add_wishlists(req) {
    const isFound = await this.WishlistsModel.findOne({ where: { userId: req.body.userId, productId: req.body.productId } });
    if (isFound) {
      await this.WishlistsModel.destroy({ where: { id: isFound.id } })
      return;
    }
    const data = await this.WishlistsModel.create(req.body);
    return data;
  }

  async update_wishlists(req) {
    await this.WishlistsModel.update(req.body, { where: { id: req.body.id } });
    const data = await this.WishlistsModel.findOne({ where: { id: req.body.id } });
    return data;
  }

  async get_wishlists(req) {
    const data = await this.WishlistsModel.findAll({ where: { userId: req.auth.user.id } });
    let pids = [];

    data.forEach(e => {
      pids.push(e.productId);
    })

    const p = await this.ProductsModel.findAll({
      where: {
        id: { [Op.in]: pids },
      },
      include: [
        {
          model: this.MediaMastersModel,
          as: 'media',
        },
      ]
    })

    return p;
  }

  async get_wishlists_id(id) {
    const data = await this.WishlistsModel.findOne({ where: { id: req.body.id } });
    return data;
  }

  async add_nft(req) {
    const data = await this.NftModel.create(req.body);
    return data;
  }

  async update_nft(req) {
    if (req.body.isDelete == "1") {
      await this.NftModel.destroy({ where: { id: req.params.id } });
      return null;
    }

    await this.NftModel.update(req.body, { where: { id: req.body.id } });
    const data = await this.NftModel.findOne({ where: { id: req.body.id } });
    return data;
  }

  async get_nft() {
    const data = await this.NftModel.findAll();
    return data;
  }

  async get_nft_id(id) {
    const data = await this.NftModel.findOne({ where: { id: id } });
    return data;
  }

  async add_trending_artworks(req) {
    const data = await this.TrendingArtworksModel.create(req.body);
    return data;
  }

  async update_trending_artworks(req) {
    if (req.body.isDelete == "1") {
      await this.TrendingArtworksModel.destroy({ where: { id: req.params.id } });
      return null;
    }

    await this.TrendingArtworksModel.update(req, { where: { id: req.body.id } });
    const data = await this.TrendingArtworksModel.findById(id);
    return data;
  }

  async get_trending_artworks(req) {

    let data = null;

    if (req.auth) {
      data = await this.TrendingArtworksModel.findAll({
        where: req.sqlExplorer.where,
        include: [
          {
            model: this.ProductsModel,
            as: 'arts',
          },
          {
            model: this.WishlistsModel,
            as: 'wishlist',
          }
        ]
      });
    } else {
      data = await this.TrendingArtworksModel.findAll({
        where: req.sqlExplorer.where,
        include: [
          {
            model: this.ProductsModel,
            as: 'arts',
          }
        ]
      });
    }


    return data;
  }

  async get_trending_artworks_id(id) {
    const data = await this.TrendingArtworksModel.findById(id);
    return data;
  }

  async add_auctions(req) {
    if (req.body.isDelete == 1) {
      await this.AuctionModel.destroy({ where: { id: req.body.id } })
      return;
    } else if (req.body.isUpdate == 1) {
      await this.AuctionModel.update(req.body, { where: { id: req.body.id } })
      return;
    }

    const isExists = await this.AuctionModel.findOne({ where: { productId: req.body.productId, auctionNameId: req.body.auctionNameId } });
    if (isExists) {
      const error = new Error('ValidationError');
      error.details = "Auction Already Exists";

      throw error;
    }

    const data = await this.AuctionModel.create(req.body);
    return data;
  }

  async get_auctions_id(req) {

    const status = (req.query.status) ? [0, 1] : [1];

    const current = await this.AuctionModel.findOne({
      where: { id: req.query.auctionId, productId: req.query.productId, status: { [Op.in]: status } },
      include: [
        {
          model: this.ProductsModel,
          as: 'product',
          required: true,
          where: { active: 1 },
          include: [
            {
              model: this.UsersModel,
              as: 'user',
            },
            {
              model: this.MediaMastersModel,
              as: 'media',
            },
          ]
        },
        {
          model: this.ProductBidsModel,
          as: 'bids',
          include: [
            {
              model: this.UsersModel,
              as: 'user',
            },
          ]
        }
      ]
    });

    const auctionName = await this.AuctionNamesModel.findOne({
      where: {
        id: current.auctionNameId
      }
    });

    current.dataValues.auctionName = auctionName;

    return current;
  }

  async get_auctions(req) {

    const status = (req.query.status) ? [0, 1] : [1];

    const current = await this.AuctionNamesModel.findAll({
      where: {
        startDate: {
          [Op.lte]: moment().toDate()
        },
        expiryDate: {
          [Op.gte]: moment().toDate()
        },
        status: { [Op.in]: status }
      },
      include: [
        {
          model: this.AuctionModel,
          as: 'auction',
          where: { status: { [Op.in]: status } },
          required: true,

          include: [
            {
              model: this.ProductsModel,
              as: 'product',
              required: true,
              include:[
                {
                  model: this.MediaMastersModel,
                  as: 'media',
                },
              ],
              where: { active: { [Op.in]: status } },
            },
            {
              model: this.ProductBidsModel,
              as: 'bids',
              include: [
                {
                  model: this.UsersModel,
                  as: 'user',
                },
              ]
            }
          ]
        }
      ]
    });

    const past = await this.AuctionNamesModel.findAll({
      where: {
        expiryDate: {
          [Op.lt]: moment().toDate()
        },
        status: { [Op.in]: status }
      },
      include: [
        {
          model: this.AuctionModel,
          as: 'auction',
          where: { status: { [Op.in]: status } },
          required: true,

          include: [
            {
              model: this.ProductsModel,
              as: 'product',
              include:[
                {
                  model: this.MediaMastersModel,
                  as: 'media',
                },
              ],
              required: true,
              where: { active: { [Op.in]: status } },
            },
            {
              model: this.ProductBidsModel,
              as: 'bids',
              include: [
                {
                  model: this.UsersModel,
                  as: 'user',
                },
              ]
            }
          ]
        }
      ]
    });

    const upcoming = await this.AuctionNamesModel.findAll({
      where: {
        startDate: {
          [Op.gt]: moment().toDate()
        },
        status: { [Op.in]: status }
      },
      include: [
        {
          model: this.AuctionModel,
          as: 'auction',
          required: true,

          where: { status: { [Op.in]: status } },
          include: [
            {
              model: this.ProductsModel,
              as: 'product',
              include:[
                {
                  model: this.MediaMastersModel,
                  as: 'media',
                },
              ],
              required: true,
              where: { active: { [Op.in]: status } },
            },
            {
              model: this.ProductBidsModel,
              as: 'bids',
              include: [
                {
                  model: this.UsersModel,
                  as: 'user',
                },
              ]
            }
          ]
        }
      ]
    });
    return { current, past, upcoming };
  }


  async add_auction_names(req) {
    if (req.body.isDelete == 1) {
      await this.AuctionNamesModel.destroy({ where: { id: req.body.id } })
      return;
    } else if (req.body.isUpdate == 1) {
      await this.AuctionNamesModel.update(req.body, { where: { id: req.body.id } })
      return;
    }

    const data = await this.AuctionNamesModel.create(req.body);
    return data;
  }

  async get_auction_names(req) {
    const status = (req.query.status) ? [0, 1] : [1];
    const data = await this.AuctionNamesModel.findAll({ where: { status: { [Op.in]: status } } });

    return data;
  }

  async get_auction_names_id(id) {
    const data = await this.AuctionNamesModel.findOne({ where: { id: id } });
    return data;
  }

  async add_banners(req) {
    if (req.body.isDelete == 1) {
      await this.BannerModel.destroy({ where: { id: req.body.id } })
      return;
    } else if (req.body.isUpdate == 1) {
      await this.BannerModel.update(req.body, { where: { id: req.body.id } })
      return;
    }
    const data = await this.BannerModel.create(req.body);
    return data;
  }

  async get_banners() {
    const data = await this.BannerModel.findAll();
    return data;
  }

  async get_banners_id(req) {
    const data = await this.BannerModel.findOne({ where: { id: req.params.id } });
    return data;
  }

  async add_configs(req) {
    if (req.body.isDelete == 1) {
      await this.ConfigModel.destroy({ where: { id: req.body.id } })
      return;
    } else if (req.body.isUpdate == 1) {
      await this.ConfigModel.update(req.body, { where: { id: req.body.id } })
      return;
    }
    const data = await this.ConfigModel.create(req.body);
    return data;
  }

  async get_configs() {
    const data = await this.ConfigModel.findAll();
    return data;
  }

  async add_contactus_categorys(req) {
    if (req.body.isDelete == 1) {
      await this.ContactusCategoryModel.destroy({ where: { id: req.body.id } })
      return;
    } else if (req.body.isUpdate == 1) {
      await this.ContactusCategoryModel.update(req.body, { where: { id: req.body.id } })
      return;
    }
    const data = await this.ContactusCategoryModel.create(req.body);
    return data;
  }

  async get_contactus_categorys() {
    const data = await this.ContactusCategoryModel.findAll();
    return data;
  }

  async add_countrys(req) {
    if (req.body.isDelete == 1) {
      await this.CountryModel.destroy({ where: { id: req.body.id } })
      return;
    } else if (req.body.isUpdate == 1) {
      await this.CountryModel.update(req.body, { where: { id: req.body.id } })
      return;
    }
    const data = await this.CountryModel.create(req.body);
    return data;
  }

  async get_countrys_id(id) {
    const data = await this.CountryModel.findOne({ where: { id: id } });
    return data;
  }


  async get_countrys(req) {
    const data = await this.CountryModel.findAll({
      where: req.sqlExplorer.where
    });
    return data;
  }

  async add_states(req) {
    if (req.body.isDelete == 1) {
      await this.StateModel.destroy({ where: { id: req.body.id } })
      return;
    } else if (req.body.isUpdate == 1) {
      await this.StateModel.update(req.body, { where: { id: req.body.id } })
      return;
    }
    const data = await this.StateModel.create(req.body);
    return data;
  }

  async get_states_id(id) {
    const data = await this.StateModel.findOne({ where: { id: id } });
    return data;
  }


  async get_states(req) {
    const data = await this.StateModel.findAll({
      where: req.sqlExplorer.where,
      include: [
        {
          model: this.CountryModel,
          as: 'country',
        },
      ]
    });
    return data;
  }

  async add_cities(req) {
    if (req.body.isDelete == 1) {
      await this.CityModel.destroy({ where: { id: req.body.id } })
      return;
    } else if (req.body.isUpdate == 1) {
      await this.CityModel.update(req.body, { where: { id: req.body.id } })
      return;
    }
    const data = await this.CityModel.create(req.body);
    return data;
  }

  async get_cities_id(id) {
    const data = await this.CityModel.findOne({ where: { id: id } });
    return data;
  }


  async get_cities(req) {
    const data = await this.CityModel.findAll({
      where: req.sqlExplorer.where,
      include: [
        {
          model: this.StateModel,
          as: 'state',
        },
      ]
    });
    return data;
  }

  async add_artwork_shippings(req) {
    if (req.body.isDelete == 1) {
      await this.ArtworkShippingModel.destroy({ where: { id: req.body.id } })
      return;
    } else if (req.body.isUpdate == 1) {
      await this.ArtworkShippingModel.update(req.body, { where: { id: req.body.id } })
      return;
    }
    const data = await this.ArtworkShippingModel.create(req.body);
    return data;
  }

  async get_artwork_shippings_id(id) {
    const data = await this.ArtworkShippingModel.findOne({ where: { id: id } });
    return data;
  }


  async get_artwork_shippings(req) {
    const data = await this.ArtworkShippingModel.findAll({
      where: req.sqlExplorer.where
    });
    return data;
  }


  async add_contents(req) {
    if (req.body.isDelete == 1) {
      await this.ContentModel.destroy({ where: { id: req.body.id } })
      return;
    } else if (req.body.isUpdate == 1) {
      await this.ContentModel.update(req.body, { where: { id: req.body.id } })
      return;
    }
    const data = await this.ContentModel.create(req.body);
    return data;
  }

  async get_contents_id(id) {
    const data = await this.ContentModel.findOne({ where: { id: id } });
    return data;
  }


  async get_contents(req) {
    const data = await this.ContentModel.findAll({
      where: req.sqlExplorer.where
    });
    return data;
  }

  async add_enquiry(req) {
    if (req.body.isDelete == 1) {
      await this.EnquiryModel.destroy({ where: { id: req.body.id } })
      return;
    } else if (req.body.isUpdate == 1) {
      await this.EnquiryModel.update(req.body, { where: { id: req.body.id } })
      return;
    }
    const data = await this.EnquiryModel.create(req.body);

    const product = await this.ProductsModel.findOne({
      where: { id: req.body.productId },
      include: [
        {
          model: this.MediaMastersModel,
          as: 'media',
        },
      ]
    });

    if (req.body.userId != req.body.byUserId) {
      await this.NotificationModel.create({
        orderId: 0,
        userId: req.body.byUserId,
        productId: req.body.productId,
        title: `Your Enquiry for ${product.productName}`,
        message: `You have got a response for your enquiry, Please check the message box.`
      })

      await this.NotificationModel.create({
        orderId: 0,
        userId: -1,
        productId: req.body.productId,
        title: `Enquiry for ${product.productName}`,
        message: `Atrumart have got a response from ${req.auth.user.name} against enquiry, Please check the message box.`
      })
    }

    return data;
  }

  async get_enquiry_id(id) {
    const data = await this.EnquiryModel.findOne({ where: { id: id } });
    return data;
  }


  async get_enquiry(req) {
    const data = await this.EnquiryModel.findAll({
      where: req.sqlExplorer.where,
      include: [
        {
          model: this.ProductsModel,
          as: 'product',
        },
        {
          model: this.UsersModel,
          as: 'user',
        },
      ]
    });
    return data;
  }

  async add_notifications(req) {
    if (req.body.isDelete == 1) {
      await this.NotificationModel.destroy({ where: { id: req.body.id } })
      return;
    } else if (req.body.isUpdate == 1) {
      await this.NotificationModel.update(req.body, { where: { id: req.body.id } })
      return;
    }
    const data = await this.NotificationModel.create(req.body);
    return data;
  }

  async get_notifications_id(id) {
    const data = await this.NotificationModel.findOne({ where: { id: id } });
    return data;
  }


  async get_notifications(req) {
    const data = await this.NotificationModel.findAll({
      where: req.sqlExplorer.where,
      order: [['updatedAt', `desc`]],
      include: [
        {
          model: this.ProductsModel,
          as: 'product',
        },
        {
          model: this.UsersModel,
          as: 'user',
        },
        {
          model: this.OrdersModel,
          as: 'order',
        },
      ]
    });
    return data;
  }

  async emailOrder(req, cartId) {
    const items = await this.UserCartsModel.findAll({
      where: { cartId: cartId },
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
      where: { cartId: cartId },
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

    if (_orders.orderStatus == "CONFIRMED") {
      await email.emailInvoice(items, _orders, this.UserCartsModel,
        this.UsersModel, this.OrderAddressesModel, this.CountryModel, this.OrdersModel, true, false);
    }

    await email.emailOnOrder(items, _orders, this.UserCartsModel);
  }

  async paymentLink(req, cartId) {
    const items = await this.UserCartsModel.findAll({
      where: { cartId: cartId },
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
      where: { cartId: cartId },
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

    await email.paymentLink(items, _orders, this.UserCartsModel);
  }

  async add_medias(req) {
    let d = req.file;
    
    const data = await this.MediaMastersModel.create(d);

    await this.MediaMastersModel.update({ filename: "//staging.app.atrumart.com/api/" + req.file.filename }, { where: { id: data.id } });

    return data;
  }

  async add_medias_mannual(img, req) {
    let d = req.file;
  
    const data = await this.MediaMastersModel.create(d);

    await this.MediaMastersModel.update({ filename: img }, { where: { id: data.id } });

    return data;
  }

}

module.exports = SequelizeModuleRepository;
