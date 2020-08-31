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
    define(['ApiClient', 'model/MassiveSDKModelClassificationSummary', 'model/MassiveSDKModelCredit', 'model/MassiveSDKModelItemCustomMetadata', 'model/MassiveSDKModelItemDetail', 'model/MassiveSDKModelItemList', 'model/MassiveSDKModelItemSummary', 'model/MassiveSDKModelOffer', 'model/MassiveSDKModelTheme'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./MassiveSDKModelClassificationSummary'), require('./MassiveSDKModelCredit'), require('./MassiveSDKModelItemCustomMetadata'), require('./MassiveSDKModelItemDetail'), require('./MassiveSDKModelItemList'), require('./MassiveSDKModelItemSummary'), require('./MassiveSDKModelOffer'), require('./MassiveSDKModelTheme'));
  } else {
    // Browser globals (root is window)
    if (!root.BritboxAccountApi10) {
      root.BritboxAccountApi10 = {};
    }
    root.BritboxAccountApi10.MassiveSDKModelItemDetail = factory(root.BritboxAccountApi10.ApiClient, root.BritboxAccountApi10.MassiveSDKModelClassificationSummary, root.BritboxAccountApi10.MassiveSDKModelCredit, root.BritboxAccountApi10.MassiveSDKModelItemCustomMetadata, root.BritboxAccountApi10.MassiveSDKModelItemDetail, root.BritboxAccountApi10.MassiveSDKModelItemList, root.BritboxAccountApi10.MassiveSDKModelItemSummary, root.BritboxAccountApi10.MassiveSDKModelOffer, root.BritboxAccountApi10.MassiveSDKModelTheme);
  }
}(this, function(ApiClient, MassiveSDKModelClassificationSummary, MassiveSDKModelCredit, MassiveSDKModelItemCustomMetadata, MassiveSDKModelItemDetail, MassiveSDKModelItemList, MassiveSDKModelItemSummary, MassiveSDKModelOffer, MassiveSDKModelTheme) {
  'use strict';




  /**
   * The MassiveSDKModelItemDetail model module.
   * @module model/MassiveSDKModelItemDetail
   * @version 1.0
   */

  /**
   * Constructs a new <code>MassiveSDKModelItemDetail</code>.
   * @alias module:model/MassiveSDKModelItemDetail
   * @class
   */
  var exports = function() {
    var _this = this;



















































  };

  /**
   * Constructs a <code>MassiveSDKModelItemDetail</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MassiveSDKModelItemDetail} obj Optional instance to populate.
   * @return {module:model/MassiveSDKModelItemDetail} The populated <code>MassiveSDKModelItemDetail</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('advisoryText')) {
        obj['advisoryText'] = ApiClient.convertToType(data['advisoryText'], 'String');
      }
      if (data.hasOwnProperty('copyright')) {
        obj['copyright'] = ApiClient.convertToType(data['copyright'], 'String');
      }
      if (data.hasOwnProperty('distributor')) {
        obj['distributor'] = ApiClient.convertToType(data['distributor'], 'String');
      }
      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
      if (data.hasOwnProperty('customMetadata')) {
        obj['customMetadata'] = ApiClient.convertToType(data['customMetadata'], [MassiveSDKModelItemCustomMetadata]);
      }
      if (data.hasOwnProperty('genrePaths')) {
        obj['genrePaths'] = ApiClient.convertToType(data['genrePaths'], ['String']);
      }
      if (data.hasOwnProperty('location')) {
        obj['location'] = ApiClient.convertToType(data['location'], 'String');
      }
      if (data.hasOwnProperty('venue')) {
        obj['venue'] = ApiClient.convertToType(data['venue'], 'String');
      }
      if (data.hasOwnProperty('eventDate')) {
        obj['eventDate'] = ApiClient.convertToType(data['eventDate'], 'Date');
      }
      if (data.hasOwnProperty('credits')) {
        obj['credits'] = ApiClient.convertToType(data['credits'], [MassiveSDKModelCredit]);
      }
      if (data.hasOwnProperty('seasons')) {
        obj['seasons'] = MassiveSDKModelItemList.constructFromObject(data['seasons']);
      }
      if (data.hasOwnProperty('episodes')) {
        obj['episodes'] = MassiveSDKModelItemList.constructFromObject(data['episodes']);
      }
      if (data.hasOwnProperty('season')) {
        obj['season'] = MassiveSDKModelItemDetail.constructFromObject(data['season']);
      }
      if (data.hasOwnProperty('show')) {
        obj['show'] = MassiveSDKModelItemDetail.constructFromObject(data['show']);
      }
      if (data.hasOwnProperty('totalUserRatings')) {
        obj['totalUserRatings'] = ApiClient.convertToType(data['totalUserRatings'], 'Number');
      }
      if (data.hasOwnProperty('trailers')) {
        obj['trailers'] = ApiClient.convertToType(data['trailers'], [MassiveSDKModelItemSummary]);
      }
      if (data.hasOwnProperty('type')) {
        obj['type'] = ApiClient.convertToType(data['type'], 'String');
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('subtype')) {
        obj['subtype'] = ApiClient.convertToType(data['subtype'], 'String');
      }
      if (data.hasOwnProperty('title')) {
        obj['title'] = ApiClient.convertToType(data['title'], 'String');
      }
      if (data.hasOwnProperty('contextualTitle')) {
        obj['contextualTitle'] = ApiClient.convertToType(data['contextualTitle'], 'String');
      }
      if (data.hasOwnProperty('shortDescription')) {
        obj['shortDescription'] = ApiClient.convertToType(data['shortDescription'], 'String');
      }
      if (data.hasOwnProperty('tagline')) {
        obj['tagline'] = ApiClient.convertToType(data['tagline'], 'String');
      }
      if (data.hasOwnProperty('classification')) {
        obj['classification'] = MassiveSDKModelClassificationSummary.constructFromObject(data['classification']);
      }
      if (data.hasOwnProperty('path')) {
        obj['path'] = ApiClient.convertToType(data['path'], 'String');
      }
      if (data.hasOwnProperty('watchPath')) {
        obj['watchPath'] = ApiClient.convertToType(data['watchPath'], 'String');
      }
      if (data.hasOwnProperty('scopes')) {
        obj['scopes'] = ApiClient.convertToType(data['scopes'], ['String']);
      }
      if (data.hasOwnProperty('releaseYear')) {
        obj['releaseYear'] = ApiClient.convertToType(data['releaseYear'], 'Number');
      }
      if (data.hasOwnProperty('episodeCount')) {
        obj['episodeCount'] = ApiClient.convertToType(data['episodeCount'], 'Number');
      }
      if (data.hasOwnProperty('availableEpisodeCount')) {
        obj['availableEpisodeCount'] = ApiClient.convertToType(data['availableEpisodeCount'], 'Number');
      }
      if (data.hasOwnProperty('availableSeasonCount')) {
        obj['availableSeasonCount'] = ApiClient.convertToType(data['availableSeasonCount'], 'Number');
      }
      if (data.hasOwnProperty('seasonNumber')) {
        obj['seasonNumber'] = ApiClient.convertToType(data['seasonNumber'], 'Number');
      }
      if (data.hasOwnProperty('episodeNumber')) {
        obj['episodeNumber'] = ApiClient.convertToType(data['episodeNumber'], 'Number');
      }
      if (data.hasOwnProperty('episodeName')) {
        obj['episodeName'] = ApiClient.convertToType(data['episodeName'], 'String');
      }
      if (data.hasOwnProperty('showId')) {
        obj['showId'] = ApiClient.convertToType(data['showId'], 'String');
      }
      if (data.hasOwnProperty('showTitle')) {
        obj['showTitle'] = ApiClient.convertToType(data['showTitle'], 'String');
      }
      if (data.hasOwnProperty('seasonId')) {
        obj['seasonId'] = ApiClient.convertToType(data['seasonId'], 'String');
      }
      if (data.hasOwnProperty('seasonTitle')) {
        obj['seasonTitle'] = ApiClient.convertToType(data['seasonTitle'], 'String');
      }
      if (data.hasOwnProperty('channelShortCode')) {
        obj['channelShortCode'] = ApiClient.convertToType(data['channelShortCode'], 'String');
      }
      if (data.hasOwnProperty('hasClosedCaptions')) {
        obj['hasClosedCaptions'] = ApiClient.convertToType(data['hasClosedCaptions'], 'Boolean');
      }
      if (data.hasOwnProperty('averageUserRating')) {
        obj['averageUserRating'] = ApiClient.convertToType(data['averageUserRating'], 'Number');
      }
      if (data.hasOwnProperty('badge')) {
        obj['badge'] = ApiClient.convertToType(data['badge'], 'String');
      }
      if (data.hasOwnProperty('genres')) {
        obj['genres'] = ApiClient.convertToType(data['genres'], ['String']);
      }
      if (data.hasOwnProperty('duration')) {
        obj['duration'] = ApiClient.convertToType(data['duration'], 'Number');
      }
      if (data.hasOwnProperty('customId')) {
        obj['customId'] = ApiClient.convertToType(data['customId'], 'String');
      }
      if (data.hasOwnProperty('offers')) {
        obj['offers'] = ApiClient.convertToType(data['offers'], [MassiveSDKModelOffer]);
      }
      if (data.hasOwnProperty('images')) {
        obj['images'] = ApiClient.convertToType(data['images'], {'String': 'String'});
      }
      if (data.hasOwnProperty('themes')) {
        obj['themes'] = ApiClient.convertToType(data['themes'], [MassiveSDKModelTheme]);
      }
      if (data.hasOwnProperty('customFields')) {
        obj['customFields'] = ApiClient.convertToType(data['customFields'], Object);
      }
      if (data.hasOwnProperty('vams')) {
        obj['vams'] = ApiClient.convertToType(data['vams'], [Object]);
      }
    }
    return obj;
  }

  /**
   * @member {String} advisoryText
   */
  exports.prototype['advisoryText'] = undefined;
  /**
   * @member {String} copyright
   */
  exports.prototype['copyright'] = undefined;
  /**
   * @member {String} distributor
   */
  exports.prototype['distributor'] = undefined;
  /**
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * @member {Array.<module:model/MassiveSDKModelItemCustomMetadata>} customMetadata
   */
  exports.prototype['customMetadata'] = undefined;
  /**
   * @member {Array.<String>} genrePaths
   */
  exports.prototype['genrePaths'] = undefined;
  /**
   * @member {String} location
   */
  exports.prototype['location'] = undefined;
  /**
   * @member {String} venue
   */
  exports.prototype['venue'] = undefined;
  /**
   * @member {Date} eventDate
   */
  exports.prototype['eventDate'] = undefined;
  /**
   * @member {Array.<module:model/MassiveSDKModelCredit>} credits
   */
  exports.prototype['credits'] = undefined;
  /**
   * @member {module:model/MassiveSDKModelItemList} seasons
   */
  exports.prototype['seasons'] = undefined;
  /**
   * @member {module:model/MassiveSDKModelItemList} episodes
   */
  exports.prototype['episodes'] = undefined;
  /**
   * @member {module:model/MassiveSDKModelItemDetail} season
   */
  exports.prototype['season'] = undefined;
  /**
   * @member {module:model/MassiveSDKModelItemDetail} show
   */
  exports.prototype['show'] = undefined;
  /**
   * @member {Number} totalUserRatings
   */
  exports.prototype['totalUserRatings'] = undefined;
  /**
   * @member {Array.<module:model/MassiveSDKModelItemSummary>} trailers
   */
  exports.prototype['trailers'] = undefined;
  /**
   * @member {module:model/MassiveSDKModelItemDetail.TypeEnum} type
   */
  exports.prototype['type'] = undefined;
  /**
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * @member {String} subtype
   */
  exports.prototype['subtype'] = undefined;
  /**
   * @member {String} title
   */
  exports.prototype['title'] = undefined;
  /**
   * @member {String} contextualTitle
   */
  exports.prototype['contextualTitle'] = undefined;
  /**
   * @member {String} shortDescription
   */
  exports.prototype['shortDescription'] = undefined;
  /**
   * @member {String} tagline
   */
  exports.prototype['tagline'] = undefined;
  /**
   * @member {module:model/MassiveSDKModelClassificationSummary} classification
   */
  exports.prototype['classification'] = undefined;
  /**
   * @member {String} path
   */
  exports.prototype['path'] = undefined;
  /**
   * @member {String} watchPath
   */
  exports.prototype['watchPath'] = undefined;
  /**
   * @member {Array.<String>} scopes
   */
  exports.prototype['scopes'] = undefined;
  /**
   * @member {Number} releaseYear
   */
  exports.prototype['releaseYear'] = undefined;
  /**
   * @member {Number} episodeCount
   */
  exports.prototype['episodeCount'] = undefined;
  /**
   * @member {Number} availableEpisodeCount
   */
  exports.prototype['availableEpisodeCount'] = undefined;
  /**
   * @member {Number} availableSeasonCount
   */
  exports.prototype['availableSeasonCount'] = undefined;
  /**
   * @member {Number} seasonNumber
   */
  exports.prototype['seasonNumber'] = undefined;
  /**
   * @member {Number} episodeNumber
   */
  exports.prototype['episodeNumber'] = undefined;
  /**
   * @member {String} episodeName
   */
  exports.prototype['episodeName'] = undefined;
  /**
   * @member {String} showId
   */
  exports.prototype['showId'] = undefined;
  /**
   * @member {String} showTitle
   */
  exports.prototype['showTitle'] = undefined;
  /**
   * @member {String} seasonId
   */
  exports.prototype['seasonId'] = undefined;
  /**
   * @member {String} seasonTitle
   */
  exports.prototype['seasonTitle'] = undefined;
  /**
   * @member {String} channelShortCode
   */
  exports.prototype['channelShortCode'] = undefined;
  /**
   * @member {Boolean} hasClosedCaptions
   */
  exports.prototype['hasClosedCaptions'] = undefined;
  /**
   * @member {Number} averageUserRating
   */
  exports.prototype['averageUserRating'] = undefined;
  /**
   * @member {String} badge
   */
  exports.prototype['badge'] = undefined;
  /**
   * @member {Array.<String>} genres
   */
  exports.prototype['genres'] = undefined;
  /**
   * @member {Number} duration
   */
  exports.prototype['duration'] = undefined;
  /**
   * @member {String} customId
   */
  exports.prototype['customId'] = undefined;
  /**
   * @member {Array.<module:model/MassiveSDKModelOffer>} offers
   */
  exports.prototype['offers'] = undefined;
  /**
   * @member {Object.<String, String>} images
   */
  exports.prototype['images'] = undefined;
  /**
   * @member {Array.<module:model/MassiveSDKModelTheme>} themes
   */
  exports.prototype['themes'] = undefined;
  /**
   * @member {Object} customFields
   */
  exports.prototype['customFields'] = undefined;
  /**
   * @member {Array.<Object>} vams
   */
  exports.prototype['vams'] = undefined;


  /**
   * Allowed values for the <code>type</code> property.
   * @enum {String}
   * @readonly
   */
  exports.TypeEnum = {
    /**
     * value: "movie"
     * @const
     */
    "movie": "movie",
    /**
     * value: "show"
     * @const
     */
    "show": "show",
    /**
     * value: "season"
     * @const
     */
    "season": "season",
    /**
     * value: "episode"
     * @const
     */
    "episode": "episode",
    /**
     * value: "program"
     * @const
     */
    "program": "program",
    /**
     * value: "link"
     * @const
     */
    "link": "link",
    /**
     * value: "trailer"
     * @const
     */
    "trailer": "trailer",
    /**
     * value: "channel"
     * @const
     */
    "channel": "channel",
    /**
     * value: "customAsset"
     * @const
     */
    "customAsset": "customAsset"  };


  return exports;
}));


