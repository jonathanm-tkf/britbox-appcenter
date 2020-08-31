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
    root.BritboxAccountApi10.MassiveSDKModelWatched = factory(root.BritboxAccountApi10.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The MassiveSDKModelWatched model module.
   * @module model/MassiveSDKModelWatched
   * @version 1.0
   */

  /**
   * Constructs a new <code>MassiveSDKModelWatched</code>.
   * @alias module:model/MassiveSDKModelWatched
   * @class
   */
  var exports = function() {
    var _this = this;






  };

  /**
   * Constructs a <code>MassiveSDKModelWatched</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MassiveSDKModelWatched} obj Optional instance to populate.
   * @return {module:model/MassiveSDKModelWatched} The populated <code>MassiveSDKModelWatched</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('itemId')) {
        obj['itemId'] = ApiClient.convertToType(data['itemId'], 'String');
      }
      if (data.hasOwnProperty('position')) {
        obj['position'] = ApiClient.convertToType(data['position'], 'Number');
      }
      if (data.hasOwnProperty('firstWatchedDate')) {
        obj['firstWatchedDate'] = ApiClient.convertToType(data['firstWatchedDate'], 'Date');
      }
      if (data.hasOwnProperty('lastWatchedDate')) {
        obj['lastWatchedDate'] = ApiClient.convertToType(data['lastWatchedDate'], 'Date');
      }
      if (data.hasOwnProperty('isFullyWatched')) {
        obj['isFullyWatched'] = ApiClient.convertToType(data['isFullyWatched'], 'Boolean');
      }
    }
    return obj;
  }

  /**
   * @member {String} itemId
   */
  exports.prototype['itemId'] = undefined;
  /**
   * @member {Number} position
   */
  exports.prototype['position'] = undefined;
  /**
   * @member {Date} firstWatchedDate
   */
  exports.prototype['firstWatchedDate'] = undefined;
  /**
   * @member {Date} lastWatchedDate
   */
  exports.prototype['lastWatchedDate'] = undefined;
  /**
   * @member {Boolean} isFullyWatched
   */
  exports.prototype['isFullyWatched'] = undefined;



  return exports;
}));


