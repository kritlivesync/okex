import httpGet from './common/httpGet'
import httpPost from './common/httpPost'
import RestCommonApi from './RestCommonApi'

/**
 * @class RestWalletApi
 */
export default class RestWalletApi extends RestCommonApi {
    constructor(url, accessKey, passphrase,secretKey) {
        super(url)
        this.url = url
        this.accessKey = accessKey
        this.passphrase = passphrase
        this.secretKey =secretKey
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
    async getCurrencies() {
        return await httpGet(`${this.url}/api/account/v3/currencies`, {}, this.accessKey, this.passphrase,this.secretKey)
    }

    /**
     * @returns 
        currency	String	btc
        balance	number
        hold	number
        available	number
     * @memberof RestWalletApi
     */
    async getWallet() {
        return await httpGet(`${this.url}/api/account/v3/wallet`, {}, this.accessKey, this.passphrase,this.secretKey)
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
    async getWalletByCurrency(currency) {
        return await httpGet(`${this.url}/api/account/v3/wallet/${currency}`, {}, this.accessKey, this.passphrase,this.secretKey)
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
    async postTransfer(amount, currency, from, to, instrument_id) {

        return await httpPost(`${this.url}/api/account/v3/transfer`, {
            amount: amount,
            currency: currency,
            from: from,
            to: to,
            instrument_id: instrument_id
        }, this.accessKey, this.passphrase,this.secretKey)
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
    async postWithdrawal(currency, amount, destination, to_address, trade_pwd, fee) {

        return await httpPost(`${this.url}/api/account/v3/withdrawal`, {
            amount: amount,
            currency: currency,
            destination: destination,
            to_address: to_address,
            trade_pwd: trade_pwd,
            fee: fee
        }, this.accessKey, this.passphrase,this.secretKey)
    }

    /**
     * @param {*} currency 
     * @returns
        currency	String	
        min_fee	number	
        max_fee	number	
     * @memberof RestWalletApi
     */
    async getWithdrawalFee(currency) {
        return await httpGet(`${this.url}/api/account/v3/wallet`, {
            currency:currency
        }, this.accessKey, this.passphrase,this.secretKey)
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
    async getWithdrawalHistory(currency) {
        return await httpGet(`${this.url}/api/account/v3/withdrawal/history`, {
            currency:currency
        }, this.accessKey, this.passphrase,this.secretKey)
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
    async getLedger(type, currency, from, to, limit) {
        return await httpGet(`${this.url}/api/spot/v3/accounts/btc/ledger`, {
            type:type,
            currency:currency,
            from:from,
            to:to,
            limit:limit
        }, this.accessKey, this.passphrase,this.secretKey)
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
    async getDepositAddress(currency) {
        return await httpGet(`${this.url}/api/account/v3/deposit/address`, {
            currency:currency
        }, this.accessKey, this.passphrase,this.secretKey)
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
    async getDepositHistory(currency) {
        return await httpGet(`${this.url}/api/account/v3/deposit/history`, {
            currency:currency
        }, this.accessKey, this.passphrase,this.secretKey)
    }
}