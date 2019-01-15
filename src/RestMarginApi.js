import httpGet from './common/httpGet'
import httpPost from './common/httpPost'
import RestCommonApi from './RestCommonApi'

export default class RestMarginApi extends RestCommonApi {
    constructor(url, accessKey, passphrase,secretKey) {
        super(url)
        this.url = url
        this.accessKey = accessKey
        this.passphrase = passphrase
        this.secretKey =secretKey
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
    async getAccounts() {
        return await httpGet(`${this.url}/api/margin/v3/accounts`, {}, this.accessKey, this.passphrase,this.secretKey)
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
    async postOrders(query) {
        if(query.side=='buy'){
            query.notional = query.size
            delete query.size
        }
        query.margin_trading=2
        return await httpPost(`${this.url}/api/margin/v3/orders`, query, this.accessKey, this.passphrase,this.secretKey)
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
    async getOrders(instrument_id, status, limit, from, to) {
        return await httpGet(`${this.url}/api/margin/v3/orders`, {
            instrument_id: instrument_id,
            status: status,
            limit: limit,
            // from: from,
            // to:to
        }, this.accessKey, this.passphrase,this.secretKey)
    }

    /**
     * @param {*} order_id  
     * @param {*} instrument_id string
     * @returns
     * @memberof RestMarginApi
     */
    async getOrdersById(order_id, instrument_id) {

        return await httpGet(`${this.url}/api/margin/v3/orders/${order_id}`, {
            instrument_id: instrument_id
        }, this.accessKey, this.passphrase,this.secretKey)
    }
}