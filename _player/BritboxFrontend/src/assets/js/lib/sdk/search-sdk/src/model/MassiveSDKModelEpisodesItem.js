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
    define(['ApiClient', 'model/MassiveSDKModelClassification', 'model/MassiveSDKModelMedia', 'model/MassiveSDKModelOffer'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./MassiveSDKModelClassification'), require('./MassiveSDKModelMedia'), require('./MassiveSDKModelOffer'));
  } else {
    // Browser globals (root is window)
    if (!root.BritboxSearchApi10) {
      root.BritboxSearchApi10 = {};
    }
    root.BritboxSearchApi10.MassiveSDKModelEpisodesItem = factory(root.BritboxSearchApi10.ApiClient, root.BritboxSearchApi10.MassiveSDKModelClassification, root.BritboxSearchApi10.MassiveSDKModelMedia, root.BritboxSearchApi10.MassiveSDKModelOffer);
  }
}(this, function(ApiClient, MassiveSDKModelClassification, MassiveSDKModelMedia, MassiveSDKModelOffer) {
  'use strict';




  /**
   * The MassiveSDKModelEpisodesItem model module.
   * @module model/MassiveSDKModelEpisodesItem
   * @version 1.0
   */

  /**
   * Constructs a new <code>MassiveSDKModelEpisodesItem</code>.
   * @alias module:model/MassiveSDKModelEpisodesItem
   * @class
   */
  var exports = function() {
    var _this = this;




























  };

  /**
   * Constructs a <code>MassiveSDKModelEpisodesItem</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MassiveSDKModelEpisodesItem} obj Optional instance to populate.
   * @return {module:model/MassiveSDKModelEpisodesItem} The populated <code>MassiveSDKModelEpisodesItem</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('images')) {
        obj['images'] = ApiClient.convertToType(data['images'], {'String': 'String'});
      }
      if (data.hasOwnProperty('duration')) {
        obj['duration'] = ApiClient.convertToType(data['duration'], 'Number');
      }
      if (data.hasOwnProperty('releaseYear')) {
        obj['releaseYear'] = ApiClient.convertToType(data['releaseYear'], 'Number');
      }
      if (data.hasOwnProperty('episodeNumber')) {
        obj['episodeNumber'] = ApiClient.convertToType(data['episodeNumber'], 'Number');
      }
      if (data.hasOwnProperty('episodeName')) {
        obj['episodeName'] = ApiClient.convertToType(data['episodeName'], 'String');
      }
      if (data.hasOwnProperty('seasonId')) {
        obj['seasonId'] = ApiClient.convertToType(data['seasonId'], 'String');
      }
      if (data.hasOwnProperty('showId')) {
        obj['showId'] = ApiClient.convertToType(data['showId'], 'String');
      }
      if (data.hasOwnProperty('offers')) {
        obj['offers'] = ApiClient.convertToType(data['offers'], [MassiveSDKModelOffer]);
      }
      if (data.hasOwnProperty('scopes')) {
        obj['scopes'] = ApiClient.convertToType(data['scopes'], ['String']);
      }
      if (data.hasOwnProperty('categories')) {
        obj['categories'] = ApiClient.convertToType(data['categories'], ['String']);
      }
      if (data.hasOwnProperty('customFields')) {
        obj['customFields'] = ApiClient.convertToType(data['customFields'], Object);
      }
      if (data.hasOwnProperty('customId')) {
        obj['customId'] = ApiClient.convertToType(data['customId'], 'String');
      }
      if (data.hasOwnProperty('genres')) {
        obj['genres'] = ApiClient.convertToType(data['genres'], ['String']);
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('type')) {
        obj['type'] = ApiClient.convertToType(data['type'], 'String');
      }
      if (data.hasOwnProperty('maximumOfferEnd')) {
        obj['maximumOfferEnd'] = ApiClient.convertToType(data['maximumOfferEnd'], 'Date');
      }
      if (data.hasOwnProperty('media')) {
        obj['media'] = ApiClient.convertToType(data['media'], [MassiveSDKModelMedia]);
      }
      if (data.hasOwnProperty('shortDescription')) {
        obj['shortDescription'] = ApiClient.convertToType(data['shortDescription'], 'String');
      }
      if (data.hasOwnProperty('contextualTitle')) {
        obj['contextualTitle'] = ApiClient.convertToType(data['contextualTitle'], 'String');
      }
      if (data.hasOwnProperty('title')) {
        obj['title'] = ApiClient.convertToType(data['title'], 'String');
      }
      if (data.hasOwnProperty('classification')) {
        obj['classification'] = MassiveSDKModelClassification.constructFromObject(data['classification']);
      }
      if (data.hasOwnProperty('totalUserRatings')) {
        obj['totalUserRatings'] = ApiClient.convertToType(data['totalUserRatings'], 'Number');
      }
      if (data.hasOwnProperty('path')) {
        obj['path'] = ApiClient.convertToType(data['path'], 'String');
      }
      if (data.hasOwnProperty('watchPath')) {
        obj['watchPath'] = ApiClient.convertToType(data['watchPath'], 'String');
      }
      if (data.hasOwnProperty('showTitle')) {
        obj['showTitle'] = ApiClient.convertToType(data['showTitle'], 'String');
      }
      if (data.hasOwnProperty('seasonTitle')) {
        obj['seasonTitle'] = ApiClient.convertToType(data['seasonTitle'], 'String');
      }
      if (data.hasOwnProperty('badge')) {
        obj['badge'] = ApiClient.convertToType(data['badge'], 'String');
      }
    }
    return obj;
  }

  /**
   * @member {Object.<String, String>} images
   */
  exports.prototype['images'] = undefined;
  /**
   * @member {Number} duration
   */
  exports.prototype['duration'] = undefined;
  /**
   * @member {Number} releaseYear
   */
  exports.prototype['releaseYear'] = undefined;
  /**
   * @member {Number} episodeNumber
   */
  exports.prototype['episodeNumber'] = undefined;
  /**
   * @member {String} episodeName
   */
  exports.prototype['episodeName'] = undefined;
  /**
   * @member {String} seasonId
   */
  exports.prototype['seasonId'] = undefined;
  /**
   * @member {String} showId
   */
  exports.prototype['showId'] = undefined;
  /**
   * @member {Array.<module:model/MassiveSDKModelOffer>} offers
   */
  exports.prototype['offers'] = undefined;
  /**
   * @member {Array.<String>} scopes
   */
  exports.prototype['scopes'] = undefined;
  /**
   * @member {Array.<String>} categories
   */
  exports.prototype['categories'] = undefined;
  /**
   * @member {Object} customFields
   */
  exports.prototype['customFields'] = undefined;
  /**
   * @member {String} customId
   */
  exports.prototype['customId'] = undefined;
  /**
   * @member {Array.<String>} genres
   */
  exports.prototype['genres'] = undefined;
  /**
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * @member {String} type
   */
  exports.prototype['type'] = undefined;
  /**
   * @member {Date} maximumOfferEnd
   */
  exports.prototype['maximumOfferEnd'] = undefined;
  /**
   * @member {Array.<module:model/MassiveSDKModelMedia>} media
   */
  exports.prototype['media'] = undefined;
  /**
   * @member {String} shortDescription
   */
  exports.prototype['shortDescription'] = undefined;
  /**
   * @member {String} contextualTitle
   */
  exports.prototype['contextualTitle'] = undefined;
  /**
   * @member {String} title
   */
  exports.prototype['title'] = undefined;
  /**
   * @member {module:model/MassiveSDKModelClassification} classification
   */
  exports.prototype['classification'] = undefined;
  /**
   * @member {Number} totalUserRatings
   */
  exports.prototype['totalUserRatings'] = undefined;
  /**
   * @member {String} path
   */
  exports.prototype['path'] = undefined;
  /**
   * @member {String} watchPath
   */
  exports.prototype['watchPath'] = undefined;
  /**
   * @member {String} showTitle
   */
  exports.prototype['showTitle'] = undefined;
  /**
   * @member {String} seasonTitle
   */
  exports.prototype['seasonTitle'] = undefined;
  /**
   * @member {String} badge
   */
  exports.prototype['badge'] = undefined;



  return exports;
}));


