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
    define(['ApiClient', 'model/MassiveSDKModelExclusionRule'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./MassiveSDKModelExclusionRule'));
  } else {
    // Browser globals (root is window)
    if (!root.BritboxSearchApi10) {
      root.BritboxSearchApi10 = {};
    }
    root.BritboxSearchApi10.MassiveSDKModelOffer = factory(root.BritboxSearchApi10.ApiClient, root.BritboxSearchApi10.MassiveSDKModelExclusionRule);
  }
}(this, function(ApiClient, MassiveSDKModelExclusionRule) {
  'use strict';




  /**
   * The MassiveSDKModelOffer model module.
   * @module model/MassiveSDKModelOffer
   * @version 1.0
   */

  /**
   * Constructs a new <code>MassiveSDKModelOffer</code>.
   * @alias module:model/MassiveSDKModelOffer
   * @class
   */
  var exports = function() {
    var _this = this;


















  };

  /**
   * Constructs a <code>MassiveSDKModelOffer</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MassiveSDKModelOffer} obj Optional instance to populate.
   * @return {module:model/MassiveSDKModelOffer} The populated <code>MassiveSDKModelOffer</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('deliveryType')) {
        obj['deliveryType'] = ApiClient.convertToType(data['deliveryType'], 'String');
      }
      if (data.hasOwnProperty('resolution')) {
        obj['resolution'] = ApiClient.convertToType(data['resolution'], 'String');
      }
      if (data.hasOwnProperty('ownership')) {
        obj['ownership'] = ApiClient.convertToType(data['ownership'], 'String');
      }
      if (data.hasOwnProperty('availability')) {
        obj['availability'] = ApiClient.convertToType(data['availability'], 'String');
      }
      if (data.hasOwnProperty('scopes')) {
        obj['scopes'] = ApiClient.convertToType(data['scopes'], ['String']);
      }
      if (data.hasOwnProperty('maxPlays')) {
        obj['maxPlays'] = ApiClient.convertToType(data['maxPlays'], 'Number');
      }
      if (data.hasOwnProperty('maxDownloads')) {
        obj['maxDownloads'] = ApiClient.convertToType(data['maxDownloads'], 'Number');
      }
      if (data.hasOwnProperty('rentalPeriod')) {
        obj['rentalPeriod'] = ApiClient.convertToType(data['rentalPeriod'], 'Number');
      }
      if (data.hasOwnProperty('playPeriod')) {
        obj['playPeriod'] = ApiClient.convertToType(data['playPeriod'], 'Number');
      }
      if (data.hasOwnProperty('exclusionRules')) {
        obj['exclusionRules'] = ApiClient.convertToType(data['exclusionRules'], [MassiveSDKModelExclusionRule]);
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('price')) {
        obj['price'] = ApiClient.convertToType(data['price'], 'Number');
      }
      if (data.hasOwnProperty('startDate')) {
        obj['startDate'] = ApiClient.convertToType(data['startDate'], 'Date');
      }
      if (data.hasOwnProperty('endDate')) {
        obj['endDate'] = ApiClient.convertToType(data['endDate'], 'Date');
      }
      if (data.hasOwnProperty('subscriptionCode')) {
        obj['subscriptionCode'] = ApiClient.convertToType(data['subscriptionCode'], 'String');
      }
      if (data.hasOwnProperty('customFields')) {
        obj['customFields'] = ApiClient.convertToType(data['customFields'], Object);
      }
    }
    return obj;
  }

  /**
   * @member {module:model/MassiveSDKModelOffer.DeliveryTypeEnum} deliveryType
   */
  exports.prototype['deliveryType'] = undefined;
  /**
   * @member {module:model/MassiveSDKModelOffer.ResolutionEnum} resolution
   */
  exports.prototype['resolution'] = undefined;
  /**
   * @member {module:model/MassiveSDKModelOffer.OwnershipEnum} ownership
   */
  exports.prototype['ownership'] = undefined;
  /**
   * @member {module:model/MassiveSDKModelOffer.AvailabilityEnum} availability
   */
  exports.prototype['availability'] = undefined;
  /**
   * @member {Array.<String>} scopes
   */
  exports.prototype['scopes'] = undefined;
  /**
   * @member {Number} maxPlays
   */
  exports.prototype['maxPlays'] = undefined;
  /**
   * @member {Number} maxDownloads
   */
  exports.prototype['maxDownloads'] = undefined;
  /**
   * @member {Number} rentalPeriod
   */
  exports.prototype['rentalPeriod'] = undefined;
  /**
   * @member {Number} playPeriod
   */
  exports.prototype['playPeriod'] = undefined;
  /**
   * @member {Array.<module:model/MassiveSDKModelExclusionRule>} exclusionRules
   */
  exports.prototype['exclusionRules'] = undefined;
  /**
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * @member {Number} price
   */
  exports.prototype['price'] = undefined;
  /**
   * @member {Date} startDate
   */
  exports.prototype['startDate'] = undefined;
  /**
   * @member {Date} endDate
   */
  exports.prototype['endDate'] = undefined;
  /**
   * @member {String} subscriptionCode
   */
  exports.prototype['subscriptionCode'] = undefined;
  /**
   * @member {Object} customFields
   */
  exports.prototype['customFields'] = undefined;


  /**
   * Allowed values for the <code>deliveryType</code> property.
   * @enum {String}
   * @readonly
   */
  exports.DeliveryTypeEnum = {
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
   * Allowed values for the <code>resolution</code> property.
   * @enum {String}
   * @readonly
   */
  exports.ResolutionEnum = {
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

  /**
   * Allowed values for the <code>ownership</code> property.
   * @enum {String}
   * @readonly
   */
  exports.OwnershipEnum = {
    /**
     * value: "Subscription"
     * @const
     */
    "Subscription": "Subscription",
    /**
     * value: "Free"
     * @const
     */
    "Free": "Free",
    /**
     * value: "Rent"
     * @const
     */
    "Rent": "Rent",
    /**
     * value: "Own"
     * @const
     */
    "Own": "Own",
    /**
     * value: "None"
     * @const
     */
    "None": "None"  };

  /**
   * Allowed values for the <code>availability</code> property.
   * @enum {String}
   * @readonly
   */
  exports.AvailabilityEnum = {
    /**
     * value: "Available"
     * @const
     */
    "Available": "Available",
    /**
     * value: "ComingSoon"
     * @const
     */
    "ComingSoon": "ComingSoon"  };


  return exports;
}));


