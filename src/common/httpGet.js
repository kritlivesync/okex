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
export default function httpGet(url, param,accessKey,passphrase,secretKey) {
    let paramKeys = Object.keys(param)
    Object.keys(param).map((item,index)=>{
        if (index === 0) {
            url += `?${paramKeys[index]}=${param[paramKeys[index]]}`
        }else{
            url += `&${paramKeys[index]}=${param[paramKeys[index]]}`
        }
    })

    const timestamp = new Date().toISOString()
    const dirUrl = url.replace(/.*\/\/[^\/]*/, '')
    let sign = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(timestamp + 'GET' + dirUrl, secretKey))
    let options = {
        method: 'get',
        headers: {
            'OK-ACCESS-KEY': accessKey,
            'OK-ACCESS-SIGN': sign,
            'OK-ACCESS-TIMESTAMP': timestamp,
            'OK-ACCESS-PASSPHRASE': passphrase,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

    }

    loggger.debug(`httpGet:${url} options:${JSON.stringify(options)}`)
    return fetch(url, options)
}