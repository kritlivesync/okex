import fetch from 'node-fetch';
import CryptoJS from 'crypto-js'
import log4js, { Logger } from 'log4js'
let loggger = log4js.getLogger()

/**
 * @export
 * @param {*} url 
 * @param {*} param 
 * @param {*} accessKey 
 * @param {*} passphrase 
 */
export default function httpDelete(url, param, accessKey, passphrase,secretKey){
    const jsonValue = JSON.stringify(param)
    const timestamp = new Date().toISOString()
    const dirUrl = url.replace(/.*\/\/[^\/]*/, '')
    let sign = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(timestamp + 'DELETE' + dirUrl + jsonValue, secretKey))
    let options = {
        method: 'delete',
        headers: {
            'OK-ACCESS-KEY': accessKey,
            'OK-ACCESS-SIGN': sign,
            'OK-ACCESS-TIMESTAMP': timestamp,
            'OK-ACCESS-PASSPHRASE': passphrase,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

    }
    loggger.debug(`httpDelete:${url} options:${JSON.stringify(options)}`)
    return fetch(url, options)
}