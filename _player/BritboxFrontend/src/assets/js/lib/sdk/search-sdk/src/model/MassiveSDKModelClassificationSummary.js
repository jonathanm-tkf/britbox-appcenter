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
    root.BritboxSearchApi10.MassiveSDKModelClassificationSummary = factory(root.BritboxSearchApi10.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The MassiveSDKModelClassificationSummary model module.
   * @module model/MassiveSDKModelClassificationSummary
   * @version 1.0
   */

  /**
   * Constructs a new <code>MassiveSDKModelClassificationSummary</code>.
   * @alias module:model/MassiveSDKModelClassificationSummary
   * @class
   */
  var exports = function() {
    var _this = this;



  };

  /**
   * Constructs a <code>MassiveSDKModelClassificationSummary</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MassiveSDKModelClassificationSummary} obj Optional instance to populate.
   * @return {module:model/MassiveSDKModelClassificationSummary} The populated <code>MassiveSDKModelClassificationSummary</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('code')) {
        obj['code'] = ApiClient.convertToType(data['code'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
    }
    return obj;
  }

  /**
   * @member {String} code
   */
  exports.prototype['code'] = undefined;
  /**
   * @member {String} name
   */
  exports.prototype['name'] = undefined;



  return exports;
}));


