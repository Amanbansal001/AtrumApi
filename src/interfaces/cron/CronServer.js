const cronmodule = require('node-cron');
const _ = require("lodash");
const constants = require('../http/utils/constants');
const { yymmdd, yymmddHHiiss } = require('../http/utils/helper');
const email = require('../../interfaces/http/utils/email');
const axios = require('../http/utils/axios');

class CronServer {
    constructor({ config,
        AnalyticsModel, CategorysModel, ContactUsModel,
        OrdersModel, OrderAddressesModel, OrderPaymentMethodsModel,
        ProductsModel, ProductBidsModel, ProductFollowsModel, ProductSharesModel,
        TrendingArtistsModel, UsersModel, UserCartsModel, UserFollowsModel, WishlistsModel,
        NftModel, TrendingArtworksModel, AuctionModel, ConfigModel, BannerModel, ContactusCategoryModel,
        CountryModel, CityModel, StateModel, ArtworkShippingModel, ContentModel, AuctionNamesModel, EnquiryModel,
        NotificationModel, logger, MediaMastersModel, moduleRepository }) {
        this.config = config;
        this.logger = logger;

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
        this.moduleRepository = moduleRepository;
        this.logger.info("CRON MODULE LOADED");
        
    }

    start() {
        this.logger.info(cronmodule);
        cronmodule.schedule('* * * * *', async () => {
            this.logger.info('running a task every minute');
        });
    }

    async generateMediaLib() {
        const p = await this.ProductsModel.findAll();
        p.forEach(async e => {
            if (e.productImage) {

                const _img = e.productImage;

                let img = e.productImage;
                
                img = img.replace('atrumart.com/api/upload/','uploads/');
                img = img.replace('staging.app.atrumart.com/api/staging.app.atrumart.com/api/upload/upload/','uploads/');
                img = img.replace('staging.app.atrumart.com/api/upload/','uploads/');
                img = img.replace('//staging.app.atrumart.com/api//upload/','uploads/');
                img = img.replace('//staging.app.atrumart.com/api///staging.app.atrumart.com/api//upload//upload/','uploads/');
                img = img.replace('//atrumart.com/api//upload/','uploads/');
                img = img.replace('//staging.app.atrumart.com/api/uploads//upload/','uploads/');
                

                const url = require('url')
                const http = require('https')

                var sizeOf = require('image-size');


               

                if(img.indexOf("https://")!==-1){
                    const imgUrl = img;
                    const options = url.parse(imgUrl)
                    
                    http.get(options, async(response)=> {
                      const chunks = []
                      response.on('data', async(chunk)=> {
                        chunks.push(chunk)
                      }).on('end', async()=> {
                        const buffer = Buffer.concat(chunks)
                        var dimensions = sizeOf(buffer);
                        await this.moduleRepository.add_medias_mannual(_img,{ file: { width: dimensions.width, height: dimensions.height } })

                      })
                    })
                }else{
                    var dimensions = sizeOf("resources/" + img); // replace with your image
                    
                    await this.moduleRepository.add_medias_mannual(_img,{ file: { width: dimensions.width, height: dimensions.height } })
                }   

            }
        })
    }

    async orderInvoice() {

        const orders = await this.OrdersModel.findAll({
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


        for (var i = 0; i < orders.length; i++) {

            const _orders = orders[i];

            const items = await this.UserCartsModel.findAll({
                where: { cartId: _orders.cartId },
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

            await email.emailInvoice(items, _orders, this.UserCartsModel,
                this.UsersModel, this.OrderAddressesModel, this.CountryModel, this.OrdersModel, false);
        }


    }
}

module.exports = CronServer;

