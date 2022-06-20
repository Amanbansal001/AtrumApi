const { createContainer, asClass, asFunction, asValue } = require('awilix');
const { scopePerRequest } = require('awilix-express');

const config = require('../config');

const Application = require('./app/Application');

const {
  Module
} = require('./app/modules');

const {
  Login
} = require('./app/auth');

const {
  Payment
} = require('./app/payment');

const {
  DHL
} = require('./app/dhl');

const CronServer = require('./interfaces/cron/CronServer');
const Server = require('./interfaces/http/Server');
const router = require('./interfaces/http/router');
const loggerMiddleware = require('./interfaces/logging/loggerMiddleware');
const errorHandler = require('./interfaces/errors/errorHandler');
const devErrorHandler = require('./interfaces/errors/devErrorHandler');
const swaggerMiddleware = require('./interfaces/http/swagger/swaggerMiddleware');

const logger = require('./infra/logging/logger');
const SequelizeModuleRepository = require('./infra/module/SequelizeModuleRepository');
const SequelizeUsersRepository = require('./infra/user/SequelizeUsersRepository');
const SequelizePaymentsRepository = require('./infra/payment/SequelizePaymentsRepository');
const SequelizeDHLRepository = require('./infra/dhl/SequelizeDHLRepository');

const {
  database,
  Analytic: AnalyticsModel,
  Category: CategorysModel,
  ContactUs: ContactUsModel,
  Order: OrdersModel,
  OrderAddress: OrderAddressesModel,
  OrderPaymentMethod: OrderPaymentMethodsModel,
  Product: ProductsModel,
  ProductBids: ProductBidsModel,
  ProductFollow: ProductFollowsModel,
  ProductShare: ProductSharesModel,
  TrendingArtist: TrendingArtistsModel,
  User: UsersModel,
  UserCart: UserCartsModel,
  UserFollow: UserFollowsModel,
  Wishlist: WishlistsModel,
  Nft: NftModel,
  TrendingArtwork: TrendingArtworksModel,
  Auction: AuctionModel,
  Banner: BannerModel,
  Config: ConfigModel,
  ContactusCategory: ContactusCategoryModel,
  Country: CountryModel,
  State: StateModel,
  City: CityModel,
  ArtworkShipping: ArtworkShippingModel,
  Content: ContentModel,
  AuctionNames: AuctionNamesModel,
  Enquiry: EnquiryModel,
  Notification: NotificationModel,
  MediaMasters:MediaMastersModel,

} = require('./infra/database/models');


const container = createContainer();

// System
container
  .register({
    app: asClass(Application).singleton(),
    server: asClass(Server).singleton(),
    cron: asClass(CronServer).singleton(),
  })
  .register({
    router: asFunction(router).singleton(),
    logger: asFunction(logger).singleton()
  })
  .register({
    config: asValue(config),
  });

// Middlewares
container
  .register({
    loggerMiddleware: asFunction(loggerMiddleware).singleton()
  })
  .register({
    containerMiddleware: asValue(scopePerRequest(container)),
    errorHandler: asValue(config.production ? errorHandler : devErrorHandler),
    swaggerMiddleware: asValue([swaggerMiddleware]),

  });

// Repositories
container.register({
  moduleRepository: asClass(SequelizeModuleRepository).singleton(),
  userRepository: asClass(SequelizeUsersRepository).singleton(),
  paymentRepository: asClass(SequelizePaymentsRepository).singleton(),
  dhlRepository: asClass(SequelizeDHLRepository).singleton()
});

// Database
container.register({
  database: asValue(database),
  AnalyticsModel: asValue(AnalyticsModel),
  CategorysModel: asValue(CategorysModel),
  ContactUsModel: asValue(ContactUsModel),
  OrdersModel: asValue(OrdersModel),
  OrderAddressesModel: asValue(OrderAddressesModel),
  OrderPaymentMethodsModel: asValue(OrderPaymentMethodsModel),
  ProductsModel: asValue(ProductsModel),
  ProductBidsModel: asValue(ProductBidsModel),
  ProductFollowsModel: asValue(ProductFollowsModel),
  ProductSharesModel: asValue(ProductSharesModel),
  TrendingArtistsModel: asValue(TrendingArtistsModel),
  UsersModel: asValue(UsersModel),
  UserCartsModel: asValue(UserCartsModel),
  UserFollowsModel: asValue(UserFollowsModel),
  WishlistsModel: asValue(WishlistsModel),
  NftModel: asValue(NftModel),
  TrendingArtworksModel: asValue(TrendingArtworksModel),
  AuctionModel: asValue(AuctionModel),
  BannerModel: asValue(BannerModel),
  ConfigModel: asValue(ConfigModel),
  ContactusCategoryModel: asValue(ContactusCategoryModel),
  CountryModel: asValue(CountryModel),
  CityModel: asValue(CityModel),
  StateModel: asValue(StateModel),
  ArtworkShippingModel: asValue(ArtworkShippingModel),
  ContentModel: asValue(ContentModel),
  AuctionNamesModel: asValue(AuctionNamesModel),
  EnquiryModel: asValue(EnquiryModel),
  NotificationModel: asValue(NotificationModel),
  MediaMastersModel: asValue(MediaMastersModel)
});

// Operations
container.register({
  login: asClass(Login),
  module: asClass(Module),
  payment: asClass(Payment),
  dhl: asClass(DHL)

});

module.exports = container;
