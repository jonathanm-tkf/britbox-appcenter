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
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.BritboxSearchApi10) {
      root.BritboxSearchApi10 = {};
    }
    root.BritboxSearchApi10.MassiveSDKModelExclusionRule = factory(root.BritboxSearchApi10.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The MassiveSDKModelExclusionRule model module.
   * @module model/MassiveSDKModelExclusionRule
   * @version 1.0
   */

  /**
   * Constructs a new <code>MassiveSDKModelExclusionRule</code>.
   * @alias module:model/MassiveSDKModelExclusionRule
   * @class
   */
  var exports = function() {
    var _this = this;







  };

  /**
   * Constructs a <code>MassiveSDKModelExclusionRule</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MassiveSDKModelExclusionRule} obj Optional instance to populate.
   * @return {module:model/MassiveSDKModelExclusionRule} The populated <code>MassiveSDKModelExclusionRule</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('excludeDelivery')) {
        obj['excludeDelivery'] = ApiClient.convertToType(data['excludeDelivery'], 'String');
      }
      if (data.hasOwnProperty('excludeMinResolution')) {
        obj['excludeMinResolution'] = ApiClient.convertToType(data['excludeMinResolution'], 'String');
      }
      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
      if (data.hasOwnProperty('device')) {
        obj['device'] = ApiClient.convertToType(data['device'], 'String');
      }
      if (data.hasOwnProperty('excludeAirplay')) {
        obj['excludeAirplay'] = ApiClient.convertToType(data['excludeAirplay'], 'Boolean');
      }
      if (data.hasOwnProperty('excludeChromecast')) {
        obj['excludeChromecast'] = ApiClient.convertToType(data['excludeChromecast'], 'Boolean');
      }
    }
    return obj;
  }

  /**
   * @member {module:model/MassiveSDKModelExclusionRule.ExcludeDeliveryEnum} excludeDelivery
   */
  exports.prototype['excludeDelivery'] = undefined;
  /**
   * @member {module:model/MassiveSDKModelExclusionRule.ExcludeMinResolutionEnum} excludeMinResolution
   */
  exports.prototype['excludeMinResolution'] = undefined;
  /**
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * @member {String} device
   */
  exports.prototype['device'] = undefined;
  /**
   * @member {Boolean} excludeAirplay
   */
  exports.prototype['excludeAirplay'] = undefined;
  /**
   * @member {Boolean} excludeChromecast
   */
  exports.prototype['excludeChromecast'] = undefined;


  /**
   * Allowed values for the <code>excludeDelivery</code> property.
   * @enum {String}
   * @readonly
   */
  exports.ExcludeDeliveryEnum = {
    /**
     * value: "Stream"
     * @const
     */
    "Stream": "Stream",
    /**
     * value: "Download"
     * @const
     */
    "Download": "Download",
    /**
     * value: "StreamOrDownload"
     * @const
     */
    "StreamOrDownload": "StreamOrDownload",
    /**
     * value: "ProgressiveDownload"
     * @const
     */
    "ProgressiveDownload": "ProgressiveDownload",
    /**
     * value: "None"
     * @const
     */
    "None": "None"  };

  /**
   * Allowed values for the <code>excludeMinResolution</code> property.
   * @enum {String}
   * @readonly
   */
  exports.ExcludeMinResolutionEnum = {
    /**
     * value: "SD"
     * @const
     */
    "SD": "SD",
    /**
     * value: "HD-720"
     * @const
     */
    "HD-720": "HD-720",
    /**
     * value: "HD-1080"
     * @const
     */
    "HD-1080": "HD-1080",
    /**
     * value: "HD-4K"
     * @const
     */
    "HD-4K": "HD-4K",
    /**
     * value: "External"
     * @const
     */
    "External": "External",
    /**
     * value: "Unknown"
     * @const
     */
    "Unknown": "Unknown"  };


  return exports;
}));


