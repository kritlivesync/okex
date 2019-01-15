
import httpGet from './common/httpGet'
import httpPost from './common/httpPost'
import RestCommonApi from './RestCommonApi'

/**
 * @export
 * @class RestSpotApi
 */
export default class RestSpotApi extends RestCommonApi {
    constructor(url, accessKey, passphrase,secretKey) {
        super(url)
        this.url = url
        this.accessKey = accessKey
        this.passphrase = passphrase
        this.secretKey =secretKey
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
    async getAccounts(currency) {
        if (currency != undefined)
            return await httpGet(`${this.url}/api/spot/v3/accounts/${currency}`, {}, this.accessKey, this.passphrase,this.secretKey)
        else
            return await httpGet(`${this.url}/api/spot/v3/accounts`, {}, this.accessKey, this.passphrase,this.secretKey)
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
    async postOrders(query) {

        if(query.side=='buy'){
            query.notional = query.size
            delete query.size
        }
        query.margin_trading=1

        return await httpPost(`${this.url}/api/spot/v3/orders`, query, this.accessKey, this.passphrase,this.secretKey)
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
    async getOrders(instrument_id, status, limit, from, to) {

        return await httpGet(`${this.url}/api/spot/v3/orders`, {
            instrument_id: instrument_id,
            status: status,
            limit: limit,
            // from: from,
            // to: to
        }, this.accessKey, this.passphrase,this.secretKey)
    }

    /**
     * @param {*} order_id
     * @param {*} instrument_id
     * @returns
     * @memberof RestSpotApi
     */
    async getOrdersById(order_id, instrument_id) {
        return  await httpGet(`${this.url}/api/spot/v3/orders/${order_id}`, {
            instrument_id: instrument_id
        }, this.accessKey, this.passphrase,this.secretKey)
    }

}