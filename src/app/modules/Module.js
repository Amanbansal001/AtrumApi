const Operation = require('../Operation');
const { generateOTP } = require('../../interfaces/http/utils/helper');

class Module extends Operation {
    constructor({ moduleRepository, logger }) {
        super();
        this.moduleRepository = moduleRepository;
        this.logger = logger;

    }


    async add_medias(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            
            const data = await this.moduleRepository.add_medias(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async add_analytics(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.add_analytics(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async update_analytics(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.update_analytics(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async get_analytics(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.get_analytics(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async get_analytics_id(id) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.get_analytics_id(id);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }
    async add_categorys(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.add_categorys(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async update_categorys(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.update_categorys(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async get_categorys(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.get_categorys(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async get_categorys_id(id) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.get_categorys_id(id);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }
    async add_contact_us(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.add_contact_us(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async update_contact_us(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.update_contact_us(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async get_contact_us(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.get_contact_us(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async get_contact_us_id(id) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.get_contact_us_id(id);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }
    async add_orders(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.add_orders(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async update_orders(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.update_orders(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async get_orders(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.get_orders(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async get_orders_id(id) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.get_orders_id(id);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }
    async add_order_addresses(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.add_order_addresses(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async update_order_addresses(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.update_order_addresses(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async get_order_addresses(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.get_order_addresses(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async get_order_addresses_id(id) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.get_order_addresses_id(id);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }
    async add_order_payment_methods(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.add_order_payment_methods(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async update_order_payment_methods(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.update_order_payment_methods(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async get_order_payment_methods(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.get_order_payment_methods(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async get_order_payment_methods_id(id) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.get_order_payment_methods_id(id);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }
    async add_products(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.add_products(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async update_products(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.update_products(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async get_products(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.get_products(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async get_products_only(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.get_products_only(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async get_products_id(req,id) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.get_products_id(req,id);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }
    async add_product_bids(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.add_product_bids(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async update_product_bids(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.update_product_bids(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async get_product_bids(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.get_product_bids(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async get_product_bids_id(id) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.get_product_bids_id(id);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }
    async add_product_follows(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.add_product_follows(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async update_product_follows(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.update_product_follows(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async get_product_follows(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.get_product_follows(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async get_product_follows_id(id) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.get_product_follows_id(id);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }
    async add_product_shares(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.add_product_shares(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async update_product_shares(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.update_product_shares(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async get_product_shares(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.get_product_shares(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async get_product_shares_id(id) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.get_product_shares_id(id);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }
    async add_trending_artists(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.add_trending_artists(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async update_trending_artists(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.update_trending_artists(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async get_trending_artists(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.get_trending_artists(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async get_trending_artists_id(id) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.get_trending_artists_id(id);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }
    async add_users(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.add_users(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async update_users(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.update_users(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async get_users(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.get_users(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async get_users_id(req,id) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.get_users_id(req,id);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }
    async add_user_carts(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.add_user_carts(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async update_user_carts(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.update_user_carts(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async get_user_carts(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.get_user_carts(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async get_user_carts_id(id) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.get_user_carts_id(id);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }
    async add_user_follows(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.add_user_follows(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async update_user_follows(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.update_user_follows(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async get_user_follows(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.get_user_follows(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async get_user_follows_id(id) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.get_user_follows_id(id);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }
    async add_wishlists(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.add_wishlists(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async update_wishlists(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.update_wishlists(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async get_wishlists(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.get_wishlists(req);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async get_wishlists_id(id) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        try {
            const data = await this.moduleRepository.get_wishlists_id(id);

            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }

    async add_nft(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.add_nft(req);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }
    
    async update_nft(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.update_nft(req);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }
    
    async get_nft(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.get_nft(req);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }
    
    async get_nft_id(id) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.get_nft_id(id);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }

    async add_trending_artworks(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.add_trending_artworks(req);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }
    
    async update_trending_artworks(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.update_trending_artworks(req);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }
    
    async get_trending_artworks(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.get_trending_artworks(req);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }
    
    async get_trending_artworks_id(id) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.get_trending_artworks_id(id);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }

    async add_auctions(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.add_auctions(req);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }
    
    async get_auctions(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.get_auctions(req);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }

    async get_auctions_id(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.get_auctions_id(req);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }

    async add_auction_names(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.add_auction_names(req);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }
    
    async get_auction_names(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.get_auction_names(req);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }

    async get_auction_names_id(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.get_auction_names_id(req);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }

    async add_configs(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.add_configs(req);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }
    
    async get_configs(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.get_configs(req);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }

    async add_banners(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.add_banners(req);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }
    
    async get_banners(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.get_banners(req);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }

    async get_banners_id(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.get_banners_id(req);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }

    async add_contactus_categorys(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.add_contactus_categorys(req);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }
    
    async get_contactus_categorys(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.get_contactus_categorys(req);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }

    async add_countrys(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.add_countrys(req);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }

    async get_countrys_id(req,id) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.get_countrys_id(id);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }
    
    async get_countrys(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.get_countrys(req);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }

    async add_states(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.add_states(req);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }

    async get_states_id(req,id) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.get_states_id(id);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }
    
    async get_states(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.get_states(req);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }

    async add_cities(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.add_cities(req);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }

    async get_cities_id(req,id) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.get_cities_id(id);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }
    
    async get_cities(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.get_cities(req);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }

    async add_artwork_shippings(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.add_artwork_shippings(req);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }

    async get_artwork_shippings_id(req,id) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.get_artwork_shippings_id(id);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }
    
    async get_artwork_shippings(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.get_artwork_shippings(req);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }

    async add_contents(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.add_contents(req);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }

    async get_enquiry_id(req,id) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.get_enquiry_id(id);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }
    
    async get_enquiry(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.get_enquiry(req);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }

    async add_enquiry(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.add_enquiry(req);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }

    async get_enquiry_id(req,id) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.get_enquiry_id(id);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }
    
    async get_enquiry(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.get_enquiry(req);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }

    async add_contents(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.add_contents(req);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }

    async get_contents_id(req,id) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.get_contents_id(id);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }
    
    async get_contents(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.get_contents(req);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }

    async add_notifications(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.add_notifications(req);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }

    async get_notifications_id(req,id) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.get_notifications_id(id);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }
    
    async get_notifications(req) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    
        try {
            const data = await this.moduleRepository.get_notifications(req);
    
            this.emit(SUCCESS, data);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }
    
            this.emit(ERROR, error);
        }
    }
}

Module.setOutputs(['SUCCESS', "ERROR", 'VALIDATION_ERROR']);

module.exports = Module;
