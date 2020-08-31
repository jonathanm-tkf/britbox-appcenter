/**
 * BRITBOX CONTENT API - 1.0
 * BRITBOX CONTENT API
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
    define(['ApiClient', 'model/MassiveSDKModelCredit', 'model/MassiveSDKModelOffer', 'model/MassiveSDKModelSeasons'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./MassiveSDKModelCredit'), require('./MassiveSDKModelOffer'), require('./MassiveSDKModelSeasons'));
  } else {
    // Browser globals (root is window)
    if (!root.BritboxContentApi10) {
      root.BritboxContentApi10 = {};
    }
    root.BritboxContentApi10.MassiveSDKModelShow = factory(root.BritboxContentApi10.ApiClient, root.BritboxContentApi10.MassiveSDKModelCredit, root.BritboxContentApi10.MassiveSDKModelOffer, root.BritboxContentApi10.MassiveSDKModelSeasons);
  }
}(this, function(ApiClient, MassiveSDKModelCredit, MassiveSDKModelOffer, MassiveSDKModelSeasons) {
  'use strict';




  /**
   * The MassiveSDKModelShow model module.
   * @module model/MassiveSDKModelShow
   * @version 1.0
   */

  /**
   * Constructs a new <code>MassiveSDKModelShow</code>.
   * @alias module:model/MassiveSDKModelShow
   * @class
   */
  var exports = function() {
    var _this = this;




























  };

  /**
   * Constructs a <code>MassiveSDKModelShow</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MassiveSDKModelShow} obj Optional instance to populate.
   * @return {module:model/MassiveSDKModelShow} The populated <code>MassiveSDKModelShow</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('images')) {
        obj['images'] = ApiClient.convertToType(data['images'], {'String': 'String'});
      }
      if (data.hasOwnProperty('advisoryText')) {
        obj['advisoryText'] = ApiClient.convertToType(data['advisoryText'], 'String');
      }
      if (data.hasOwnProperty('copyright')) {
        obj['copyright'] = ApiClient.convertToType(data['copyright'], 'String');
      }
      if (data.hasOwnProperty('credits')) {
        obj['credits'] = ApiClient.convertToType(data['credits'], [MassiveSDKModelCredit]);
      }
      if (data.hasOwnProperty('customMetadata')) {
        obj['customMetadata'] = ApiClient.convertToType(data['customMetadata'], [Object]);
      }
      if (data.hasOwnProperty('distributor')) {
        obj['distributor'] = ApiClient.convertToType(data['distributor'], 'String');
      }
      if (data.hasOwnProperty('availableSeasonCount')) {
        obj['availableSeasonCount'] = ApiClient.convertToType(data['availableSeasonCount'], 'Number');
      }
      if (data.hasOwnProperty('offers')) {
        obj['offers'] = ApiClient.convertToType(data['offers'], [MassiveSDKModelOffer]);
      }
      if (data.hasOwnProperty('trailers')) {
        obj['trailers'] = ApiClient.convertToType(data['trailers'], [Object]);
      }
      if (data.hasOwnProperty('vams')) {
        obj['vams'] = ApiClient.convertToType(data['vams'], [Object]);
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
      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
      if (data.hasOwnProperty('maximumOfferEnd')) {
        obj['maximumOfferEnd'] = ApiClient.convertToType(data['maximumOfferEnd'], 'Date');
      }
      if (data.hasOwnProperty('shortDescription')) {
        obj['shortDescription'] = ApiClient.convertToType(data['shortDescription'], 'String');
      }
      if (data.hasOwnProperty('contextualTitle')) {
        obj['contextualTitle'] = ApiClient.convertToType(data['contextualTitle'], 'String');
      }
      if (data.hasOwnProperty('themes')) {
        obj['themes'] = ApiClient.convertToType(data['themes'], [Object]);
      }
      if (data.hasOwnProperty('title')) {
        obj['title'] = ApiClient.convertToType(data['title'], 'String');
      }
      if (data.hasOwnProperty('totalUserRatings')) {
        obj['totalUserRatings'] = ApiClient.convertToType(data['totalUserRatings'], 'Number');
      }
      if (data.hasOwnProperty('path')) {
        obj['path'] = ApiClient.convertToType(data['path'], 'String');
      }
      if (data.hasOwnProperty('genrePaths')) {
        obj['genrePaths'] = ApiClient.convertToType(data['genrePaths'], ['String']);
      }
      if (data.hasOwnProperty('seasons')) {
        obj['seasons'] = MassiveSDKModelSeasons.constructFromObject(data['seasons']);
      }
    }
    return obj;
  }

  /**
   * @member {Object.<String, String>} images
   */
  exports.prototype['images'] = undefined;
  /**
   * @member {String} advisoryText
   */
  exports.prototype['advisoryText'] = undefined;
  /**
   * @member {String} copyright
   */
  exports.prototype['copyright'] = undefined;
  /**
   * @member {Array.<module:model/MassiveSDKModelCredit>} credits
   */
  exports.prototype['credits'] = undefined;
  /**
   * @member {Array.<Object>} customMetadata
   */
  exports.prototype['customMetadata'] = undefined;
  /**
   * @member {String} distributor
   */
  exports.prototype['distributor'] = undefined;
  /**
   * @member {Number} availableSeasonCount
   */
  exports.prototype['availableSeasonCount'] = undefined;
  /**
   * @member {Array.<module:model/MassiveSDKModelOffer>} offers
   */
  exports.prototype['offers'] = undefined;
  /**
   * @member {Array.<Object>} trailers
   */
  exports.prototype['trailers'] = undefined;
  /**
   * @member {Array.<Object>} vams
   */
  exports.prototype['vams'] = undefined;
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
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * @member {Date} maximumOfferEnd
   */
  exports.prototype['maximumOfferEnd'] = undefined;
  /**
   * @member {String} shortDescription
   */
  exports.prototype['shortDescription'] = undefined;
  /**
   * @member {String} contextualTitle
   */
  exports.prototype['contextualTitle'] = undefined;
  /**
   * @member {Array.<Object>} themes
   */
  exports.prototype['themes'] = undefined;
  /**
   * @member {String} title
   */
  exports.prototype['title'] = undefined;
  /**
   * @member {Number} totalUserRatings
   */
  exports.prototype['totalUserRatings'] = undefined;
  /**
   * @member {String} path
   */
  exports.prototype['path'] = undefined;
  /**
   * @member {Array.<String>} genrePaths
   */
  exports.prototype['genrePaths'] = undefined;
  /**
   * @member {module:model/MassiveSDKModelSeasons} seasons
   */
  exports.prototype['seasons'] = undefined;



  return exports;
}));


