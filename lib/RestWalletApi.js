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
 * @class RestWalletApi
 */
var RestWalletApi = function (_RestCommonApi) {
    _inherits(RestWalletApi, _RestCommonApi);

    function RestWalletApi(url, accessKey, passphrase, secretKey) {
        _classCallCheck(this, RestWalletApi);

        var _this = _possibleConstructorReturn(this, (RestWalletApi.__proto__ || Object.getPrototypeOf(RestWalletApi)).call(this, url));

        _this.url = url;
        _this.accessKey = accessKey;
        _this.passphrase = passphrase;
        _this.secretKey = secretKey;
        return _this;
    }

    /**
     * @returns 
        currency	String	btc
        name	String
        can_deposit	number
        can_withdraw	number
        min_withdrawal	number
     * @memberof RestWalletApi
     */


    _createClass(RestWalletApi, [{
        key: 'getCurrencies',
        value: async function getCurrencies() {
            return await (0, _httpGet2.default)(this.url + '/api/account/v3/currencies', {}, this.accessKey, this.passphrase, this.secretKey);
        }

        /**
         * @returns 
            currency	String	btc
            balance	number
            hold	number
            available	number
         * @memberof RestWalletApi
         */

    }, {
        key: 'getWallet',
        value: async function getWallet() {
            return await (0, _httpGet2.default)(this.url + '/api/account/v3/wallet', {}, this.accessKey, this.passphrase, this.secretKey);
        }

        /**
         * @param {*} currency 
         * @returns
            balance	number	
            hold	number	
            available	number	
            currency	String	btc
         * @memberof RestWalletApi
         */

    }, {
        key: 'getWalletByCurrency',
        value: async function getWalletByCurrency(currency) {
            return await (0, _httpGet2.default)(this.url + '/api/account/v3/wallet/' + currency, {}, this.accessKey, this.passphrase, this.secretKey);
        }

        /**
         * @param {*} amount
         * @param {*} currency
         * @param {*} from (0: บัญชีย่อย 1: เหรียญ 3: สัญญา 4: C2C 5: เหรียญ 6: กระเป๋าเงิน 7: ETT)
         * @param {*} to (0: บัญชีย่อย 1: เหรียญ 3: สัญญา 4: C2C 5: เหรียญ 6: กระเป๋าเงิน 7: ETT)
         * @param {*} instrument_id eos-usdt
         * @returns
            transfer_id	number	
            currency	String	
            from	number	
            amount	number	
            to	number	
            result	boolean	
         * @memberof RestWalletApi
         */

    }, {
        key: 'postTransfer',
        value: async function postTransfer(amount, currency, from, to, instrument_id) {

            return await (0, _httpPost2.default)(this.url + '/api/account/v3/transfer', {
                amount: amount,
                currency: currency,
                from: from,
                to: to,
                instrument_id: instrument_id
            }, this.accessKey, this.passphrase, this.secretKey);
        }

        /**
         * @param {*} currency 	
         * @param {*} amount 
         * @param {*} destination (2: OKCoin International 3: OKEx 4: ที่อยู่สกุลเงินดิจิตอล)
         * @param {*} to_address 
         * @param {*} trade_pwd 
         * @param {*} fee 
         * @returns
            currency	String	
            amount	number	
            withdraw_id	number	
            result	boolean	
         * @memberof RestWalletApi
         */

    }, {
        key: 'postWithdrawal',
        value: async function postWithdrawal(currency, amount, destination, to_address, trade_pwd, fee) {

            return await (0, _httpPost2.default)(this.url + '/api/account/v3/withdrawal', {
                amount: amount,
                currency: currency,
                destination: destination,
                to_address: to_address,
                trade_pwd: trade_pwd,
                fee: fee
            }, this.accessKey, this.passphrase, this.secretKey);
        }

        /**
         * @param {*} currency 
         * @returns
            currency	String	
            min_fee	number	
            max_fee	number	
         * @memberof RestWalletApi
         */

    }, {
        key: 'getWithdrawalFee',
        value: async function getWithdrawalFee(currency) {
            return await (0, _httpGet2.default)(this.url + '/api/account/v3/wallet', {
                currency: currency
            }, this.accessKey, this.passphrase, this.secretKey);
        }

        /**
         * @param {*} currency  
         * @returns
            currency	String	
            amount	number	
            timestamp	String	
            from	String	
            to	String	
            tag	String	
            payment_id	String	
            txid	String	
            fee	String	
            status	String	(-3: ถอนเงิน; -2: ถอนเงิน; -1: ล้มเหลว; 0: รอถอนเงิน; 1: ถอนเงินสด 2: นำส่ง; 3: ยืนยันอีเมล 3: ยืนยันอีเมล 4: ตรวจสอบด้วยตนเอง 5: รอการยืนยันตัวตน)
         * @memberof RestWalletApi
         */

    }, {
        key: 'getWithdrawalHistory',
        value: async function getWithdrawalHistory(currency) {
            return await (0, _httpGet2.default)(this.url + '/api/account/v3/withdrawal/history', {
                currency: currency
            }, this.accessKey, this.passphrase, this.secretKey);
        }

        /**
         * @param {*} type กรอกหมายเลขที่เกี่ยวข้อง: 1: เติมเงิน 2: ถอนเงิน 13: ยกเลิกการถอน 18: โอนไปยังบัญชีสัญญา 19: โอนบัญชีสัญญา 20: โอนบัญชีสัญญา 20: โอนไปยังบัญชีย่อย 21: โอนบัญชีย่อย 28: รับ 29: โอนไปยังพื้นที่ซื้อขายดัชนี 30: การถ่ายโอนพื้นที่การซื้อขายดัชนี 31: โอนไปยังบัญชีแบบจุดต่อจุด 32: การถ่ายโอนบัญชีแบบจุดต่อจุด 33: โอนไปยังบัญชีเงิน leverage 34: การโอนบัญชี leverage สกุล 37: โอนไปยังบัญชีสกุลเงิน 38: ไม่จำเป็นต้องโอนบัญชีสกุลเงิน
         * @param {*} currency 	
         * @param {*} limit 
         * @param {*} from 
         * @param {*} to 
         * @returns
         * @memberof RestWalletApi
         */

    }, {
        key: 'getLedger',
        value: async function getLedger(type, currency, from, to, limit) {
            return await (0, _httpGet2.default)(this.url + '/api/spot/v3/accounts/btc/ledger', {
                type: type,
                currency: currency,
                from: from,
                to: to,
                limit: limit
            }, this.accessKey, this.passphrase, this.secretKey);
        }

        /**
         * @param {*} currency btc
         * @returns
            address	String	
            tag	String	
            payment_id	String	
            currency	String	btc
         * @memberof RestWalletApi
         */

    }, {
        key: 'getDepositAddress',
        value: async function getDepositAddress(currency) {
            return await (0, _httpGet2.default)(this.url + '/api/account/v3/deposit/address', {
                currency: currency
            }, this.accessKey, this.passphrase, this.secretKey);
        }

        /**
         * @param {*} currency 	btc
         * @returns
            currency	String	btc
            amount	number	
            to	String	
            txid	String	
            timestamp	String	
            status	String	สถานะการถอน (0: รอการยืนยัน 1: ยืนยันบัญชี 2: สำเร็จ)
         * @memberof RestWalletApi
         */

    }, {
        key: 'getDepositHistory',
        value: async function getDepositHistory(currency) {
            return await (0, _httpGet2.default)(this.url + '/api/account/v3/deposit/history', {
                currency: currency
            }, this.accessKey, this.passphrase, this.secretKey);
        }
    }]);

    return RestWalletApi;
}(_RestCommonApi3.default);

exports.default = RestWalletApi;