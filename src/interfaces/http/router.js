const { Router } = require('express');
const statusMonitor = require('express-status-monitor');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const methodOverride = require('method-override');
const controller = require('./utils/createControllerRoutes');
const fileUpload = require('express-fileupload');
const auth = require('./utils/auth');
const response = require('./utils/response');
const Status = require('http-status');
const rateLimit = require('express-rate-limit');
const httpStatus = require('http-status');

module.exports = ({ config, containerMiddleware, logger, loggerMiddleware, errorHandler, swaggerMiddleware }) => {
  const router = Router();

  /* istanbul ignore if */
  if (config.env === 'development') {
    router.use(statusMonitor());
  }

  /* istanbul ignore if */
  if (config.env !== 'test') {
    router.use(loggerMiddleware);
  }
  const apiRouter = Router();
  const options = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  }

  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 70,
    message: {
      status: false,
      code: httpStatus.TOO_MANY_REQUESTS,
      data: null,
      message: null,
      errorMessage: `Too many hits`,
      fieldsValidation: null,
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })

  apiRouter
    .use(methodOverride('X-HTTP-Method-Override'))
    .use(bodyParser.json({ limit: '50mb' }))
    .use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
    .use(cors(options))
    .use(compression())
    .use(limiter)
    .use(containerMiddleware)
    .use('/docs', swaggerMiddleware)
    .use(async (req, res, next) => {

      // filter request, auth check & cors check
      req = await auth(req, res, next);

      next();
    })
    .use((err, req, res, next) => {
      errorHandler(err, req, res, next)
    })
    ;

  /*
   * Add your API routes here
   *
   * You can use the `controllers` helper like this:
   * apiRouter.use('/users', controller(controllerPath))
   *
   * The `controllerPath` is relative to the `interfaces/http` folder
   */

  apiRouter.use('/health', (req, res, next) => {
    response(res, Status.OK, { ip: req.ip }, "", 'Health Check OK');
  });

  apiRouter.use('/upload', controller('upload/UploadController'));
  apiRouter.use('/uploads', controller('upload/UploadController'));
  apiRouter.use('/auth', controller('auth/AuthController'));
  apiRouter.use('/payment', controller('payment/PaymentController'));
  apiRouter.use('/dhl', controller('dhl/DHLController'));


  apiRouter.use('/analytics', controller('module/AnalyticsController'));
  apiRouter.use('/categorys', controller('module/CategorysController'));
  apiRouter.use('/contactUs', controller('module/ContactUsController'));
  apiRouter.use('/contactUsCategory', controller('module/ContactusCategorysController'));
  apiRouter.use('/orders', controller('module/OrdersController'));
  apiRouter.use('/orderAddresses', controller('module/OrderAddressesController'));
  apiRouter.use('/orderPaymentMethods', controller('module/OrderPaymentMethodsController'));
  apiRouter.use('/products', controller('module/ProductsController'));
  apiRouter.use('/productBids', controller('module/ProductBidsController'));
  apiRouter.use('/productFollows', controller('module/ProductFollowsController'));
  apiRouter.use('/productShares', controller('module/ProductSharesController'));
  apiRouter.use('/trendingArtists', controller('module/TrendingArtistsController'));
  apiRouter.use('/users', controller('module/UsersController'));
  apiRouter.use('/userCarts', controller('module/UserCartsController'));
  apiRouter.use('/userFollows', controller('module/UserFollowsController'));
  apiRouter.use('/wishlists', controller('module/WishlistsController'));
  apiRouter.use('/nft', controller('module/NftController'));
  apiRouter.use('/auctionNames', controller('module/AuctionNameController'));
  apiRouter.use('/trendingArtworks', controller('module/TrendingArtworksController'));
  apiRouter.use('/artworksShipping', controller('module/ArtworkShippingController'));
  apiRouter.use('/enquiry', controller('module/EnquiryController'));
  apiRouter.use('/notifications', controller('module/NotificationController'));

  apiRouter.use('/config', controller('module/ConfigController'));
  apiRouter.use('/content', controller('module/ContentController'));
  apiRouter.use('/auction', controller('module/AuctionController'));
  apiRouter.use('/banner', controller('module/BannerController'));

  apiRouter.use('/country', controller('module/CountryController'));
  apiRouter.use('/city', controller('module/CityController'));
  apiRouter.use('/state', controller('module/StateController'));

  router.use('/api', apiRouter);
  router.use('/', controller('ReactController'));
  router.use(errorHandler);

  return router;
};
