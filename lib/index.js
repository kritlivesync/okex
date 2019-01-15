'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RestWalletApi = exports.RestSpotApi = exports.RestMarginApi = undefined;

var _RestMarginApi = require('./RestMarginApi');

var _RestMarginApi2 = _interopRequireDefault(_RestMarginApi);

var _RestSpotApi = require('./RestSpotApi');

var _RestSpotApi2 = _interopRequireDefault(_RestSpotApi);

var _RestWalletApi = require('./RestWalletApi');

var _RestWalletApi2 = _interopRequireDefault(_RestWalletApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.RestMarginApi = _RestMarginApi2.default;
exports.RestSpotApi = _RestSpotApi2.default;
exports.RestWalletApi = _RestWalletApi2.default;