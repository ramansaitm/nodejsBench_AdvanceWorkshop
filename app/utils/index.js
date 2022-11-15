/**
 * Created by AyushK on 18/09/20.
 */

"use strict";

import { apiFailureMessage, httpConstants } from "../common/constants";

export default class Utils {

  /**
   * This function is made to handle success and error callback!
   * @param promise
   * @returns {Promise<Promise|Bluebird<*[] | R>|Bluebird<any | R>|*|Promise<T | *[]>>}
   */
   static response (res, data, message, success, code) {
    const responseObj = {
      responseData: data,
      message: message,
      success: success,
      responseCode: code
    }
    res.format({
      json: () => {
        res.send(responseObj)
      }
    })
  }
  static handleError (err, req, res) {
    if (!res) { return false }
    err = err || {}
    const msg = err.message ? err.message : apiFailureMessage.INTERNAL_SERVER_ERROR
    const code = err.code ? err.code : httpConstants.RESPONSE_CODES.SERVER_ERROR
    this.response(res, {}, msg, httpConstants.RESPONSE_STATUS.FAILURE, code)
  }
  
  static async parseResponse(promise) {
    return promise
      .then((data) => {
        return [null, data];
      })
      .catch((err) => [err]);
  }

  static returnRejection(
    message = apiFailureMessage.INTERNAL_SERVER_ERROR,
    code = httpConstants.RESPONSE_CODES.SERVER_ERROR
  ) {
    return Promise.reject({ message, code });
  }

  static getFormattedDate() {
    const date = new Date();
    return (
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getDate() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds()
    );
  }
}
