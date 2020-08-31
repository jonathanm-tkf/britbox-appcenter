/**
 * BRITBOX ACCOUNT API - 1.0
 * BRITBOX ACCOUNT API
 *
 * OpenAPI spec version: 1.0
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/BritboxDataEvergentModelsFailureMessage'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./BritboxDataEvergentModelsFailureMessage'));
  } else {
    // Browser globals (root is window)
    if (!root.BritboxAccountApi10) {
      root.BritboxAccountApi10 = {};
    }
    root.BritboxAccountApi10.BritboxDataEvergentModelsUpdateProfileResponseMessageBaseResponse = factory(root.BritboxAccountApi10.ApiClient, root.BritboxAccountApi10.BritboxDataEvergentModelsFailureMessage);
  }
}(this, function(ApiClient, BritboxDataEvergentModelsFailureMessage) {
  'use strict';




  /**
   * The BritboxDataEvergentModelsUpdateProfileResponseMessageBaseResponse model module.
   * @module model/BritboxDataEvergentModelsUpdateProfileResponseMessageBaseResponse
   * @version 1.0
   */

  /**
   * Constructs a new <code>BritboxDataEvergentModelsUpdateProfileResponseMessageBaseResponse</code>.
   * @alias module:model/BritboxDataEvergentModelsUpdateProfileResponseMessageBaseResponse
   * @class
   */
  var exports = function() {
    var _this = this;





  };

  /**
   * Constructs a <code>BritboxDataEvergentModelsUpdateProfileResponseMessageBaseResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/BritboxDataEvergentModelsUpdateProfileResponseMessageBaseResponse} obj Optional instance to populate.
   * @return {module:model/BritboxDataEvergentModelsUpdateProfileResponseMessageBaseResponse} The populated <code>BritboxDataEvergentModelsUpdateProfileResponseMessageBaseResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('message')) {
        obj['message'] = ApiClient.convertToType(data['message'], 'String');
      }
      if (data.hasOwnProperty('responseCode')) {
        obj['responseCode'] = ApiClient.convertToType(data['responseCode'], 'String');
      }
      if (data.hasOwnProperty('status')) {
        obj['status'] = ApiClient.convertToType(data['status'], 'String');
      }
      if (data.hasOwnProperty('failureMessage')) {
        obj['failureMessage'] = ApiClient.convertToType(data['failureMessage'], [BritboxDataEvergentModelsFailureMessage]);
      }
    }
    return obj;
  }

  /**
   * @member {String} message
   */
  exports.prototype['message'] = undefined;
  /**
   * @member {String} responseCode
   */
  exports.prototype['responseCode'] = undefined;
  /**
   * @member {String} status
   */
  exports.prototype['status'] = undefined;
  /**
   * @member {Array.<module:model/BritboxDataEvergentModelsFailureMessage>} failureMessage
   */
  exports.prototype['failureMessage'] = undefined;



  return exports;
}));


