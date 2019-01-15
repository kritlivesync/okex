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

var RestMarginApi = function (_RestCommonApi) {
    _inherits(RestMarginApi, _RestCommonApi);

    function RestMarginApi(url, accessKey, passphrase, secretKey) {
        _classCallCheck(this, RestMarginApi);

        var _this = _possibleConstructorReturn(this, (RestMarginApi.__proto__ || Object.getPrototypeOf(RestMarginApi)).call(this, url));

        _this.url = url;
        _this.accessKey = accessKey;
        _this.passphrase = passphrase;
        _this.secretKey = secretKey;
        return _this;
    }

    /**
     * @returns
        instrument_id	string	
        balance	string	
        hold	string	
        available	string	
        risk_rate	string	
        liquidation_price	string	
        borrowed	string	
        lending_fee	string	
     * @memberof RestMarginApi
     */


    _createClass(RestMarginApi, [{
        key: 'getAccounts',
        value: async function getAccounts() {
            return await (0, _httpGet2.default)(this.url + '/api/margin/v3/accounts', {}, this.accessKey, this.passphrase, this.secretKey);
        }

        /**
         * @param {*} client_oid string	
         * @param {*} type 	string	limit,market
         * @param {*} side	string	buy or sell
         * @param {*} instrument_id string	
         * @param {*} margin_trading string	
         * @param {*} price string	string	
         * @returns
            order_id	long	  the order ID customized by yourself
            client_oid	string	
            result	boolean	
         * @memberof RestMarginApi
         */

    }, {
        key: 'postOrders',
        value: async function postOrders(query) {
            if (query.side == 'buy') {
                query.notional = query.size;
                delete query.size;
            }
            query.margin_trading = 2;
            return await (0, _httpPost2.default)(this.url + '/api/margin/v3/orders', query, this.accessKey, this.passphrase, this.secretKey);
        }

        /**
         * @param {*} instrument_id string
         * @param {*} status string (all open part_filled canceling filled cancelled failure ordering)
         * @param {*} limit string	100
         * @param {*} from string	
         * @param {*} to string	
         * @returns
            order_id	long
            price	string
            size	string
            notional	string
            instrument_id	string
            side	string	buy or sell
            type	string	limit,market
            timestamp	string	
            filled_size	string	
            filled_notional	string	
            status	string	
         * @memberof RestMarginApi
         */

    }, {
        key: 'getOrders',
        value: async function getOrders(instrument_id, status, limit, from, to) {
            return await (0, _httpGet2.default)(this.url + '/api/margin/v3/orders', {
                instrument_id: instrument_id,
                status: status,
                limit: limit
                // from: from,
                // to:to
            }, this.accessKey, this.passphrase, this.secretKey);
        }

        /**
         * @param {*} order_id  
         * @param {*} instrument_id string
         * @returns
         * @memberof RestMarginApi
         */

    }, {
        key: 'getOrdersById',
        value: async function getOrdersById(order_id, instrument_id) {

            return await (0, _httpGet2.default)(this.url + '/api/margin/v3/orders/' + order_id, {
                instrument_id: instrument_id
            }, this.accessKey, this.passphrase, this.secretKey);
        }
    }]);

    return RestMarginApi;
}(_RestCommonApi3.default);

exports.default = RestMarginApi;