/**
 * BRITBOX SEARCH API - 1.0
 * BRITBOX SEARCH API
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
    define(['ApiClient', 'model/MassiveSDKModelContinueWatchingListDataExpansion'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./MassiveSDKModelContinueWatchingListDataExpansion'));
  } else {
    // Browser globals (root is window)
    if (!root.BritboxSearchApi10) {
      root.BritboxSearchApi10 = {};
    }
    root.BritboxSearchApi10.MassiveSDKModelContinueWatchingListData = factory(root.BritboxSearchApi10.ApiClient, root.BritboxSearchApi10.MassiveSDKModelContinueWatchingListDataExpansion);
  }
}(this, function(ApiClient, MassiveSDKModelContinueWatchingListDataExpansion) {
  'use strict';




  /**
   * The MassiveSDKModelContinueWatchingListData model module.
   * @module model/MassiveSDKModelContinueWatchingListData
   * @version 1.0
   */

  /**
   * Constructs a new <code>MassiveSDKModelContinueWatchingListData</code>.
   * @alias module:model/MassiveSDKModelContinueWatchingListData
   * @class
   */
  var exports = function() {
    var _this = this;


  };

  /**
   * Constructs a <code>MassiveSDKModelContinueWatchingListData</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MassiveSDKModelContinueWatchingListData} obj Optional instance to populate.
   * @return {module:model/MassiveSDKModelContinueWatchingListData} The populated <code>MassiveSDKModelContinueWatchingListData</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('itemInclusions')) {
        obj['itemInclusions'] = ApiClient.convertToType(data['itemInclusions'], {'String': MassiveSDKModelContinueWatchingListDataExpansion});
      }
    }
    return obj;
  }

  /**
   * @member {Object.<String, module:model/MassiveSDKModelContinueWatchingListDataExpansion>} itemInclusions
   */
  exports.prototype['itemInclusions'] = undefined;



  return exports;
}));


