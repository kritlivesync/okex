'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _httpGet = require('./common/httpGet');

var _httpGet2 = _interopRequireDefault(_httpGet);

var _httpPost = require('./common/httpPost');

var _httpPost2 = _interopRequireDefault(_httpPost);

var _RestCommonApi2 = require('./RestCommonApi');

var _RestCommonApi3 = _interopRequireDefault(_RestCommonApi2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @export
 * @class RestSpotApi
 */
var RestSpotApi = function (_RestCommonApi) {
    _inherits(RestSpotApi, _RestCommonApi);

    function RestSpotApi(url, accessKey, passphrase, secretKey) {
        _classCallCheck(this, RestSpotApi);

        var _this = _possibleConstructorReturn(this, (RestSpotApi.__proto__ || Object.getPrototypeOf(RestSpotApi)).call(this, url));

        _this.url = url;
        _this.accessKey = accessKey;
        _this.passphrase = passphrase;
        _this.secretKey = secretKey;
        return _this;
    }

    /**
     * @param {*} currency 
     * @returns
        currency	string	
        balance	string	
        hold	string	
        available	string	
        id	long	
     * @memberof RestSpotApi
     */


    _createClass(RestSpotApi, [{
        key: 'getAccounts',
        value: async function getAccounts(currency) {
            if (currency != undefined) return await (0, _httpGet2.default)(this.url + '/api/spot/v3/accounts/' + currency, {}, this.accessKey, this.passphrase, this.secretKey);else return await (0, _httpGet2.default)(this.url + '/api/spot/v3/accounts', {}, this.accessKey, this.passphrase, this.secretKey);
        }

        /**
         * @param {*} client_oid
         * @param {*} type 	limit，market
         * @param {*} side 	buy or sell
         * @param {*} instrument_id
         * @param {*} margin_trading 
         * @param {*} price 
         * @param {*} size 
         * @param {*} notional
         * @returns
            order_id	long	
            client_oid	string	
            result	boolean	
         * @memberof RestSpotApi
         */

    }, {
        key: 'postOrders',
        value: async function postOrders(query) {

            if (query.side == 'buy') {
                query.notional = query.size;
                delete query.size;
            }
            query.margin_trading = 1;

            return await (0, _httpPost2.default)(this.url + '/api/spot/v3/orders', query, this.accessKey, this.passphrase, this.secretKey);
        }

        /**
         * @param {*} instrument_id 
         * @param {*} status (all open part_filled canceling filled cancelled failure ordering)
         * @param {*} limit 100
         * @param {*} from 
         * @param {*} to 
         * @returns
         * @memberof RestSpotApi
         */

    }, {
        key: 'getOrders',
        value: async function getOrders(instrument_id, status, limit, from, to) {

            return await (0, _httpGet2.default)(this.url + '/api/spot/v3/orders', {
                instrument_id: instrument_id,
                status: status,
                limit: limit
                // from: from,
                // to: to
            }, this.accessKey, this.passphrase, this.secretKey);
        }

        /**
         * @param {*} order_id
         * @param {*} instrument_id
         * @returns
         * @memberof RestSpotApi
         */

    }, {
        key: 'getOrdersById',
        value: async function getOrdersById(order_id, instrument_id) {
            return await (0, _httpGet2.default)(this.url + '/api/spot/v3/orders/' + order_id, {
                instrument_id: instrument_id
            }, this.accessKey, this.passphrase, this.secretKey);
        }
    }]);

    return RestSpotApi;
}(_RestCommonApi3.default);

exports.default = RestSpotApi;