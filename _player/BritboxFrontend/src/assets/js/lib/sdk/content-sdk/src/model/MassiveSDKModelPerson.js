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
    root.BritboxContentApi10.MassiveSDKModelPerson = factory(root.BritboxContentApi10.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The MassiveSDKModelPerson model module.
   * @module model/MassiveSDKModelPerson
   * @version 1.0
   */

  /**
   * Constructs a new <code>MassiveSDKModelPerson</code>.
   * @alias module:model/MassiveSDKModelPerson
   * @class
   */
  var exports = function() {
    var _this = this;



  };

  /**
   * Constructs a <code>MassiveSDKModelPerson</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MassiveSDKModelPerson} obj Optional instance to populate.
   * @return {module:model/MassiveSDKModelPerson} The populated <code>MassiveSDKModelPerson</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('path')) {
        obj['path'] = ApiClient.convertToType(data['path'], 'String');
      }
    }
    return obj;
  }

  /**
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * @member {String} path
   */
  exports.prototype['path'] = undefined;



  return exports;
}));


