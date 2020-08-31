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
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.BritboxAccountApi10) {
      root.BritboxAccountApi10 = {};
    }
    root.BritboxAccountApi10.BritboxDataEvergentModelsDeviceDetails = factory(root.BritboxAccountApi10.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The BritboxDataEvergentModelsDeviceDetails model module.
   * @module model/BritboxDataEvergentModelsDeviceDetails
   * @version 1.0
   */

  /**
   * Constructs a new <code>BritboxDataEvergentModelsDeviceDetails</code>.
   * @alias module:model/BritboxDataEvergentModelsDeviceDetails
   * @class
   */
  var exports = function() {
    var _this = this;






  };

  /**
   * Constructs a <code>BritboxDataEvergentModelsDeviceDetails</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/BritboxDataEvergentModelsDeviceDetails} obj Optional instance to populate.
   * @return {module:model/BritboxDataEvergentModelsDeviceDetails} The populated <code>BritboxDataEvergentModelsDeviceDetails</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('serialNo')) {
        obj['serialNo'] = ApiClient.convertToType(data['serialNo'], 'String');
      }
      if (data.hasOwnProperty('deviceType')) {
        obj['deviceType'] = ApiClient.convertToType(data['deviceType'], 'String');
      }
      if (data.hasOwnProperty('deviceName')) {
        obj['deviceName'] = ApiClient.convertToType(data['deviceName'], 'String');
      }
      if (data.hasOwnProperty('modelNo')) {
        obj['modelNo'] = ApiClient.convertToType(data['modelNo'], 'String');
      }
      if (data.hasOwnProperty('brand')) {
        obj['brand'] = ApiClient.convertToType(data['brand'], 'String');
      }
    }
    return obj;
  }

  /**
   * @member {String} serialNo
   */
  exports.prototype['serialNo'] = undefined;
  /**
   * @member {String} deviceType
   */
  exports.prototype['deviceType'] = undefined;
  /**
   * @member {String} deviceName
   */
  exports.prototype['deviceName'] = undefined;
  /**
   * @member {String} modelNo
   */
  exports.prototype['modelNo'] = undefined;
  /**
   * @member {String} brand
   */
  exports.prototype['brand'] = undefined;



  return exports;
}));


