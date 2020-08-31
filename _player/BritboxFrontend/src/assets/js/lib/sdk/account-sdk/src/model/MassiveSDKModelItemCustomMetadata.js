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
    root.BritboxAccountApi10.MassiveSDKModelItemCustomMetadata = factory(root.BritboxAccountApi10.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The MassiveSDKModelItemCustomMetadata model module.
   * @module model/MassiveSDKModelItemCustomMetadata
   * @version 1.0
   */

  /**
   * Constructs a new <code>MassiveSDKModelItemCustomMetadata</code>.
   * @alias module:model/MassiveSDKModelItemCustomMetadata
   * @class
   */
  var exports = function() {
    var _this = this;



  };

  /**
   * Constructs a <code>MassiveSDKModelItemCustomMetadata</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MassiveSDKModelItemCustomMetadata} obj Optional instance to populate.
   * @return {module:model/MassiveSDKModelItemCustomMetadata} The populated <code>MassiveSDKModelItemCustomMetadata</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('value')) {
        obj['value'] = ApiClient.convertToType(data['value'], 'String');
      }
    }
    return obj;
  }

  /**
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * @member {String} value
   */
  exports.prototype['value'] = undefined;



  return exports;
}));


