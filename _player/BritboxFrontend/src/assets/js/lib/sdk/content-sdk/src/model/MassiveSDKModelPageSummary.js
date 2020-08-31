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
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.BritboxContentApi10) {
      root.BritboxContentApi10 = {};
    }
    root.BritboxContentApi10.MassiveSDKModelPageSummary = factory(root.BritboxContentApi10.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The MassiveSDKModelPageSummary model module.
   * @module model/MassiveSDKModelPageSummary
   * @version 1.0
   */

  /**
   * Constructs a new <code>MassiveSDKModelPageSummary</code>.
   * @alias module:model/MassiveSDKModelPageSummary
   * @class
   */
  var exports = function() {
    var _this = this;








  };

  /**
   * Constructs a <code>MassiveSDKModelPageSummary</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MassiveSDKModelPageSummary} obj Optional instance to populate.
   * @return {module:model/MassiveSDKModelPageSummary} The populated <code>MassiveSDKModelPageSummary</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('title')) {
        obj['title'] = ApiClient.convertToType(data['title'], 'String');
      }
      if (data.hasOwnProperty('path')) {
        obj['path'] = ApiClient.convertToType(data['path'], 'String');
      }
      if (data.hasOwnProperty('key')) {
        obj['key'] = ApiClient.convertToType(data['key'], 'String');
      }
      if (data.hasOwnProperty('template')) {
        obj['template'] = ApiClient.convertToType(data['template'], 'String');
      }
      if (data.hasOwnProperty('isStatic')) {
        obj['isStatic'] = ApiClient.convertToType(data['isStatic'], 'Boolean');
      }
      if (data.hasOwnProperty('isSystemPage')) {
        obj['isSystemPage'] = ApiClient.convertToType(data['isSystemPage'], 'Boolean');
      }
    }
    return obj;
  }

  /**
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * @member {String} title
   */
  exports.prototype['title'] = undefined;
  /**
   * @member {String} path
   */
  exports.prototype['path'] = undefined;
  /**
   * @member {String} key
   */
  exports.prototype['key'] = undefined;
  /**
   * @member {String} template
   */
  exports.prototype['template'] = undefined;
  /**
   * @member {Boolean} isStatic
   */
  exports.prototype['isStatic'] = undefined;
  /**
   * @member {Boolean} isSystemPage
   */
  exports.prototype['isSystemPage'] = undefined;



  return exports;
}));


