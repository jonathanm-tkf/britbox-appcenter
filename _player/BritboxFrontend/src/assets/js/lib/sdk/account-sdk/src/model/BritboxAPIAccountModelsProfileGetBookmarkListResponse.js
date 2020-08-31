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
    define(['ApiClient', 'model/MassiveSDKModelItemList'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./MassiveSDKModelItemList'));
  } else {
    // Browser globals (root is window)
    if (!root.BritboxAccountApi10) {
      root.BritboxAccountApi10 = {};
    }
    root.BritboxAccountApi10.BritboxAPIAccountModelsProfileGetBookmarkListResponse = factory(root.BritboxAccountApi10.ApiClient, root.BritboxAccountApi10.MassiveSDKModelItemList);
  }
}(this, function(ApiClient, MassiveSDKModelItemList) {
  'use strict';




  /**
   * The BritboxAPIAccountModelsProfileGetBookmarkListResponse model module.
   * @module model/BritboxAPIAccountModelsProfileGetBookmarkListResponse
   * @version 1.0
   */

  /**
   * Constructs a new <code>BritboxAPIAccountModelsProfileGetBookmarkListResponse</code>.
   * @alias module:model/BritboxAPIAccountModelsProfileGetBookmarkListResponse
   * @class
   */
  var exports = function() {
    var _this = this;




  };

  /**
   * Constructs a <code>BritboxAPIAccountModelsProfileGetBookmarkListResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/BritboxAPIAccountModelsProfileGetBookmarkListResponse} obj Optional instance to populate.
   * @return {module:model/BritboxAPIAccountModelsProfileGetBookmarkListResponse} The populated <code>BritboxAPIAccountModelsProfileGetBookmarkListResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('externalResponse')) {
        obj['externalResponse'] = MassiveSDKModelItemList.constructFromObject(data['externalResponse']);
      }
      if (data.hasOwnProperty('errors')) {
        obj['errors'] = ApiClient.convertToType(data['errors'], ['String']);
      }
      if (data.hasOwnProperty('messages')) {
        obj['messages'] = ApiClient.convertToType(data['messages'], ['String']);
      }
    }
    return obj;
  }

  /**
   * @member {module:model/MassiveSDKModelItemList} externalResponse
   */
  exports.prototype['externalResponse'] = undefined;
  /**
   * @member {Array.<String>} errors
   */
  exports.prototype['errors'] = undefined;
  /**
   * @member {Array.<String>} messages
   */
  exports.prototype['messages'] = undefined;



  return exports;
}));


